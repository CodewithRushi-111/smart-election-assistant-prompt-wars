import ChatHistory from '../models/ChatHistory.js';
import crypto from 'crypto';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

export const handleMessage = async (req, res) => {
  try {
    const { message, sessionId, language } = req.body;
    let currentSessionId = sessionId || crypto.randomUUID();

    let chatHistory = await ChatHistory.findOne({ sessionId: currentSessionId });
    if (!chatHistory) {
      chatHistory = await ChatHistory.create({
        userId: req.user ? req.user.id : null,
        sessionId: currentSessionId,
        messages: [],
        userContext: {
          journeyStage: 'unaware', // Default or fetch from user
        }
      });
    }

    // Format previous messages for Gemini context
    const historyContext = chatHistory.messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // Add User Message to DB
    chatHistory.messages.push({
      role: 'user',
      content: message,
      language: language || 'en',
      timestamp: new Date()
    });

    let aiResponseText = "";
    
    if (genAI) {
      try {
        const model = genAI.getGenerativeModel({ 
          model: "gemini-1.5-flash",
          systemInstruction: "You are the 'Smart Election Assistant', an AI guide helping Indian citizens understand the election process, voting eligibility, polling dates, and candidate information. Respond concisely, accurately, and politely. The user language is " + (language || 'en') + ".",
        });

        const chat = model.startChat({
          history: historyContext,
        });

        const result = await chat.sendMessage(message);
        aiResponseText = result.response.text();
      } catch (aiError) {
        console.error("Gemini API Error:", aiError);
        aiResponseText = "Sorry, I am having trouble connecting to my AI brain at the moment. Please try again later.";
      }
    } else {
      aiResponseText = `[Mock AI Response - Add GEMINI_API_KEY to server/.env and restart server to enable Gemini API] You asked: "${message}"`;
    }

    // Add Assistant Message to DB
    chatHistory.messages.push({
      role: 'assistant',
      content: aiResponseText,
      language: language || 'en',
      timestamp: new Date()
    });

    await chatHistory.save();

    res.status(200).json({ success: true, response: aiResponseText, sessionId: currentSessionId });
  } catch (error) {
    console.error("Chat Controller Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getHistory = async (req, res) => {
  try {
    const chatHistory = await ChatHistory.findOne({ sessionId: req.params.sessionId });
    if (!chatHistory) {
      return res.status(404).json({ success: false, message: 'Chat history not found' });
    }
    res.status(200).json({ success: true, data: chatHistory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const clearHistory = async (req, res) => {
  try {
    await ChatHistory.findOneAndDelete({ sessionId: req.params.sessionId });
    res.status(200).json({ success: true, message: 'Chat history cleared' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

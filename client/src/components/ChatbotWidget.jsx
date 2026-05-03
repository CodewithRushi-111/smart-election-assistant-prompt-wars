import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, Camera, Image as ImageIcon, Mic, Volume2, VolumeX } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LANGUAGE_VOICE_MAP = {
  en: 'en-IN',
  hi: 'hi-IN',
  bn: 'bn-IN',
  te: 'te-IN',
  ta: 'ta-IN'
};

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();

  useEffect(() => {
    // Auto-open chat after a small delay to welcome the user
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  const [sessionId, setSessionId] = useState(localStorage.getItem('chatSessionId') || null);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! I'm your Smart Election Assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Initialize Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  const speakText = (text) => {
    if (!isVoiceEnabled || !window.speechSynthesis) return;
    
    // Stop any existing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = LANGUAGE_VOICE_MAP[i18n.language] || 'en-IN';
    
    // Try to find a better matching voice for the language
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.startsWith(i18n.language));
    if (preferredVoice) utterance.voice = preferredVoice;

    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = LANGUAGE_VOICE_MAP[i18n.language] || 'en-IN';
      setIsListening(true);
      recognitionRef.current.start();
    } else {
      alert("Speech recognition is not supported in this browser.");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if ((!input.trim() && !selectedFile) || isLoading) return;

    const userMessage = input.trim();
    const isVision = !!selectedFile;
    
    // Add user message to UI
    setMessages(prev => [...prev, { 
      id: Date.now(), 
      text: userMessage || "Analyzing uploaded image...", 
      isBot: false,
      image: previewUrl 
    }]);
    
    setInput("");
    setSelectedFile(null);
    setPreviewUrl(null);
    setIsLoading(true);

    try {
      let response;
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      if (isVision) {
        const formData = new FormData();
        formData.append('image', selectedFile);
        response = await fetch(`${API_URL}/api/v1/chat/analyze-manifesto`, {
          method: 'POST',
          body: formData,
        });
      } else {
        response = await fetch(`${API_URL}/api/v1/chat/message`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: userMessage,
            sessionId: sessionId,
            language: 'en'
          }),
        });
      }

      const data = await response.json();

      if (data.success) {
        if (!isVision && !sessionId && data.sessionId) {
          setSessionId(data.sessionId);
          localStorage.setItem('chatSessionId', data.sessionId);
        }

        setMessages(prev => [
          ...prev,
          { id: Date.now() + 1, text: isVision ? data.data : data.response, isBot: true }
        ]);

        // Speak the response
        speakText(isVision ? data.data : data.response);
      } else {
        throw new Error(data.message || 'Failed to get response');
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, text: "Sorry, I'm having trouble processing that. Please try again.", isBot: true }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        className="fixed bottom-6 right-6 px-5 h-14 bg-indigo-600 text-white rounded-full flex items-center gap-3 shadow-lg hover:bg-indigo-700 z-50 min-w-[120px]"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
        aria-label="Toggle Chat"
      >
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-indigo-400 animate-ping opacity-40"></span>
        )}
        <div className="relative z-10 flex items-center gap-2">
          <MessageCircle size={24} />
          <span className="font-bold tracking-wide uppercase text-sm">Ask AI</span>
        </div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-indigo-600 p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">
                  AI
                </div>
                <div>
                  <h3 className="font-bold text-sm">Election Assistant</h3>
                  <p className="text-xs text-indigo-100">Always here to help</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                  className="text-white/80 hover:text-white transition-colors"
                  title={isVoiceEnabled ? "Mute Voice" : "Enable Voice"}
                >
                  {isVoiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                </button>
                <button onClick={toggleChat} className="text-white/80 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="p-4 h-80 overflow-y-auto bg-gray-50 flex flex-col gap-3">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.isBot 
                      ? "bg-white border border-gray-200 text-gray-800 self-start rounded-tl-none shadow-sm" 
                      : "bg-indigo-600 text-white self-end rounded-tr-none shadow-sm"
                  }`}
                >
                  {msg.image && (
                    <img src={msg.image} alt="Uploaded" className="w-full h-32 object-cover rounded-lg mb-2" />
                  )}
                  {msg.text}
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white border border-gray-200 text-gray-500 self-start p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2 text-xs"
                >
                  <Loader2 size={14} className="animate-spin" />
                  AI is analyzing...
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Preview Area */}
            {previewUrl && (
              <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={previewUrl} alt="Preview" className="w-10 h-10 object-cover rounded" />
                  <span className="text-xs text-gray-500 truncate w-32">{selectedFile?.name}</span>
                </div>
                <button onClick={() => {setSelectedFile(null); setPreviewUrl(null);}} className="text-gray-400 hover:text-red-500">
                  <X size={16} />
                </button>
              </div>
            )}

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-gray-100">
              <form onSubmit={handleSend} className="flex gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="w-10 h-10 text-gray-400 hover:text-indigo-600 transition-colors flex items-center justify-center"
                >
                  <Camera size={20} />
                </button>
                <button
                  type="button"
                  onClick={startListening}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isListening ? 'bg-red-500 text-white animate-pulse' : 'text-gray-400 hover:text-indigo-600'
                  }`}
                >
                  <Mic size={20} />
                </button>
                <input
                  type="text"
                  placeholder={previewUrl ? "Add a caption..." : "Ask a question..."}
                  className="flex-1 bg-gray-100 border-transparent focus:border-indigo-500 focus:bg-white focus:ring-0 rounded-full px-4 py-2 text-sm transition-colors disabled:opacity-50"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50"
                  disabled={(!input.trim() && !selectedFile) || isLoading}
                >
                  <Send size={16} />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

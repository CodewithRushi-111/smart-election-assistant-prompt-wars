import { GoogleGenerativeAI } from '@google/generative-ai';
import asyncHandler from '../middleware/asyncHandler.js';
import { ErrorResponse } from '../middleware/errorMiddleware.js';

// @desc    Analyze manifesto image
// @route   POST /api/v1/chat/analyze-manifesto
// @access  Public
export const analyzeManifesto = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new ErrorResponse('Please upload an image', 400));
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const imagePart = {
    inlineData: {
      data: req.file.buffer.toString('base64'),
      mimeType: req.file.mimetype
    }
  };

  const prompt = `Act as an expert Indian Election Fact-Checker. 
    Analyze this political poster/manifesto image and provide:
    1. A 2-sentence summary of the key promises.
    2. Any potential "red flags" or vague promises that need more detail.
    3. A "Trust Score" (1-10) based on the specificity of the claims.
    
    Format the response clearly with headings.`;

  const result = await model.generateContent([prompt, imagePart]);
  const responseText = result.response.text();

  res.status(200).json({
    success: true,
    data: responseText
  });
});

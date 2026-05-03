import Candidate from '../models/Candidate.js';
import asyncHandler from '../middleware/asyncHandler.js';
import { ErrorResponse } from '../middleware/errorMiddleware.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

// @desc    Get all candidates
// @route   GET /api/v1/candidates
// @access  Public
export const getCandidates = asyncHandler(async (req, res, next) => {
  const { constituency } = req.query;
  const filter = constituency ? { constituency } : {};
  const candidates = await Candidate.find(filter);
  res.status(200).json({ success: true, count: candidates.length, data: candidates });
});

// @desc    Compare manifestos using AI
// @route   POST /api/v1/candidates/compare
// @access  Public
export const compareManifestos = asyncHandler(async (req, res, next) => {
  const { candidateIds } = req.body;

  if (!candidateIds || candidateIds.length < 2) {
    return next(new ErrorResponse('Please provide at least two candidates to compare', 400));
  }

  const candidates = await Candidate.find({ _id: { $in: candidateIds } });

  if (candidates.length < 2) {
    return next(new ErrorResponse('Candidates not found', 404));
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Compare the manifestos of these candidates for the Indian Election:
    ${candidates.map(c => `${c.name} (${c.party}): ${c.manifestoHighlights.join(', ')}`).join('\n')}
    
    Provide a balanced, neutral comparison in 3 key points:
    1. Economic Vision
    2. Social Welfare
    3. Key Infrastructure
    
    Format the response as JSON with fields: economic, social, infrastructure.`;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();
  
  // Basic cleanup of AI response to ensure it's valid JSON
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  const comparison = jsonMatch ? JSON.parse(jsonMatch[0]) : { raw: responseText };

  res.status(200).json({ success: true, data: comparison });
});

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Scale, AlertCircle, ChevronRight } from 'lucide-react';

const CandidateComparison = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock data for demonstration if API fails or is empty
  const mockCandidates = [
    { _id: '1', name: 'Candidate A', party: 'Party X', manifestoHighlights: ['Digital India', 'Education for all'] },
    { _id: '2', name: 'Candidate B', party: 'Party Y', manifestoHighlights: ['Farmer Support', 'Rural Infrastructure'] },
    { _id: '3', name: 'Candidate C', party: 'Party Z', manifestoHighlights: ['Green Energy', 'Urban Development'] }
  ];

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    
    // Fetch candidates from API
    const fetchCandidates = async () => {
      try {
        const res = await fetch(`${API_URL}/api/v1/candidates`);
        const json = await res.json();
        if (json.success && json.data.length > 0) {
          setCandidates(json.data);
        } else {
          setCandidates(mockCandidates);
        }
      } catch (err) {
        setCandidates(mockCandidates);
      }
    };
    fetchCandidates();
  }, []);

  const toggleSelection = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else if (selectedIds.length < 2) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleCompare = async () => {
    if (selectedIds.length !== 2) return;
    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API_URL}/api/v1/candidates/compare`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidateIds: selectedIds })
      });
      const json = await res.json();
      setComparison(json.data);
    } catch (err) {
      setComparison({ 
        economic: "Focus on industrial growth vs rural subsidies.",
        social: "Emphasis on education vs healthcare reform.",
        infrastructure: "Smart cities vs nationwide road connectivity."
      });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
          <Users size={28} />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Candidate Directory</h2>
          <p className="text-gray-600">Explore candidates and compare their visions.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {candidates.map((candidate) => (
          <motion.div 
            key={candidate._id}
            whileHover={{ y: -5 }}
            onClick={() => toggleSelection(candidate._id)}
            className={`cursor-pointer border-2 p-6 rounded-2xl transition-all ${
              selectedIds.includes(candidate._id) 
                ? 'border-indigo-600 bg-indigo-50/50' 
                : 'border-gray-100 bg-white'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
                {candidate.name.charAt(0)}
              </div>
              {selectedIds.includes(candidate._id) && (
                <div className="bg-indigo-600 text-white p-1 rounded-full">
                  <Scale size={16} />
                </div>
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-900">{candidate.name}</h3>
            <p className="text-indigo-600 font-semibold mb-3">{candidate.party}</p>
            <div className="space-y-2">
              {candidate.manifestoHighlights.slice(0, 2).map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <ChevronRight size={14} className="text-gray-400" />
                  {h}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col items-center">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCompare}
          disabled={selectedIds.length !== 2 || loading}
          className={`btn-primary px-10 py-4 text-lg flex items-center gap-2 ${
            selectedIds.length !== 2 ? 'opacity-50 cursor-not-allowed grayscale' : ''
          }`}
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <Scale size={20} />
              Compare Manifestos with AI
            </>
          )}
        </motion.button>
        <p className="mt-4 text-sm text-gray-500">
          Select exactly 2 candidates to begin AI-powered analysis.
        </p>
      </div>

      <AnimatePresence>
        {comparison && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="mt-12 glass-card p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <AlertCircle className="text-indigo-600" />
              AI Comparison Insight
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <h4 className="font-bold text-indigo-600 mb-2 uppercase text-xs tracking-wider">Economic Vision</h4>
                <p className="text-gray-700">{comparison.economic}</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <h4 className="font-bold text-indigo-600 mb-2 uppercase text-xs tracking-wider">Social Welfare</h4>
                <p className="text-gray-700">{comparison.social}</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <h4 className="font-bold text-indigo-600 mb-2 uppercase text-xs tracking-wider">Infrastructure</h4>
                <p className="text-gray-700">{comparison.infrastructure}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CandidateComparison;

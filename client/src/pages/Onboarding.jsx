import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useUserStore from '../store/userStore';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    language: 'en',
    name: '',
    age: '',
    state: '',
    isRegistered: false
  });
  
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Finish onboarding
      setUser({ ...formData, journeyStage: formData.isRegistered ? 'registered' : 'unaware' });
      navigate('/dashboard');
    }
  };

  const slideVariants = {
    enter: { x: 50, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 }
  };

  return (
    <div className="max-w-xl mx-auto py-12 overflow-hidden">
      <div className="card text-center relative min-h-[450px] flex flex-col justify-between">
        {/* Progress Bar */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex-1 h-2 mx-1 rounded bg-gray-200 overflow-hidden relative">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: step >= i ? '100%' : '0%' }}
                transition={{ duration: 0.3 }}
                className="absolute top-0 left-0 h-full bg-saffron-500"
              />
            </div>
          ))}
        </div>

        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}
                className="absolute inset-0 flex flex-col"
              >
                <h2 className="text-3xl font-bold mb-4">Welcome to Smart Election Assistant</h2>
                <p className="text-gray-600 mb-6">Choose your preferred language</p>
                <div className="grid grid-cols-1 gap-3 mt-auto mb-auto">
                  {[
                    { id: 'en', label: 'English' },
                    { id: 'hi', label: 'हिंदी (Hindi)' },
                    { id: 'ta', label: 'தமிழ் (Tamil)' }
                  ].map(lang => (
                    <motion.button
                      key={lang.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormData({...formData, language: lang.id})}
                      className={`p-4 rounded-xl border-2 text-left font-medium transition-colors ${
                        formData.language === lang.id ? 'border-saffron-500 bg-saffron-50 text-saffron-900' : 'border-gray-200 hover:border-saffron-200'
                      }`}
                    >
                      {lang.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}
                className="absolute inset-0 flex flex-col"
              >
                <h2 className="text-2xl font-bold mb-4">Tell us about yourself</h2>
                <div className="space-y-4 mt-auto mb-auto">
                  <input 
                    type="text" placeholder="Full Name" 
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-saffron-500 focus:ring-0 outline-none transition-colors"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  <input 
                    type="number" placeholder="Age" 
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-saffron-500 focus:ring-0 outline-none transition-colors"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                  />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}
                className="absolute inset-0 flex flex-col"
              >
                <h2 className="text-2xl font-bold mb-4">Where are you voting from?</h2>
                <div className="mt-auto mb-auto">
                  <select 
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-saffron-500 focus:ring-0 outline-none transition-colors bg-white cursor-pointer"
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                  >
                    <option value="" disabled>Select State</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                  </select>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}
                className="absolute inset-0 flex flex-col"
              >
                <h2 className="text-2xl font-bold mb-8">Are you registered to vote?</h2>
                <div className="flex flex-col gap-4 mt-auto mb-auto">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-xl border-2 font-medium transition-colors ${formData.isRegistered ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'border-gray-200 hover:border-indigo-200'}`}
                    onClick={() => setFormData({...formData, isRegistered: true})}
                  >
                    Yes, I am registered
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-xl border-2 font-medium transition-colors ${!formData.isRegistered ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'border-gray-200 hover:border-indigo-200'}`}
                    onClick={() => setFormData({...formData, isRegistered: false})}
                  >
                    No / I'm not sure
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-12 pt-8 z-10">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary w-full py-4 text-lg" 
            onClick={handleNext}
          >
            {step === 4 ? 'Go to Dashboard' : 'Continue'}
          </motion.button>
        </div>
      </div>
    </div>
  );
}

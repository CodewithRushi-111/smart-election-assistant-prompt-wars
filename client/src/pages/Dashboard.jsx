import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Target, Users, HelpCircle, Calendar, CheckCircle2, Bell, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useUserStore from '../store/userStore';
import { generateVoterGuide } from '../utils/pdfGenerator';

export default function Dashboard() {
  const { user, journeyStage } = useUserStore();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleDownloadGuide = () => {
    // In a real app, you'd get the actual shortlisted candidates and booth
    const mockCandidates = [
      { name: 'Candidate A', party: 'Party X', constituency: 'New Delhi' },
      { name: 'Candidate B', party: 'Party Y', constituency: 'New Delhi' }
    ];
    generateVoterGuide(user, mockCandidates, null);
  };

  const handleAddToCalendar = () => {
    const event = {
      title: 'Indian General Elections - Polling Day',
      start: '20260419T070000',
      end: '20260419T180000',
      description: 'Go out and vote! Your voice matters.'
    };
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&details=${encodeURIComponent(event.description)}`;
    window.open(url, '_blank');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="py-8"
    >
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('welcome')}, {user?.name || 'Voter'}!</h1>
          <p className="text-gray-600">{t('dashboard_subtitle')}</p>
        </div>
        <div className="flex gap-2">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDownloadGuide}
            className="flex items-center gap-2 bg-white text-indigo-600 border border-indigo-200 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-all font-semibold shadow-sm"
          >
            <Download size={18} />
            <span className="hidden sm:inline">Voter Guide</span>
          </motion.button>
          <div className="bg-saffron-50 text-saffron-900 px-4 py-2 rounded-lg border border-saffron-200 flex items-center gap-2">
            <Calendar size={18} />
            <span><span className="font-bold">{t('next_election')}:</span> Lok Sabha (Phase 1)</span>
          </div>
          <button className="p-2 bg-indigo-50 text-indigo-600 rounded-lg border border-indigo-100 hover:bg-indigo-100 transition-colors">
            <Bell size={18} />
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Journey Tracker */}
        <motion.div variants={itemVariants} className="card md:col-span-2">
          <h2 className="text-xl font-bold mb-4 border-b pb-2 flex items-center gap-2">
            <Target className="text-saffron-500" /> {t('journey_tracker') || 'Your Voter Journey'}
          </h2>
          <div className="flex justify-between items-center py-4 relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-100 -z-10 -translate-y-1/2 mt-[-10px] mx-10"></div>
            
            {['Unaware', 'Eligible', 'Registered', 'Voting Day', 'Voted'].map((stage, i) => {
              const isActive = journeyStage === stage.toLowerCase();
              const isPast = ['unaware', 'eligible', 'registered', 'voting day', 'voted'].indexOf(journeyStage || 'unaware') >= i;

              return (
                <div key={i} className="flex flex-col items-center relative bg-white px-2">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-2 shadow-sm border-2
                      ${isActive ? 'border-saffron-500 bg-saffron-50 text-saffron-600 ring-4 ring-saffron-100' : 
                        isPast ? 'border-saffron-500 bg-saffron-500 text-white' : 'border-gray-200 bg-gray-50 text-gray-400'}`}
                  >
                    {isPast && !isActive ? <CheckCircle2 size={16} /> : i + 1}
                  </motion.div>
                  <span className={`text-xs text-center w-20 ${isActive ? 'font-bold text-saffron-600' : 'text-gray-500'}`}>
                    {stage}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Next Action */}
        <motion.div variants={itemVariants} className="card bg-indigo-50 border-indigo-100">
          <h2 className="text-lg font-bold text-indigo-900 mb-2">{t('take_action')}</h2>
          <p className="text-indigo-700 text-sm mb-6">
            {journeyStage === 'unaware' ? "Check your eligibility to vote." :
             journeyStage === 'registered' ? "Find your polling booth location." : "Complete your registration process."}
          </p>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/onboarding')}
            className="btn-primary w-full shadow-md py-3"
          >
            {t('take_action')}
          </motion.button>
        </motion.div>

        {/* Timeline Widget */}
        <motion.div variants={itemVariants} className="card h-full">
          <h2 className="font-bold mb-4 flex items-center gap-2">
            <Calendar size={18} className="text-gray-500" /> Upcoming Dates
          </h2>
          <ul className="space-y-4 text-sm">
            <li className="flex justify-between items-center p-3 bg-red-50 text-red-900 rounded-lg border border-red-100">
              <span className="font-medium">Registration Ends</span>
              <span className="font-bold">Mar 9</span>
            </li>
            <li 
              onClick={handleAddToCalendar}
              className="flex justify-between items-center p-3 bg-green-50 text-green-900 rounded-lg border border-green-100 cursor-pointer hover:bg-green-100 transition-colors"
            >
              <div className="flex flex-col">
                <span className="font-medium">Polling Day</span>
                <span className="text-[10px] text-green-700">Add to Calendar</span>
              </div>
              <span className="font-bold">Apr 19</span>
            </li>
          </ul>
        </motion.div>

        {/* Quick Tools */}
        <motion.div variants={itemVariants} className="card md:col-span-2">
           <h2 className="font-bold mb-4 flex items-center gap-2">
             <Target size={18} className="text-gray-500" /> Explore Tools
           </h2>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: MapPin, label: 'Booth Finder', color: 'text-blue-500', bg: 'bg-blue-50', path: '/booth' },
                { icon: Target, label: 'Simulator', color: 'text-purple-500', bg: 'bg-purple-50', path: '/onboarding' },
                { icon: Users, label: 'Candidates', color: 'text-orange-500', bg: 'bg-orange-50', path: '/candidates' },
                { icon: HelpCircle, label: 'Quiz', color: 'text-green-500', bg: 'bg-green-50', path: '/dashboard' }
              ].map((tool, i) => (
                <motion.button 
                  key={i}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(tool.path)}
                  className="p-4 border border-gray-100 shadow-sm rounded-xl hover:shadow-md transition flex flex-col items-center justify-center gap-2 bg-white"
                >
                  <div className={`p-3 rounded-full ${tool.bg} ${tool.color}`}>
                    <tool.icon size={24} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{tool.label}</span>
                </motion.button>
              ))}
           </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

const Home = () => {
  return (
    <div className="text-center py-16">
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex justify-center"
      >
        <Logo size={120} />
      </motion.div>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Know Your Vote.<br/>
        <span className="text-indigo-600">Own Your Future.</span>
      </h2>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Your personalized AI-powered guide to the Indian election process.
      </p>
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link to="/onboarding" className="btn-primary text-lg px-8 py-3 inline-block">
          Start My Voter Journey
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;

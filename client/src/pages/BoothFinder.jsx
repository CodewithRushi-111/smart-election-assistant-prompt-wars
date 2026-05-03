import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Info, Users, Clock, Navigation } from 'lucide-react';

const BoothFinder = () => {
  const [selectedBooth, setSelectedBooth] = useState({
    id: 'B123',
    name: 'Government Primary School, Sector 4',
    address: 'Plot 45, Near Community Center, New Delhi',
    queueStatus: 'Medium',
    waitTime: '20 mins',
    lat: 28.6139,
    lng: 77.2090
  });

  const [isReporting, setIsReporting] = useState(false);

  const reportStatus = (status) => {
    setIsReporting(true);
    setTimeout(() => {
      setSelectedBooth({ ...selectedBooth, queueStatus: status });
      setIsReporting(false);
    }, 1000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Low': return 'bg-green-100 text-green-700 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'High': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-saffron-100 rounded-lg text-saffron-600">
          <MapPin size={28} />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Booth Finder</h2>
          <p className="text-gray-600">Locate your polling station and check live wait times.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Booth Info */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card overflow-hidden border-t-4 border-t-indigo-600"
          >
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedBooth.name}</h3>
              <p className="text-gray-600 text-sm mb-4 flex items-start gap-2">
                <MapPin size={16} className="text-indigo-600 mt-1 flex-shrink-0" />
                {selectedBooth.address}
              </p>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl mb-4">
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">Live Queue Status</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(selectedBooth.queueStatus)}`}>
                  {selectedBooth.queueStatus}
                </span>
              </div>

              <button className="w-full btn-primary py-3 flex items-center justify-center gap-2">
                <Navigation size={18} />
                Get Directions
              </button>
            </div>
          </motion.div>

          <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
            <h4 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
              <Users size={18} />
              Help Your Community
            </h4>
            <p className="text-sm text-indigo-700 mb-4">
              At the booth? Report the current wait time to help fellow citizens plan their visit.
            </p>
            <div className="grid grid-cols-3 gap-2">
              {['Low', 'Medium', 'High'].map((s) => (
                <button 
                  key={s}
                  onClick={() => reportStatus(s)}
                  disabled={isReporting}
                  className="bg-white border border-indigo-200 py-2 rounded-lg text-xs font-bold text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm active:scale-95 disabled:opacity-50"
                >
                  {isReporting ? '...' : s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Map Mockup */}
        <div className="lg:col-span-2">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[500px] bg-slate-200 border-8 border-white">
            {/* Visual Grid Mocking a Map */}
            <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-30"></div>
            
            {/* Mock Map Elements */}
            <div className="absolute top-1/4 left-1/3 w-40 h-2 bg-indigo-200 rotate-45"></div>
            <div className="absolute top-1/2 left-1/2 w-60 h-2 bg-indigo-200 -rotate-12"></div>
            <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-green-100 rounded-full opacity-50"></div>
            
            {/* Polling Station Marker */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            >
              <div className="relative">
                <MapPin size={48} className="text-red-500 fill-red-100" />
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-lg shadow-lg border border-gray-100 text-xs font-bold whitespace-nowrap">
                  Your Polling Booth
                </div>
              </div>
            </motion.div>

            {/* Overlay Info */}
            <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-xl border border-white/50 max-w-xs">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                  <Info size={20} />
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 text-sm">Nearby Facilities</h5>
                  <p className="text-xs text-gray-600">Wheelchair access available at this location.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoothFinder;

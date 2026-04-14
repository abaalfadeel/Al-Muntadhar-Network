import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';

export default function Mukhalifeen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null); // For Modal

  useEffect(() => {
    fetch('/data/mukhalifeen.json')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Header title="المخالفون" isRedTheme={true} />
      
      <div className="container mx-auto p-6">
        {loading ? (
          <div className="text-center text-red-500">جاري التحميل...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((person, idx) => (
              <motion.div 
                key={person.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setSelectedCard(person)}
                className="bg-darker border border-red-900/50 rounded-lg p-6 cursor-pointer hover:border-red-500 hover:shadow-[0_0_15px_rgba(139,0,0,0.5)] transition-all group"
              >
                <div className="text-xs text-red-600 mb-2 font-bold tracking-wider">
                  {/* Implementing requested prefix */}
                  الملعون / الملعونة
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-red-400 mb-4">{person.name}</h3>
                <div className="space-y-2 text-sm text-gray-400">
                  <p><strong className="text-red-500">الولادة:</strong> {person.birth}</p>
                  <p><strong className="text-red-500">الوفاة:</strong> {person.death}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Simplified Modal */}
      {selectedCard && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4" onClick={() => setSelectedCard(null)}>
          <div className="bg-darker border border-red-500 p-8 rounded-lg max-w-lg w-full" onClick={e => e.stopPropagation()}>
            <h2 className="text-3xl text-red-500 font-bold mb-4">{selectedCard.name}</h2>
            <div className="space-y-4 text-gray-300">
              <p><strong className="text-white">الحقبة:</strong> {selectedCard.era}</p>
              <p><strong className="text-white">المرويات:</strong> {selectedCard.narrations}</p>
              <div className="mt-6 pt-4 border-t border-red-900/30 text-sm">
                {selectedCard.source}
              </div>
            </div>
            <button onClick={() => setSelectedCard(null)} className="mt-6 w-full py-2 bg-red-900/50 hover:bg-red-800 text-white rounded transition">إغلاق</button>
          </div>
        </div>
      )}
    </motion.div>
  );
}

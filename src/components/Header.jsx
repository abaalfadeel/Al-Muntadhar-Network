import { motion } from 'framer-motion';

export default function Header({ title, subtitle, imagePath, isRedTheme = false }) {
  return (
    <div className="relative w-full h-64 flex flex-col items-center justify-center overflow-hidden border-b border-gold/20">
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imagePath || '/assets/default-hero.jpg'})` }}
      />
      <div className={`absolute inset-0 ${isRedTheme ? 'bg-gradient-to-t from-dark to-bloodRed/40' : 'bg-gradient-to-t from-dark to-darker/80'}`} />
      
      <div className="relative z-10 text-center font-arabic">
        <motion.h2 
          initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          className="text-2xl md:text-3xl text-gold mb-4"
        >
          ﷽ بسم الله الرحمن الرحيم
        </motion.h2>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
          className={`text-4xl md:text-6xl font-bold ${isRedTheme ? 'text-red-500' : 'text-white'}`}
        >
          {title}
        </motion.h1>
        {subtitle && <p className="mt-2 text-gray-300">{subtitle}</p>}
      </div>
    </div>
  );
}

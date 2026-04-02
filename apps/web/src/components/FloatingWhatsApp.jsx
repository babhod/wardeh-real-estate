import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const FloatingWhatsApp = () => {
  const whatsappUrl = 'https://wa.me/15517589448';

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-40 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
      aria-label="تواصل معنا عبر واتساب"
    >
      {/* Glow effect behind the button */}
      <div className="absolute inset-0 rounded-full bg-[#25D366] opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-300" />
      
      <MessageCircle className="w-7 h-7 md:w-8 md:h-8 relative z-10" />
    </motion.a>
  );
};

export default FloatingWhatsApp;
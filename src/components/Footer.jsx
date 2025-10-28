import React from 'react';
import { User, Heart, ExternalLink, Shield, BookOpen } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="glass border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          {/* Left Section */}
          <div className="flex items-center space-x-8">
            <button className="bg-gradient-to-r from-accent-blue to-accent-light-blue hover:from-accent-light-blue hover:to-accent-blue text-white px-8 py-4 rounded-2xl flex items-center space-x-3 transition-all duration-300 shadow-2xl hover:shadow-glow-lg transform hover:-translate-y-1 glow">
              <User className="w-6 h-6" />
              <span className="font-bold text-lg">Mi estado</span>
            </button>
            
            <div className="hidden sm:flex items-center space-x-3 text-gray-300 text-base">
              <Heart className="w-5 h-5 text-red-400" />
              <span>Hecho con</span>
              <span className="text-red-400 font-semibold">amor</span>
              <span>para la educación</span>
            </div>
          </div>
          
          {/* Right Section */}
          <div className="flex items-center space-x-8">
            <div className="text-gray-300 text-base">
              <span>Powered by</span>
              <span className="text-white font-bold ml-2 text-lg">Ministerio de Educación</span>
            </div>
            
            <button className="flex items-center space-x-3 text-gray-300 hover:text-white transition-all duration-300 text-base px-4 py-2 rounded-xl hover:bg-white/5">
              <ExternalLink className="w-5 h-5" />
              <span>Portal oficial</span>
            </button>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="mt-10 pt-8 border-t border-white/10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-8 text-gray-400 text-sm">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>© 2024 IsCale</span>
              </div>
              <span>•</span>
              <span>Todos los derechos reservados</span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="hover:text-white transition-colors text-sm flex items-center space-x-1">
                <BookOpen className="w-4 h-4" />
                <span>Términos</span>
              </a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors text-sm">Privacidad</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors text-sm">Ayuda</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

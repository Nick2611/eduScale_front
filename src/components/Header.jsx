
import React from 'react';
import { User } from 'lucide-react';

const Header = () => {
  return (
    <header className="glass border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-accent-blue to-accent-light-blue rounded-2xl flex items-center justify-center shadow-lg glow">
              <span className="text-white font-bold text-xl">I</span>
            </div>
            <div className="flex items-center space-x-3">
              <h1 className="text-3xl font-bold text-white tracking-tight">IsCale</h1>
              <div className="w-1.5 h-1.5 bg-accent-blue rounded-full"></div>
              <span className="text-gray-300 text-base font-medium">Ministerio de Educación</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-300 hover:text-white transition-all duration-300 font-medium text-base px-3 py-2 rounded-lg hover:bg-white/5">
              Catálogo
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-all duration-300 font-medium text-base px-3 py-2 rounded-lg hover:bg-white/5">
              Mi Estado
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-all duration-300 font-medium text-base px-3 py-2 rounded-lg hover:bg-white/5">
              Ayuda
            </a>
            <button className="bg-gradient-to-r from-accent-blue to-accent-light-blue hover:from-accent-light-blue hover:to-accent-blue text-white px-8 py-3 rounded-2xl font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 glow">
              Ingresar
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="bg-gradient-to-r from-accent-blue to-accent-light-blue hover:from-accent-light-blue hover:to-accent-blue text-white px-6 py-3 rounded-2xl font-semibold text-base transition-all duration-300 shadow-lg glow">
              Ingresar
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

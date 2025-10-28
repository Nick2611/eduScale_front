import React from 'react';
import { Search, ChevronDown } from 'lucide-react';

const SearchSection = () => {
  return (
    <div className="py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 via-transparent to-accent-light-blue/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 tracking-tight">
            <span className="text-gradient">Encontrá tu institución</span>
          </h1>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
            Descubrí las mejores instituciones educativas que se adaptan perfectamente a tus necesidades y aspiraciones
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-6xl mx-auto">
          <div className="glass rounded-3xl p-10 shadow-2xl glow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              {/* City/Province Input */}
              <div className="lg:col-span-4">
                <label className="block text-gray-200 text-base font-semibold mb-3">
                  Ubicación
                </label>
                <div className="relative group">
                  <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6 group-focus-within:text-accent-blue transition-colors" />
                  <input
                    type="text"
                    placeholder="Ciudad o Provincia"
                    className="w-full bg-white/5 text-white placeholder-gray-400 px-14 py-5 rounded-2xl border border-white/10 focus:border-accent-blue focus:outline-none transition-all duration-300 focus:ring-4 focus:ring-accent-blue/20 text-lg backdrop-blur-sm"
                  />
                </div>
              </div>

              {/* Filter Buttons */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-gray-200 text-base font-semibold mb-3">
                    Nivel
                  </label>
                  <button className="w-full bg-white/5 hover:bg-white/10 text-white px-5 py-5 rounded-2xl flex items-center justify-between transition-all duration-300 border border-white/10 hover:border-accent-blue group backdrop-blur-sm">
                    <span className="text-gray-300 group-hover:text-white">Seleccionar nivel</span>
                    <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-accent-blue transition-colors" />
                  </button>
                </div>
                
                <div>
                  <label className="block text-gray-200 text-base font-semibold mb-3">
                    Tipo
                  </label>
                  <button className="w-full bg-white/5 hover:bg-white/10 text-white px-5 py-5 rounded-2xl flex items-center justify-between transition-all duration-300 border border-white/10 hover:border-accent-blue group backdrop-blur-sm">
                    <span className="text-gray-300 group-hover:text-white">Tipo de Institución</span>
                    <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-accent-blue transition-colors" />
                  </button>
                </div>
                
                <div>
                  <label className="block text-gray-200 text-base font-semibold mb-3">
                    Carrera
                  </label>
                  <button className="w-full bg-white/5 hover:bg-white/10 text-white px-5 py-5 rounded-2xl flex items-center justify-between transition-all duration-300 border border-white/10 hover:border-accent-blue group backdrop-blur-sm">
                    <span className="text-gray-300 group-hover:text-white">Área de estudio</span>
                    <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-accent-blue transition-colors" />
                  </button>
                </div>
              </div>

              {/* Search Button */}
              <div className="lg:col-span-2">
                <button className="w-full bg-gradient-to-r from-accent-blue to-accent-light-blue hover:from-accent-light-blue hover:to-accent-blue text-white px-8 py-5 rounded-2xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-glow-lg transform hover:-translate-y-1 glow">
                  Buscar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;

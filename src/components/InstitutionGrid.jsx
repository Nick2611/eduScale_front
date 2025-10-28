import React from 'react';
import { ChevronDown, Grid, List, Search, Database } from 'lucide-react';

const InstitutionGrid = () => {
  return (
    <div className="flex-1">
      {/* Results Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
        <div className="flex items-center space-x-6">
          <div className="text-gray-200">
            <span className="text-white font-bold text-2xl">Resultados de búsqueda</span>
            <p className="text-gray-300 text-base mt-2">Encontramos instituciones que coinciden perfectamente con tu búsqueda</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          {/* View Toggle */}
          <div className="flex items-center glass rounded-2xl p-2">
            <button className="p-3 rounded-xl bg-accent-blue text-white glow">
              <Grid className="w-5 h-5" />
            </button>
            <button className="p-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300">
              <List className="w-5 h-5" />
            </button>
          </div>
          
          {/* Sort Dropdown */}
          <div className="flex items-center space-x-3">
            <span className="text-gray-200 text-base font-semibold">Ordenar por:</span>
            <button className="glass hover:bg-white/5 text-white px-6 py-3 rounded-2xl flex items-center space-x-3 transition-all duration-300 border border-white/10 hover:border-accent-blue group">
              <span className="text-base">Relevancia</span>
              <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-accent-blue transition-colors" />
            </button>
          </div>
        </div>
      </div>

      {/* Empty State - Ready for Redis Data */}
      <div className="glass rounded-3xl p-16 text-center glow">
        <div className="max-w-lg mx-auto">
          <div className="w-24 h-24 bg-gradient-to-br from-accent-blue/30 to-accent-light-blue/30 rounded-3xl flex items-center justify-center mx-auto mb-8 glow">
            <Database className="w-12 h-12 text-accent-blue" />
          </div>
          <h3 className="text-white text-2xl font-bold mb-4">
            Listo para mostrar instituciones
          </h3>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Las instituciones se cargarán automáticamente desde la base de datos Redis cuando realices una búsqueda.
          </p>
          <div className="bg-gradient-to-r from-accent-blue/20 to-accent-light-blue/20 rounded-2xl p-6 glow">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <Search className="w-6 h-6 text-accent-blue" />
              <p className="text-accent-blue text-lg font-bold">
                Conecta tu backend Redis
              </p>
            </div>
            <p className="text-gray-300 text-sm">
              Los resultados aparecerán aquí automáticamente
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionGrid;

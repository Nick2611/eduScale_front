import React from 'react';
import { ChevronRight, MapPin, GraduationCap, Building, Globe, Award } from 'lucide-react';

const FilterSidebar = () => {
  const filters = [
    { name: 'Ubicación', icon: MapPin, active: false },
    { name: 'Nivel', icon: GraduationCap, active: false },
    { name: 'Tipo', icon: Building, active: false },
    { name: 'Idioma', icon: Globe, active: false },
    { name: 'Becas disponibles', icon: Award, active: true, special: true },
  ];

  return (
    <div className="w-80 glass p-10 rounded-3xl shadow-2xl glow">
      <div className="mb-10">
        <h3 className="text-white text-2xl font-bold mb-3">Filtrar por</h3>
        <p className="text-gray-300 text-base">Refiná tu búsqueda para encontrar exactamente lo que necesitás</p>
      </div>
      
      <div className="space-y-3">
        {filters.map((filter, index) => {
          const IconComponent = filter.icon;
          return (
            <div key={index} className="group">
              <label className="flex items-center justify-between p-5 rounded-2xl hover:bg-white/5 cursor-pointer transition-all duration-300 group-hover:shadow-lg border border-transparent group-hover:border-white/10">
                <div className="flex items-center space-x-5">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={filter.active}
                      onChange={() => {}}
                      className="w-6 h-6 text-accent-blue bg-white/5 border-white/20 rounded-xl focus:ring-accent-blue focus:ring-4 focus:ring-accent-blue/20 focus:ring-offset-0"
                    />
                    {filter.special && filter.active && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-blue rounded-full border-2 border-dark-card glow"></div>
                    )}
                  </div>
                  <IconComponent className="w-6 h-6 text-gray-400 group-hover:text-accent-blue transition-all duration-300" />
                  <span className="text-white group-hover:text-accent-blue transition-all duration-300 font-semibold text-base">
                    {filter.name}
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-accent-blue transition-all duration-300 group-hover:translate-x-1" />
              </label>
            </div>
          );
        })}
      </div>

      <div className="mt-10 pt-8 border-t border-white/10">
        <div className="bg-gradient-to-r from-accent-blue/20 to-accent-light-blue/20 rounded-2xl p-6 glow">
          <p className="text-white text-base font-bold mb-2">
            Resultados encontrados
          </p>
          <p className="text-gray-200 text-sm">
            Mostrando <span className="font-bold text-accent-blue text-lg">12</span> de <span className="font-bold text-white text-lg">342</span> instituciones
          </p>
          <div className="mt-4 w-full bg-white/10 rounded-full h-2">
            <div className="bg-gradient-to-r from-accent-blue to-accent-light-blue h-2 rounded-full w-1/12 transition-all duration-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;

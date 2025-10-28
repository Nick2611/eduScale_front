import React from 'react';

const InstitutionCard = ({ institution, isPlaceholder = false }) => {
  if (isPlaceholder) {
    return (
      <div className="bg-dark-card rounded-lg p-6 animate-pulse">
        <div className="flex space-x-4">
          <div className="w-16 h-16 bg-dark-gray rounded-lg flex-shrink-0"></div>
          <div className="flex-1 space-y-3">
            <div className="h-4 bg-dark-gray rounded w-3/4"></div>
            <div className="h-3 bg-dark-gray rounded w-1/2"></div>
            <div className="flex space-x-2">
              <div className="h-6 bg-dark-gray rounded w-16"></div>
              <div className="h-6 bg-dark-gray rounded w-20"></div>
              <div className="h-6 bg-dark-gray rounded w-16"></div>
            </div>
            <div className="flex space-x-2 pt-2">
              <div className="h-8 bg-dark-gray rounded w-20"></div>
              <div className="h-8 bg-dark-gray rounded w-20"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark-card rounded-lg p-6 hover:bg-dark-gray transition-colors">
      <div className="flex space-x-4">
        {/* Icon */}
        <div className="w-16 h-16 bg-accent-blue rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-white text-2xl font-bold">C</span>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-white font-semibold text-lg mb-1">
            {institution.name}
          </h3>
          <p className="text-light-gray text-sm mb-3">
            {institution.location}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {institution.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-dark-gray text-white text-xs px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <button className="bg-dark-gray hover:bg-dark-bg text-white px-4 py-2 rounded-lg text-sm transition-colors">
              Ver más
            </button>
            <button className="bg-accent-blue hover:bg-accent-light-blue text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Postular
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionCard;

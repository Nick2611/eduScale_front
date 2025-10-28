import React from 'react';
import Header from './components/Header';
import SearchSection from './components/SearchSection';
import FilterSidebar from './components/FilterSidebar';
import InstitutionGrid from './components/InstitutionGrid';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-dark-bg via-dark-bg to-dark-card/30"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(96,165,250,0.1),transparent_50%)]"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <SearchSection />
        
        {/* Main Content */}
        <main className="flex-1 max-w-7xl mx-auto px-6 lg:px-8 py-16 w-full">
          <div className="flex gap-10 animate-fade-in">
            {/* Sidebar */}
            <div className="hidden lg:block animate-slide-up">
              <FilterSidebar />
            </div>
            
            {/* Main Content */}
            <div className="flex-1 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <InstitutionGrid />
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}

export default App;
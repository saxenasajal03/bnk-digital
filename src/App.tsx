import React, { useState } from 'react';
import { ThreeCosmosCanvas } from './components/ThreeCosmosCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesGrid } from './components/ServicesGrid';
import { LeadershipSection } from './components/LeadershipSection';
import { Footer } from './components/Footer';
import { ImageModal } from './components/ImageModal';
import { AudioPlayerWidget } from './components/AudioPlayerWidget';
import { AIAssistant } from './components/AIAssistant';
import { ROICalculator } from './components/ROICalculator';
import { CosmicCursor } from './components/CosmicCursor';
import { playFuturisticClick } from './utils/sound';

export function App() {
  const [selectedServiceForForm, setSelectedServiceForForm] = useState<string>('Social Media Management');
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    imageSrc: string;
    title: string;
    description?: string;
  }>({
    isOpen: false,
    imageSrc: '',
    title: '',
  });

  const handleOpenPosterModal = () => {
    playFuturisticClick();
    setModalConfig({
      isOpen: true,
      imageSrc: './assets/services_poster.jpg',
      title: '8 Powerful Digital Services — Official Blueprint',
      description: 'Comprehensive overview of all 8 core services delivered by BNK Digital.',
    });
  };

  const handleOpenConsultation = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#05070f] text-slate-100 selection:bg-pink-500 selection:text-white">
      {/* Dynamic Cosmic Antigravity Cursor Trail (Desktop) */}
      <CosmicCursor />

      {/* 3D Cosmos Interactive Background Canvas (Fixed) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ThreeCosmosCanvas />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Navigation Bar */}
        <Navbar 
          onOpenConsultation={handleOpenConsultation} 
          onOpenCalculator={() => setIsCalculatorOpen(true)}
        />

        {/* Main Content Sections */}
        <main>
          {/* Panel 1: Hero Section & Baba Neeb Karori Heritage Card */}
          <Hero
            onOpenConsultation={handleOpenConsultation}
            onOpenPosterModal={handleOpenPosterModal}
          />

          {/* Panel 2: The 8 Powerful Digital Services (2-Column Glowing Neon Grid) */}
          <ServicesGrid
            onSelectServiceForContact={(svc) => setSelectedServiceForForm(svc)}
            onOpenPosterModal={handleOpenPosterModal}
          />

          {/* Panel 3: Meet Our Leadership Team with Real Photos & Digital Family */}
          <LeadershipSection />
        </main>

        {/* Panel 3 Bottom: Footer with Neon Line, Lucknow HQ, Quick Links, and Lead Form */}
        <Footer />

      </div>

      {/* Interactive Background Sound Controller Widget (Bottom-Left) */}
      <AudioPlayerWidget />

      {/* Interactive AI Assistant Widget to Reply (Bottom-Right) */}
      <AIAssistant />

      {/* Interactive Growth & ROI Calculator Modal */}
      <ROICalculator
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />

      {/* High-Resolution Asset Modal Viewer */}
      <ImageModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
        imageSrc={modalConfig.imageSrc}
        title={modalConfig.title}
        description={modalConfig.description}
      />
    </div>
  );
}

export default App;

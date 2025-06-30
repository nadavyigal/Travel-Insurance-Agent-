import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HealthEndpoint from './components/HealthEndpoint';
import ChatBot from './components/ChatBot';
import Home from './pages/Home';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import Legal from './pages/Legal';
import Health from './pages/Health';
import Blog from './pages/Blog';
import { UserSession } from './utils/session';

function App() {
  const [currentLeadUuid, setCurrentLeadUuid] = useState<string | undefined>(
    UserSession.getCurrentLeadUuid() || undefined
  );

  useEffect(() => {
    // Listen for lead creation events
    const handleLeadCreated = (event: CustomEvent) => {
      const { leadUuid } = event.detail;
      setCurrentLeadUuid(leadUuid);
      UserSession.setCurrentLeadUuid(leadUuid);
    };

    window.addEventListener('lead_created', handleLeadCreated as EventListener);
    
    return () => {
      window.removeEventListener('lead_created', handleLeadCreated as EventListener);
    };
  }, []);

  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <HealthEndpoint />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/health" element={<Health />} />
              <Route path="/blog" element={<Blog />} />
            </Routes>
          </main>
          <Footer />
          <ChatBot leadUuid={currentLeadUuid} />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
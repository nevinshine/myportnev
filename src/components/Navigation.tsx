import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import CircularText from './CircularText';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'resume', label: 'Resume' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'contact', label: 'Contact' }
];

export const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <CircularText 
                text="ALEX • JOHNSON • " 
                spinDuration={15}
                onHover="speedUp"
                className="logo-circular"
              />
              <span className="font-bold text-xl text-primary hidden sm:block">Portfolio</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-1">
              {navItems.map(item => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => scrollToSection(item.id)}
                  className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                >
                  {item.label}
                </Button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border">
            <div className="px-4 py-2 space-y-1">
              {navItems.map(item => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => scrollToSection(item.id)}
                  className="w-full justify-start"
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </nav>
      
      <style>{`
        .nav-item {
          transition: var(--transition-smooth);
          position: relative;
        }
        
        .nav-item.active {
          background: var(--portfolio-gradient);
          color: white;
          box-shadow: var(--portfolio-shadow);
        }
        
        .nav-item:not(.active):hover {
          background: hsl(var(--muted));
          transform: translateY(-1px);
        }
        
        .logo-circular {
          width: 50px !important;
          height: 50px !important;
        }
        
        .logo-circular span {
          font-size: 8px !important;
          font-weight: 800 !important;
          color: hsl(var(--primary)) !important;
        }
      `}</style>
    </>
  );
};

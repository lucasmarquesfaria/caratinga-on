
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Check if current route matches link path
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Change header background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container-fluid py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-semibold text-caratinga-700">Caratinga Conecta</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink to="/" isActive={isActive('/')}>
              Início
            </NavLink>
            <NavLink to="/submit" isActive={isActive('/submit')}>
              Reportar Problema
            </NavLink>
            <NavLink to="/complaints" isActive={isActive('/complaints')}>
              Ver Denúncias
            </NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-morphism absolute top-full left-0 right-0 animate-fade-in">
          <div className="py-4 px-6 flex flex-col space-y-4">
            <MobileNavLink to="/" isActive={isActive('/')}>
              Início
            </MobileNavLink>
            <MobileNavLink to="/submit" isActive={isActive('/submit')}>
              Reportar Problema
            </MobileNavLink>
            <MobileNavLink to="/complaints" isActive={isActive('/complaints')}>
              Ver Denúncias
            </MobileNavLink>
          </div>
        </div>
      )}
    </header>
  );
};

const NavLink = ({ 
  children, 
  to, 
  isActive 
}: { 
  children: React.ReactNode, 
  to: string, 
  isActive: boolean 
}) => (
  <Link 
    to={to} 
    className={`relative py-2 text-base font-medium transition-colors hover:text-caratinga-600 ${
      isActive 
        ? 'text-caratinga-600' 
        : 'text-foreground'
    }`}
  >
    {children}
    {isActive && (
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-caratinga-500 rounded-full" />
    )}
  </Link>
);

const MobileNavLink = ({ 
  children, 
  to, 
  isActive 
}: { 
  children: React.ReactNode, 
  to: string, 
  isActive: boolean 
}) => (
  <Link 
    to={to} 
    className={`block py-3 px-4 text-lg rounded-md transition-colors ${
      isActive 
        ? 'bg-caratinga-50 text-caratinga-600 font-medium' 
        : 'text-foreground hover:bg-caratinga-50 hover:text-caratinga-600'
    }`}
  >
    {children}
  </Link>
);

export default Header;

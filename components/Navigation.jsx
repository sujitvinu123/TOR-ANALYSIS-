import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Eye, Network, Menu, X } from 'lucide-react';

export default function Navigation() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentPath = router.pathname;

  const navItems = [
    {
      name: 'Browser Tracking',
      path: '/',
      icon: Eye,
      description: 'Monitor your Tor Browser activity',
    },
    {
      name: 'TOR Traffic Monitoring',
      path: '/tor-monitoring',
      icon: Network,
      description: 'Metadata-level traffic analysis & forensics',
    },
  ];

  const handleNavigation = (path) => {
    router.push(path);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="glass border-b border-gov-border bg-white shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              
              return (
                <motion.button
                  key={idx}
                  onClick={() => handleNavigation(item.path)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    relative px-6 py-3 rounded-lg font-semibold text-sm transition-all
                    ${isActive 
                      ? 'text-gov-primary bg-gov-primary/10 border border-gov-primary/20' 
                      : 'text-gov-gray hover:text-gov-primary hover:bg-gov-primary/5'
                    }
                  `}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gov-primary rounded-t-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gov-gray hover:bg-gov-primary/10"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4 space-y-2"
          >
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              
              return (
                <button
                  key={idx}
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all
                    ${isActive 
                      ? 'text-gov-primary bg-gov-primary/10 border border-gov-primary/20' 
                      : 'text-gov-gray hover:bg-gov-primary/5'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-xs text-gov-gray">{item.description}</div>
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}
      </div>
    </nav>
  );
}


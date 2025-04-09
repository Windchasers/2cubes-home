'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  const toggleMenu = () => {
    console.log('toggleMenu called, current isOpen:', isOpen);
    
    // Force state update with a callback to ensure it's applied
    setIsOpen(prevState => {
      const newState = !prevState;
      console.log('isOpen set to:', newState);
      
      // Toggle body scroll
      if (newState) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
      
      return newState;
    });
  };

  return (
    <>
      <div 
        className="cursor-pointer fixed top-6 right-6 z-50 bg-transparent p-2" 
        onClick={toggleMenu}
        style={{ width: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <img
          src={isOpen ? "/images/close.svg" : "/images/menu_icon.svg"}
          alt="Menu"
          className="menu-icon w-full h-full"
        />
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-white z-50 fade-in">
          <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-10">
              <div className="head-text entitle">
                <Link href="/" onClick={() => setIsOpen(false)}>2cubes_</Link>
                <span>design</span>
              </div>
              <div className="cursor-pointer" onClick={toggleMenu}>
                <span className="text-2xl">&times;</span>
              </div>
            </div>

            <div className="nav-list">
              <ul>
                <li>
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className="text-2xl hover:opacity-70 transition-opacity block"
                  >
                    design
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    onClick={() => setIsOpen(false)}
                    className="text-2xl hover:opacity-70 transition-opacity block"
                  >
                    about
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="text-2xl hover:opacity-70 transition-opacity block"
                  >
                    contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

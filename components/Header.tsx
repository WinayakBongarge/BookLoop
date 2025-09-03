

import React, { useState, useContext, useRef, useEffect } from 'react';
import { AppContext } from '../contexts/AppContext';
import Icon from './Icon';
import Button from './Button';

const Header: React.FC = () => {
  const context = useContext(AppContext);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  
  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      alert(`Searching for "${event.currentTarget.value}"... (feature not implemented)`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuRef]);

  const handleNavigation = (view: string) => {
    context?.navigate(view);
    setIsProfileMenuOpen(false); // Close menu on navigation
  };

  return (
    <header className="sticky top-0 bg-primary shadow-md z-20 px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
            <button onClick={() => context?.navigate('home')} className="text-white text-2xl font-bold font-roboto tracking-wide">
                BookLoop
            </button>
        </div>

        <div className="flex-1 max-w-2xl hidden sm:flex items-center mx-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="search" className="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search for books, authors..."
              className="w-full bg-surface border border-transparent rounded-sm py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-accent transition text-neutral-dark placeholder-gray-500"
              onKeyDown={handleSearch}
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
            <div className="hidden md:block">
                <Button variant="secondary" className="!bg-white !text-primary !shadow-none hover:!bg-gray-100" onClick={() => handleNavigation('listBook')}>
                    List a Book
                </Button>
            </div>
            <button
                className="sm:hidden text-white p-2 rounded-full hover:bg-primary-dark/50"
                onClick={() => alert('Search feature coming soon!')}
                aria-label="Search books"
            >
                <Icon name="search" />
            </button>
          <button 
            className="relative text-white hover:text-gray-200 p-2 rounded-full hover:bg-primary-dark/50"
            onClick={() => alert('No new notifications.')}
            aria-label="View notifications"
          >
            <Icon name="notifications" />
            <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-secondary rounded-full border-2 border-primary"></span>
          </button>
          <div className="relative" ref={profileMenuRef}>
            <button onClick={() => setIsProfileMenuOpen(prev => !prev)} className="focus:outline-none rounded-full" aria-label="View profile menu">
                <img 
                src="https://picsum.photos/seed/user/100/100" 
                alt="Profile" 
                className="h-9 w-9 rounded-full object-cover border-2 border-white"
                />
            </button>
            {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-surface rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                    <div className="px-4 py-2 border-b">
                        <p className="text-sm font-semibold text-on-surface">Rohan Gupta</p>
                        <p className="text-xs text-gray-500 truncate">rohan.gupta@example.com</p>
                    </div>
                    <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('profile'); }} className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Icon name="person_outline" className="mr-3 text-lg" /> My Profile
                    </a>
                    <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('myBooks'); }} className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Icon name="book" className="mr-3 text-lg" /> My Books
                    </a>
                    <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('myRentals'); }} className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Icon name="bookmark_border" className="mr-3 text-lg" /> My Rentals
                    </a>
                        <div className="border-t my-1"></div>
                    <a href="#" onClick={(e) => { e.preventDefault(); alert('Logging out...'); }} className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Icon name="logout" className="mr-3 text-lg" /> Logout
                    </a>
                </div>
            )}
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
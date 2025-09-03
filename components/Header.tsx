
import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import Icon from './Icon';

const Header: React.FC = () => {
  const context = useContext(AppContext);

  return (
    <header className="sticky top-0 bg-surface shadow-md z-20 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-2xl flex items-center">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="search" className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for books, authors..."
              className="w-full bg-neutral-light border border-neutral-medium rounded-full py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition text-neutral-dark placeholder-gray-500"
            />
          </div>
            <div className="hidden sm:flex items-center ml-4 pl-4 border-l border-neutral-medium">
                <Icon name="location_on" className="text-gray-500 mr-2"/>
                <span className="text-sm font-medium text-gray-700">Pincode: <strong>110001</strong></span>
            </div>
        </div>
        <div className="flex items-center space-x-4 ml-4">
          <button className="relative text-gray-500 hover:text-neutral-dark p-2 rounded-full hover:bg-neutral-light">
            <Icon name="notifications" />
            <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-secondary rounded-full border-2 border-surface"></span>
          </button>
          <button onClick={() => context?.navigate('profile')} className="focus:outline-none rounded-full">
            <img 
              src="https://picsum.photos/seed/user/100/100" 
              alt="Profile" 
              className="h-9 w-9 rounded-full object-cover"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

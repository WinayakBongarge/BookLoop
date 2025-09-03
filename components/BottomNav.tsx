
import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import Icon from './Icon';

const navItems = [
    { name: 'Home', icon: 'home', view: 'home' },
    { name: 'My Books', icon: 'book', view: 'myBooks' },
    { name: 'List', icon: 'add_circle', view: 'listBook' },
    { name: 'Rentals', icon: 'bookmark', view: 'myRentals' },
];

const BottomNav: React.FC = () => {
    const context = useContext(AppContext);
    
    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface shadow-[0_-2px_5px_rgba(0,0,0,0.1)] flex justify-around items-center h-16 z-30">
            {navItems.map(item => (
                <a
                    key={item.name}
                    href="#"
                    onClick={(e) => { e.preventDefault(); context?.navigate(item.view); }}
                    className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                        context?.view === item.view ? 'text-primary' : 'text-gray-500 hover:text-primary'
                    }`}
                >
                    <Icon name={item.icon} className="h-6 w-6 mb-1" />
                    <span className="text-xs font-medium">{item.name}</span>
                </a>
            ))}
        </nav>
    );
};

export default BottomNav;

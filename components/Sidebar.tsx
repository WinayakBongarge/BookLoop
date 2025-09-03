
import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import Icon from './Icon';

const navItems = [
    { name: 'Home', icon: 'home', view: 'home' },
    { name: 'My Books', icon: 'book', view: 'myBooks' },
    { name: 'My Rentals', icon: 'bookmark', view: 'myRentals' },
    { name: 'List a Book', icon: 'add_circle', view: 'listBook' },
];

const Sidebar: React.FC = () => {
    const context = useContext(AppContext);
    
    return (
        <aside className="hidden md:flex flex-col w-64 bg-surface shadow-lg fixed top-0 left-0 h-full z-30">
            <div className="flex items-center justify-center h-20 border-b border-neutral-medium">
                <h1 className="text-3xl font-bold text-primary font-roboto">BookLoop</h1>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-1">
                {navItems.map(item => (
                    <a
                        key={item.name}
                        href="#"
                        onClick={(e) => { e.preventDefault(); context?.navigate(item.view); }}
                        className={`flex items-center px-4 py-3 rounded-md transition-colors text-base font-medium ${
                            context?.view === item.view
                                ? 'bg-primary/10 text-primary font-semibold'
                                : 'text-gray-600 hover:bg-neutral-light'
                        }`}
                    >
                        <Icon name={item.icon} className="h-6 w-6 mr-4" />
                        {item.name}
                    </a>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
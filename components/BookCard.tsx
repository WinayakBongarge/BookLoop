
import React, { useContext } from 'react';
import type { Book } from '../types';
import { AppContext } from '../contexts/AppContext';
import Icon from './Icon';

const BookCard: React.FC<{ book: Book }> = ({ book }) => {
    const context = useContext(AppContext);

    return (
        <div 
            className="bg-surface rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col hover:shadow-xl"
            onClick={() => context?.navigate('bookDetails', book.id)}
            aria-label={`View details for ${book.title}`}
        >
            <div className="w-full h-56 sm:h-64">
                <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-base font-montserrat font-semibold text-on-surface truncate" title={book.title}>{book.title}</h3>
                <p className="text-sm text-gray-500 mb-2 truncate">{book.author}</p>
                <div className="mt-auto flex justify-between items-center">
                    <div>
                        <p className="text-lg font-bold text-primary">₹{book.pricePerDay}<span className="text-xs font-normal text-gray-500">/day</span></p>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Icon name="star" className="text-accent text-base" />
                        <span className="text-sm text-gray-600 font-semibold">{book.rating}</span>
                    </div>
                </div>
                <p className="text-xs text-gray-400 mt-2">{book.distance} km away</p>
            </div>
        </div>
    );
};

export default BookCard;

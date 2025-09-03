

import React, { useContext } from 'react';
import type { Book } from '../types';
import { AppContext } from '../contexts/AppContext';
import Icon from './Icon';

const BookCard: React.FC<{ book: Book }> = ({ book }) => {
    const context = useContext(AppContext);

    return (
        <div 
            className="bg-transparent book-card-container"
            onClick={() => context?.navigate('bookDetails', book.id)}
            aria-label={`View details for ${book.title}`}
        >
            <div className="cursor-pointer">
                <div className="relative w-full aspect-[2/3] book-cover">
                    <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover rounded-sm shadow-lg" />
                </div>
            </div>
            <div className="pt-2 flex flex-col">
                <h3 className="text-xs font-semibold text-on-surface truncate" title={book.title}>{book.title}</h3>
                <p className="text-[11px] text-gray-500 mb-1 truncate">{book.author}</p>
                <div className="mt-auto flex justify-between items-center">
                    <div>
                        <p className="text-sm font-bold text-on-surface">₹{book.pricePerDay}<span className="text-[10px] font-normal text-gray-500">/day</span></p>
                    </div>
                    <div className="flex items-center space-x-0.5 bg-green-600 text-white px-1 py-0.5 rounded-sm">
                        <span className="text-[10px] font-bold">{book.rating}</span>
                        <Icon name="star" className="text-white text-[10px]" />
                    </div>
                </div>
                <p className="text-[10px] text-gray-400 mt-1">{book.distance} km away</p>
            </div>
        </div>
    );
};

export default BookCard;
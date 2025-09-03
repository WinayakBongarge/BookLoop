

import React, { useContext } from 'react';
import type { Book } from '../types';
import BookCard from '../components/BookCard';
import Icon from '../components/Icon';
import Carousel from '../components/Carousel';
import { AppContext } from '../contexts/AppContext';

interface HomePageProps {
  books: Book[];
}

const CategoryCard: React.FC<{ name: string; icon: string }> = ({ name, icon }) => {
    const context = useContext(AppContext);
    return (
        <button 
            className={`bg-surface rounded-sm p-2 text-xs font-semibold text-on-surface flex flex-col items-center justify-center h-20 shadow-md hover:shadow-lg transition-shadow w-full`}
            onClick={() => context?.navigate('category', name)}
        >
            <Icon name={icon} className="text-primary text-3xl mb-1" />
            {name}
        </button>
    );
};

const BookGrid: React.FC<{ title: string; books: Book[] }> = ({ title, books }) => (
    <section className="mb-12">
        <h2 className="text-xl font-bold text-neutral-dark mb-4">{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-6 sm:gap-x-4 sm:gap-y-8">
            {books.map(book => (
                <BookCard key={book.id} book={book} />
            ))}
        </div>
    </section>
);


const HomePage: React.FC<HomePageProps> = ({ books }) => {
    const categories = [
        { name: "Fiction", icon: "auto_stories" },
        { name: "Mythology", icon: "temple_hindu" },
        { name: "Biography", icon: "person" },
        { name: "History", icon: "history_edu" },
        { name: "Sci-Fi", icon: "rocket_launch" },
        { name: "Business", icon: "business_center" },
    ];
    
    const carouselSlides = [
        {
            image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1974&auto=format&fit=crop',
            title: 'Discover Your Next Favorite Book',
            subtitle: 'Explore thousands of books shared by your community.'
        },
        {
            image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2070&auto=format&fit=crop',
            title: 'Affordable Renting',
            subtitle: 'Read more for less. Rent books at a fraction of their retail price.'
        },
        {
            image: 'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?q=80&w=2071&auto=format&fit=crop',
            title: 'Share & Earn',
            subtitle: 'List your own books and earn money when others rent them.'
        }
    ];

    return (
        <div className="space-y-8">
            <Carousel slides={carouselSlides} />
            
            <section>
                <h2 className="text-xl font-bold text-neutral-dark mb-4">Popular Categories</h2>
                <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                    {categories.map(cat => <CategoryCard key={cat.name} name={cat.name} icon={cat.icon} />)}
                </div>
            </section>
            
            <BookGrid title="Books Near You" books={books.slice(0, 10)} />
            
            <BookGrid title="Recommended for You" books={books.slice(10, 20)} />
        </div>
    );
};

export default HomePage;
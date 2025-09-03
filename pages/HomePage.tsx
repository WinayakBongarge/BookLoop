
import React from 'react';
import type { Book } from '../types';
import BookCard from '../components/BookCard';

interface HomePageProps {
  books: Book[];
}

const CategoryCard: React.FC<{ name: string; color: string }> = ({ name, color }) => (
    <div className={`rounded-lg p-4 text-white text-base font-bold font-montserrat flex items-center justify-center h-24 shadow-md hover:shadow-lg transition-shadow ${color}`}>
        {name}
    </div>
);

const BookGrid: React.FC<{ title: string; books: Book[] }> = ({ title, books }) => (
    <section className="mb-12">
        <h2 className="text-2xl font-montserrat font-bold text-neutral-dark mb-4">{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {books.map(book => (
                <BookCard key={book.id} book={book} />
            ))}
        </div>
    </section>
);


const HomePage: React.FC<HomePageProps> = ({ books }) => {
    const categories = [
        { name: "Fiction", color: "bg-blue-500" },
        { name: "Mythology", color: "bg-purple-500" },
        { name: "Biography", color: "bg-teal-500" },
        { name: "History", color: "bg-indigo-500" },
        { name: "Sci-Fi", color: "bg-orange-500" },
        { name: "Business", color: "bg-pink-500" },
    ];
    
    return (
        <div className="space-y-8">
            <section className="bg-gradient-to-r from-primary to-indigo-600 text-white rounded-lg p-6 sm:p-8 shadow-xl">
                <h1 className="text-3xl font-montserrat font-bold">Find Your Next Read, Near You.</h1>
                <p className="mt-2 opacity-90">Rent and lend books with people in your community. Enter your pincode to get started!</p>
            </section>
            
            <BookGrid title="Books Near You" books={books.slice(0, 10)} />
            
            <section className="mb-12">
                <h2 className="text-2xl font-montserrat font-bold text-neutral-dark mb-4">Popular Categories</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map(cat => <CategoryCard key={cat.name} name={cat.name} color={cat.color} />)}
                </div>
            </section>
            
            <BookGrid title="Recommended for You" books={books.slice(10, 20)} />
        </div>
    );
};

export default HomePage;

import React, { useContext } from 'react';
import type { Book } from '../types';
import BookCard from '../components/BookCard';
import Icon from '../components/Icon';
import { AppContext } from '../contexts/AppContext';

interface CategoryPageProps {
  categoryName: string;
  books: Book[];
}

const CategoryPage: React.FC<CategoryPageProps> = ({ categoryName, books }) => {
  const context = useContext(AppContext);

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => context?.navigate('home')}
          className="flex items-center text-sm font-semibold text-gray-600 hover:text-primary transition-colors"
          aria-label="Go back to home"
        >
          <Icon name="arrow_back" className="mr-2" />
          Back to Home
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-6">{categoryName} Books</h1>
      {books.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-6 sm:gap-x-4 sm:gap-y-8">
          {books.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center p-8 bg-surface rounded-lg shadow-md">
          <p>No books found in the "{categoryName}" category at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;

import React, { useState, useContext } from 'react';
import type { Book } from '../types';
import Button from '../components/Button';
import Icon from '../components/Icon';
import { AppContext } from '../contexts/AppContext';

interface BookDetailsPageProps {
  book: Book;
}

const StarIcon: React.FC<{ filled: boolean; className?: string }> = ({ filled, className = 'h-6 w-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`${className} ${filled ? 'text-green-500' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const StarRatingInput: React.FC<{ rating: number; setRating: (rating: number) => void }> = ({ rating, setRating }) => {
    return (
        <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                    aria-label={`Rate ${star} stars`}
                >
                    <StarIcon filled={star <= rating} className="h-8 w-8 cursor-pointer" />
                </button>
            ))}
        </div>
    );
};

interface Review {
    id: number;
    author: string;
    avatarSeed: string;
    rating: number;
    date: string;
    text: string;
}

const mockReviews: Review[] = [
    { id: 1, author: 'Priya S.', avatarSeed: 'reviewer1', rating: 5, date: 'July 15, 2024', text: "An absolute masterpiece! The character development was incredible, and I couldn't put it down. Highly recommend renting this." },
    { id: 2, author: 'Rohan G.', avatarSeed: 'reviewer2', rating: 4, date: 'July 10, 2024', text: "A really solid read. The plot had some interesting twists. The book was in great condition when I received it." },
];


const BookDetailsPage: React.FC<BookDetailsPageProps> = ({ book }) => {
  const context = useContext(AppContext);
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [newReviewText, setNewReviewText] = useState('');
  const [rentRequested, setRentRequested] = useState(false);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReviewRating > 0 && newReviewText.trim() !== '') {
        const newReview: Review = {
            id: Date.now(),
            author: 'Aarav M.', // Assuming the current user
            avatarSeed: 'user',
            rating: newReviewRating,
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            text: newReviewText,
        };
        setReviews([newReview, ...reviews]);
        setNewReviewRating(0);
        setNewReviewText('');
    }
  };
  
  const handleRent = () => {
    // In a real app, this would trigger a rental process
    // For this mock, we'll just show a confirmation.
    setRentRequested(true);
    setTimeout(() => {
        alert(`Your request to rent "${book.title}" has been sent to the owner!`);
        context?.navigate('myRentals');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto">
        <button
            onClick={() => context?.navigate('home')}
            className="flex items-center text-sm font-semibold text-gray-600 hover:text-primary transition-colors mb-4"
            aria-label="Go back"
        >
            <Icon name="arrow_back" className="mr-2" />
            Back to results
        </button>

        <div className="bg-surface rounded-lg shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 p-4 sm:p-6 lg:p-8">
                {/* Left Column: Image */}
                <div className="md:col-span-1">
                    <img src={book.coverUrl} alt={`Cover of ${book.title}`} className="w-full max-w-xs mx-auto rounded-md shadow-lg object-cover aspect-[2/3]" />
                </div>

                {/* Right Column: Details & Actions */}
                <div className="md:col-span-2">
                    <div className="mb-4">
                        <h1 className="text-2xl font-bold text-on-surface">{book.title}</h1>
                        <h2 className="text-lg text-gray-600">{book.author}</h2>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
                        <div className="flex items-center space-x-1 bg-green-600 text-white px-2 py-1 rounded-md">
                            <span className="text-lg font-bold">{book.rating}</span>
                            <Icon name="star" className="text-white" />
                        </div>
                        <span className="text-gray-500">•</span>
                        <span className="font-semibold text-gray-700">{book.category}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-700">Condition: <span className="font-semibold">{book.condition}</span></span>
                    </div>

                    <div className="mb-6 p-4 bg-primary/5 rounded-lg border-l-4 border-primary">
                         <p className="text-3xl font-bold text-on-surface">₹{book.pricePerDay}<span className="text-base font-normal text-gray-500"> / day</span></p>
                    </div>
                    
                    <Button onClick={handleRent} disabled={rentRequested} className="w-full !py-3 !text-lg">
                        {rentRequested ? 'Processing Request...' : 'Rent Now'}
                    </Button>
                    
                     <div className="mt-6 border-t pt-6">
                        <h3 className="text-lg font-semibold mb-2">Synopsis</h3>
                        <p className="text-gray-600 leading-relaxed">{book.synopsis}</p>
                    </div>

                    <div className="mt-6 border-t pt-6">
                        <h3 className="text-lg font-semibold mb-2">Lender Information</h3>
                         <div className="flex items-center space-x-3 bg-neutral-light p-3 rounded-md">
                            <img src={`https://picsum.photos/seed/${book.lenderName}/100/100`} alt={book.lenderName} className="h-12 w-12 rounded-full object-cover"/>
                            <div>
                                <p className="font-semibold">{book.lenderName}</p>
                                <p className="text-sm text-gray-500">{book.distance} km away • Pincode: {book.pincode}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="border-t p-4 sm:p-6 lg:p-8 bg-background">
                <h3 className="text-xl font-bold mb-4">Community Reviews ({reviews.length})</h3>
                <div className="space-y-6">
                    {reviews.map(review => (
                        <div key={review.id} className="flex items-start space-x-4">
                            <img src={`https://picsum.photos/seed/${review.avatarSeed}/100/100`} alt={review.author} className="h-11 w-11 rounded-full object-cover mt-1" />
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold">{review.author}</p>
                                        <p className="text-xs text-gray-500">{review.date}</p>
                                    </div>
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < review.rating} className="h-5 w-5" />)}
                                    </div>
                                </div>
                                <p className="mt-2 text-gray-700">{review.text}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add Review Form */}
                <div className="mt-8 border-t pt-6">
                    <h4 className="text-lg font-semibold mb-2">Write a Review</h4>
                    <form onSubmit={handleReviewSubmit}>
                        <div className="mb-3">
                             <label className="block text-sm font-medium text-gray-700 mb-1">Your Rating</label>
                            <StarRatingInput rating={newReviewRating} setRating={setNewReviewRating} />
                        </div>
                        <div>
                            <label htmlFor="review-text" className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
                            <textarea
                                id="review-text"
                                rows={4}
                                className="w-full p-3 border border-neutral-medium rounded-lg focus:ring-primary focus:border-primary transition bg-surface text-on-surface placeholder-gray-400"
                                placeholder="Share your thoughts about the book..."
                                value={newReviewText}
                                onChange={(e) => setNewReviewText(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <div className="text-right mt-4">
                            <Button type="submit" disabled={!newReviewRating || !newReviewText.trim()}>Submit Review</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
};

export default BookDetailsPage;
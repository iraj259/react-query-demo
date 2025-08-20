import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import { fetchIndividual } from '../../API/api';
import { FiFileText } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const FetchIndividual = () => {
  const { id } = useParams();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchIndividual(id),
    staleTime: 10000,
  });

  if (isPending)
    return <p className="text-center text-[#98DED9] mt-20 text-lg font-semibold">Loading...</p>;

  if (isError)
    return <p className="text-center text-red-500 mt-20 text-lg font-semibold">
      Error: {error.message || 'Something went wrong...'}
    </p>;

  return (
    <div className="max-w-4xl mx-auto p-8 sm:p-12 min-h-screen font-sans">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-[#F6FFF8] bg-clip-text text-transparent leading-tight tracking-tighter font-serif">
          Post Details
        </h1>
        <p className="mt-4 text-lg text-[#EAF4F4]">
          Detailed view of the selected Post.
        </p>
      </header>

      <div className="bg-gradient-to-br from-white to-green-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 relative border border-gray-100 transform hover:-translate-y-2">
        <div className="flex items-center text-green-400 mb-4 animate-bounce">
          <FiFileText className="text-4xl mr-3" />
          <span className="text-sm font-bold tracking-wider text-gray-800">
            Flashcard #{id}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-snug font-serif">
          {data?.title || 'Title not available'}
        </h3>

        <p className="text-gray-700 leading-relaxed text-sm">
          {data?.body || 'Content not available.'}
        </p>

        <NavLink to="/rq">
          <span className="text-[#6B9080] font-semibold mt-4 inline-block cursor-pointer hover:underline">
            ← Back to Posts
          </span>
        </NavLink>
      </div>
    </div>
  );
};

export default FetchIndividual;
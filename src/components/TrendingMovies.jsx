import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FcRating } from 'react-icons/fc';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Navigation, Pagination } from 'swiper/modules';
import '../../src/trendimg.css'; // Import your custom CSS file for responsive styles
import { Link } from 'react-router-dom';

const TrendingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const API_URL = 'https://api.themoviedb.org/3/trending/all/day';
  const ITEMS_PER_PAGE = 20;

  const fetchMovies = async (searchKey = '', page = 1) => {
    try {
      const type = searchKey ? 'search' : 'discover';
      const response = await axios.get(API_URL, {
        params: {
          api_key: '5cbb3dc33b775fca83106633287285a4',
          query: searchKey,
          page: page,
        },
      });

      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [currentPage]);

  const IMAGE_PATH = 'https://image.tmdb.org/t/p/w500';

  const trimTitle = (title) => {
    const words = title.split(' ');
    if (words.length > 3) {
      return words.slice(0, 4).join(' ') + '...';
    }
    return title;
  };

  const getYearFromDate = (date) => {
    return new Date(date).getFullYear();
  };

  return (
    <div className='px-4 md:px-8 lg:px-16 xl:px-20'>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
  {movies.map((item, index) => (
    <div className="flex flex-col items-center" key={index}>
      <div>
        <img
          src={`${IMAGE_PATH}${item.poster_path}`}
          alt={item.title}
          className="w-full h-auto object-cover rounded-md mb-4"
        />
      </div>
      <div className="h-[50px] px-2 text-center">
        <p className="font-medium">{trimTitle(item.title || item.name)}</p>
        {/* Uncomment this section if you want to display year and rating */}
        {/* <span className='flex justify-between items-center'>
          <p className='bottom-0'>{getYearFromDate(item.first_air_date || item.release_date)}</p>
          <p className='flex items-center'>
            {item.vote_average}
            <FcRating />
          </p>
        </span> */}
      </div>
    </div>
  ))}
</div>
      <div className='text-center'>
        <nav aria-label="Page navigation example">
          <ul className="list-style-none flex">
            <li>
              <Link
                onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
                className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                href="#"
              >
                Previous
              </Link>
            </li>
            {[...Array(Math.ceil(movies.length / ITEMS_PER_PAGE))].map((_, index) => (
              <li key={index}>
                <Link
                  onClick={() => setCurrentPage(index + 1)}
                  className={`relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white ${
                    currentPage === index + 1 ? 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-white' : ''
                  }`}
                  href="#"
                >
                  {index + 1}
                </Link>
              </li>
            ))}
            <li>
              <Link
                onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                href="#"
              >
                Next
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default TrendingMovies;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Navigation, Pagination } from 'swiper/modules';
import { FcRating } from "react-icons/fc";

import '../../src/trendimg.css';

const TopRated = () => {
  const [movies, setMovies] = useState([]);
  const API_URL = 'https://api.themoviedb.org/3/movie/top_rated';

  const fetchMovies = async (searchKey = "") => {
    try {
      const type = searchKey ? "search" : "discover";
      const page = 4;
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
  }, []);

  const IMAGE_PATH = 'https://image.tmdb.org/t/p/w500';

  const trimTitle = (title) => {
    // Show only 8 words in the title and complete with three points
    const words = title.split(' ');
    if (words.length > 3) {
      return words.slice(0, 4).join(' ') + '...';
    }
    return title;
  };


  const getYearFromDate = (date) => {
    // Extract the year from the date
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
      
    </div>
  );
};

export default TopRated;

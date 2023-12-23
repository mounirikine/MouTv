// Import statements
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FcRating } from "react-icons/fc";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FaCirclePlay, FaFire, FaSearch, FaPlayCircle } from "react-icons/fa";
import "../../src/trendimg.css";
import NotFoundImage from "../../src/components/tmovie.png";
import YouTube from 'react-youtube';

// Component definition
const Movies = () => {
  // State variables
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [page, setPage] = useState(1); // Change the initial page to 1
  const [selectMovie, setSelectMovie] = useState(null); // Set initial value to null
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
    // State for video player
    const [playing, setPlaying] = useState(false);
    const [trailer, setTrailer] = useState(null);
  const API_URL = "https://api.themoviedb.org/3";

  // Fetch movies function
  const fetchMovies = async (searchKey = "") => {
    try {
      setLoading(true);
      const type = searchKey ? "search" : "discover";

      const response = await axios.get(`${API_URL}/${type}/movie`, {
        params: {
          api_key: "5cbb3dc33b775fca83106633287285a4",
          query: searchKey,
          page: page,
        },
      });

      setMovies(response.data.results);
      console.log(response.data.results);
      setSelectMovie(null); // Reset selectMovie on new movie fetch
      setNotFound(response.data.results.length === 0);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  
  // Effect hook to fetch movies on component mount or when the page changes
 

  // Constants
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";

  // Helper functions
  // const trimTitle = (title) => {
  //   const words = title.split(" ");
  //   return words.length > 3 ? `${words.slice(0, 4).join(" ")}...` : title;
  // };

  const getYearFromDate = (date) => {
    return new Date(date).getFullYear();
  };


 
  // Search movies function
  const searchMovies = (e) => {
    e.preventDefault();
    setPage(1); // Reset page when performing a new search
    fetchMovies(searchKey);
  };

  // Pagination Buttons
  const totalPages = 5; // Set the total number of pages here

  const renderPaginationButtons = () => {

    return Array.from({ length: totalPages }, (_, index) => (
      <li key={index}>
        <button
          onClick={() => setPage(index + 1)}
          className={`px-4 py-2 ${
            page === index + 1
              ? "text-white bg-green-600"
              : "text-green-600 bg-white"
          } transition-colors duration-150 border ${
            index === 0 ? "rounded-l-lg" : ""
          } ${index === totalPages - 1 ? "rounded-r-lg" : ""} border-green-600 focus:shadow-outline hover:bg-green-100`}
        >
          {index + 1}
        </button>
      </li>
    ));
  };

  const getvideo = async () =>  {
    
    try {
      setLoading(true);
      const type = searchKey ? "search" : "discover";

      const response = await axios.get(`https://api.themoviedb.org/3/movie/1/videos`, {
        params: {
          api_key: "5cbb3dc33b775fca83106633287285a4",
        },
      });

      console.log(response.data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    fetchMovies();
    getvideo()
  }, [page]);

  // JSX rendering
  return (
    <>
      {/* Background Section */}
      {selectMovie && (
  <div
    className="relative  md:flex md:gap-8 lg:gap-1 mx-3 items-center"
    style={{
      backgroundImage: `url('${IMAGE_PATH}${selectMovie.backdrop_path}')`,
      height: "100vh",
      width: "100%",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      filter: "blur(0px)",
    }}
  >
    <div className="w-full  md:w-5/12 lg:w-3/12 mx-auto mb-4 md:mb-0">
      <img
        src={
          selectMovie.poster_path
            ? `${IMAGE_PATH}${selectMovie.poster_path}`
            : NotFoundImage
        }
        alt={selectMovie.original_name}
        className="w-full h-[50%] object-cover rounded-md mt-20 blur-0"
      />
    </div>
    {trailer && playing && (
              <div className="mt-4">
                <YouTube videoId="1" />
              </div>
            )}
    <div
      className="w-full  md:w-7/12 text-white text-center md:text-left lg:text-left p-4 md:p-32 me-20"
      style={{
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(5px)',
      }}
    >
      <h1 className="text-sm mb-2 underline underline-offset-2">
        {selectMovie.release_date}
      </h1>
      <h1 className="text-3xl md:text-5xl mb-4">{selectMovie.title ||selectMovie.original_name }</h1>
      <p className="mb-4">{selectMovie.overview || null}</p>
      <span>⭐{selectMovie.vote_average} </span> <br />
      <button className="px-6 md:px-10 py-2 mt-1 bg-stone-50 text-black text-semibold rounded-lg flex gap-2 items-center">
        <FaPlayCircle /> Play Trailer
      </button>
    </div>
  </div>
)}


      {/* Search Section */}
      <div className="w-full flex items-center justify-center mt-32 mb-5">
        <div className="px-4 md:px-8 lg:px-16 xl:px-20">
          {/* Trending Movies Section */}
          <div>
            <span className="w-12/12 mt-20 flex items-center justify-center mb-10">
              <FaFire className="text-red-600 text-3xl" />
              <h1 className="font-bold text-6xl md:text-xl">TV SHOW</h1>
            </span>

            {/* Search Form */}
            <div className="mb-10">
              <form className="max-w-xl mx-auto" onSubmit={searchMovies}>
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full outline-none p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search Mockups, Logos..."
                    required
                    onChange={(e) => setSearchKey(e.target.value)}
                  />
                  <button
                    style={{ backgroundColor: "red" }}
                    type="submit"
                    className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>

            {/* Display notFound message */}
            {notFound && (
              <p className="text-center">No search results found...</p>
            )}

            {/* Grid for displaying movies */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
              {movies.map((item, index) => (
                <div
                  className="flex flex-col items-center"
                  key={index}
                  onClick={() => {
                    setSelectMovie(item);
                  }}
                >
                  <div>
                    <img
                      src={
                        item.poster_path
                          ? `${IMAGE_PATH}${item.poster_path}`
                          : NotFoundImage
                      }
                      alt={item.title}
                      className="w-full h-[350px] object-cover rounded-md mb-4"
                    />
                  </div>
                  <div className="h-[50px] px-2 text-center">
                    <p className="font-medium">
                      {item.title || item.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Section */}
      <div className="p-4 flex items-center flex-wrap justify-end">
  <nav aria-label="Page navigation">
    <ul className="flex gap-2">
      <li>
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          className={`px-4 py-2 ${
            page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-white"
          } transition-colors duration-150 border rounded-l-lg border-green-600 focus:outline-none focus:shadow-outline`}
          disabled={page === 1}
        >
          Prev
        </button>
      </li>
      {renderPaginationButtons()}
      <li>
        <button
          onClick={() => setPage((prevPage) => Math.min(prevPage + 1, totalPages))}
          className={`px-4 py-2 ${
            page === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-white"
          } transition-colors duration-150 border rounded-r-lg border-green-600 focus:outline-none focus:shadow-outline`}
          disabled={page === totalPages}
        >
          Next
        </button>
      </li>
    </ul>
  </nav>
</div>

    </>
  );
};

// Export component
export default Movies;

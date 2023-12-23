import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Link, NavLink, useNavigate } from "react-router-dom"; // Ajout de la dépendance useHistory
import "swiper/css";
import "swiper/css/effect-cards";
import { HeroImages } from "../data/HeroImages";

export default function HeroSwiper() {
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const navigate = useNavigate(); // Initialisation de useHistory

  const API_URL = "https://api.themoviedb.org/3";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";

  const fetchMovies = async (searchKey = "") => {
    try {
      const type = searchKey ? "search" : "discover";
      const page = 2; // If page is a variable, define it here
      const response = await axios.get(`${API_URL}/${type}/movie`, {
        params: {
          api_key: "5cbb3dc33b775fca83106633287285a4",
          query: searchKey,
          page: page, // Include the page parameter here
        },
      });
     
      setMovies(response.data.results); // You might want to handle this dynamically based on user interactions
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  useEffect(() => {
    fetchMovies();
  }, [searchKey]);

  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
};

  return (
    <>
      <section className="w-full h-screen ">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Autoplay, Navigation]}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          className="mySwiper "
          style={{ height: "100vh" }}
        >
          {HeroImages.map((item, index) => (
            <SwiperSlide key={index}>
              <img
                src={item.image}
                alt=""
                className="hero w-full h-screen  object-cover"
                style={{ filter: "blur(0.5px)" }}
              />
            </SwiperSlide>
          ))}
          <div className="autoplay-progress" slot="container-end">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>
          <div className="absolute flex items-center justify-center w-full h-full top-0 left-0 px-10 z-50">
            <div className="container sm:w-7/12 w-12/12  mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
                Discover Amazing Movies
              </h1>
              <p className="text-lg md:text-xl mb-8 text-white">
                Explore a vast collection of movies from various genres.
              </p>

              {/* <div>
                <form className="max-w-md mx-auto" onSubmit={searchMovies}>
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

                      onChange={(e) => setSearchKey(e.target.value) }
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
              </div> */}

<div className="flex justify-center gap-2">
  <Link
    to="/tv"
    className="bg-red-500 w-full sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border border-transparent hover:border-blue-700"
  >
    TV SHOW
  </Link>
  <Link
    to="/movies"
    className="bg-red-500 w-full sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border border-transparent hover:border-blue-700"
  >
    MOVIES
  </Link>
</div>

            </div>
          </div>
        </Swiper>
      </section>
    </>
  );
}

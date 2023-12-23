import axios from 'axios';
import './index.css';
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Movies from './pages/Movies';
import Tv from './pages/Tv';
const App = () => {
    const [movie, setMovie] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [selectMovie, setSelectMovie] = useState({});
    const API_URL = 'https://api.themoviedb.org/3';
    // trending     const API_URL = 'https://api.themoviedb.org/3/trending/all/day';


    const fetchMovies = async (searchKey = "") => {
      try {
          const type = searchKey ? "search" : "discover";
          const page = 1; // If page is a variable, define it here
          const response = await axios.get(`${API_URL}/${type}/movie`, {
              params: {
                  api_key: '5cbb3dc33b775fca83106633287285a4',
                  query: searchKey,
                  page: page, // Include the page parameter here
              },
          });
  
          setMovie(response.data.results);
          setSelectMovie(response.data.results[0]);
      } catch (error) {
          console.error('Error fetching movies:', error);
      }
  };
  

    useEffect(() => {
        fetchMovies();
    }, []); // If you want to run the effect every time the component renders, remove the dependency array

    const IMAGE_PATH = 'https://image.tmdb.org/t/p/w500';

    const searchMovies = (e) => {
        e.preventDefault();
        fetchMovies(searchKey);
    };

    return (
       <> 
       {/* <div>

        <div style={{backgroundImage:`url('${IMAGE_PATH}${selectMovie.backdrop_path}')`,height:'300px'}}>
            <button>Play Trailer</button>
           <h1 style={{color:'white'}}>{selectMovie.title}</h1>
            <p style={{color:'white'}}>{selectMovie.overview ? selectMovie.overview  : null }</p>
        </div>


            <form onSubmit={searchMovies}>
                <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
                <button type="submit">Search</button>
            </form>
            {searchKey}
            {movie.map((mov) => (
                <div key={mov.id} onClick={()=>{setSelectMovie(mov)}}>
                    <img src={`${IMAGE_PATH}${mov.poster_path}`} alt={mov.title} />
                    <h1>{mov.title}</h1>
                </div>
            ))}
        </div> */}

        
       <section className='text-whit'>
       <Header />
       <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/movies' element={<Movies />} />
            <Route path='/tv' element={<Tv />} />
       </Routes>
       

       </section>
        </>
    );
};

export default App;

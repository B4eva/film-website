import React from 'react'
import  Search from './components/search'
import {useEffect,  useState} from 'react'
import Spinner from './components/spinner'
import MovieCard from './components/movie-card';
import { useDebounce } from 'react-use';


const API_BASE_URL = 'https://api.themoviedb.org/3';
 const API_KEY = import.meta.env.VITE_APP_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYWFkZWNkNzJkYzIzNWE1ODExNDJhNDM2NzljODBjOCIsIm5iZiI6MTc0MDEzNzI0Ny4zODksInN1YiI6IjY3Yjg2MzFmNzQzNDIwMGMyODIyODQ0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0u3KXt59GywdPcFdrdNr7HNe7dc3WY0JXLnuhCHsSV0`
  }
};




const App = () => {

  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [moviesList, setMoviesList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')  

  useDebounce(() => {
    setDebouncedSearchTerm(searchTerm);
  }
  , 500, [
    searchTerm  ]);

  const fetchMovies = async (query = '') => { 
    setIsLoading(true);
    setErrorMessage('');
     try { 
   
   const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` :
   `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

   const response = await fetch(endpoint, API_OPTIONS);


if(!response.ok){

  throw new Error('Failed to fetch movies');


} 
  const data = await response.json();

  if(data.response === 'false'){
    setErrorMessage(data.error ||  'No movies found');
  }

  setMoviesList(data.results || []);
  

     } catch (error) {
        setErrorMessage('Error fetching movies. Please try again later.');
    console.error(`Error Fetching movies  ${error}`);
    setMoviesList([]);  
    setIsLoading(false);
    return;
        
     }
      finally { 

        setIsLoading(false);
   
      }
  
  }

  useEffect(() => {
  fetchMovies(debouncedSearchTerm);

  }, [debouncedSearchTerm]);
 
   
  return (

    <main> 
    <div className="pattern"  />
      <div className='wrapper'>
        <header>  
          <img src="./hero.png" alt="Hero Banner" /> 
             <h1> Find <span className='text-gradient'>Movies </span> you'll Enjoy without the Hassle</h1>

             <Search  searchTerm = {searchTerm} setSearchTerm={setSearchTerm} />

        </header> 

         <section className='all-movies'> 

     <h2 className='mt-[40px]' >All Movies</h2>

          {/* {errorMessage && <p className='text-red-500 error-message'>{errorMessage}</p>} */}

    { isLoading ? (<Spinner /> ): errorMessage ? (<p className='text-red-500'> {errorMessage}</p>) : (
     <ul> 
      { moviesList.map((movie) => ( 
       <MovieCard key={movie.id}  movie={movie}  />
      ))}
     </ul>
    )}
         </section>
      </div>
 
      
 
  </main>
   
   
  )
}

export default App
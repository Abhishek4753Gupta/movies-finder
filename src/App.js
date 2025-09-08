import React,{useEffect,useState} from 'react'
import './App.css';
import searchIcon from './search.svg'
import MovieCard from './MovieCard';

// 257ef0ce 
const API_URL='http://www.omdbapi.com?apikey=257ef0ce';

export default function App() {

  const [movieTitle,setMovieTitle]=useState("");


  const [movies,setMovies]=useState([])

    const searchMovies= async (title)=>{
        const response=await fetch(`${API_URL}&s=${title}`);
        const data= await response.json();
        console.log(data);
        setMovies(data.Search);
    }

    useEffect(()=>{
        searchMovies('interstellar');
    },[]);

    function handleChange (event){
        setMovieTitle(event.target.value);
    }


  return (
    <>
      <div className="app">
        <h1>MoviesLand</h1>
        <div className="search">
          <input type="text" placeholder='search for movies' value={movieTitle} onChange={(event)=>handleChange(event)}/>
          <img src={searchIcon} alt="search icon" onClick={()=>searchMovies(movieTitle)}/>
        </div>
        {
          movies?.length >0
          ?(
            <div className="container">
              {movies.map((movie,index)=><MovieCard key={index} movie={movie}/>)}
            </div>
          ):(
            <div className="empty">
              <h2>No movies found</h2>
            </div>
          )
        }
      </div>
    </>
  );
}

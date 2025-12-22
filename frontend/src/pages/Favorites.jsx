import "../css/Favorites.css";
import { useState } from "react";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import MovieDetailModal from "../components/MovieDetailModal";

function Favorites() {
  const { favorites } = useMovieContext();
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (favorites && favorites.length > 0) {
    return (
      <div className="favorites">
        <h2>Your Favorites</h2>
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard 
              movie={movie} 
              key={movie.id} 
              onClick={setSelectedMovie}
            />
          ))}
        </div>
        {selectedMovie && (
          <MovieDetailModal
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="favorites-empty">
      <h2>Your Favorites is Empty</h2>
      <p>Start adding movies to your favorites and they will appear here!</p>
    </div>
  );
}

export default Favorites;

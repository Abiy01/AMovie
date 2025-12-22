import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext"

function MovieCard({movie, onClick}) {
    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()
    const favorite = isFavorite(movie.id)

    function onFavoriteClick(e) {
        e.stopPropagation()
        e.preventDefault()
        if (favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)
    }

    function handleCardClick() {
        if (onClick) {
            onClick(movie)
        }
    }

    if (!movie) return null;

    const posterUrl = movie.poster_path 
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Image';

    return <div className="movie-card" onClick={handleCardClick}>
        <div className="movie-poster">
            <img src={posterUrl} alt={movie.title || 'Movie'}/>
            <div className="movie-overlay">
                <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                    ♥
                </button>
            </div>
        </div>
        <div className="movie-info">
            <h3>{movie.title || 'Untitled'}</h3>
            <p className="movie-year">{movie.release_date?.split("-")[0] || 'N/A'}</p>
            {movie.overview && (
                <p className="movie-description">{movie.overview}</p>
            )}
        </div>
    </div>
}

export default MovieCard
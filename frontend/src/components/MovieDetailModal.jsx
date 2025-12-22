import { useEffect, useState } from "react";
import { getMovieDetails, getMovieCredits, getMovieVideos } from "../services/api";
import { useMovieContext } from "../contexts/MovieContext";
import "../css/MovieDetailModal.css";

function MovieDetailModal({ movie, onClose }) {
  const [movieDetails, setMovieDetails] = useState(null);
  const [credits, setCredits] = useState(null);
  const [videos, setVideos] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();

  useEffect(() => {
    if (movie && movie.id) {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const [details, creditsData, videosData] = await Promise.all([
            getMovieDetails(movie.id),
            getMovieCredits(movie.id),
            getMovieVideos(movie.id)
          ]);
          setMovieDetails(details);
          setCredits(creditsData);
          setVideos(videosData);
        } catch (err) {
          console.error("Error fetching movie data:", err);
          setError("Failed to load movie details");
          // Use the movie data we already have if API fails
          setMovieDetails(movie);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [movie]);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const displayMovie = movieDetails || movie;
  if (!displayMovie) return null;

  const posterUrl = displayMovie.poster_path
    ? `https://image.tmdb.org/t/p/w500${displayMovie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const backdropUrl = displayMovie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${displayMovie.backdrop_path}`
    : null;

  // Get the first official trailer
  const trailer = videos?.results?.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  const handleTrailerClick = () => {
    setShowTrailer(true);
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        {loading && !movieDetails ? (
          <div className="modal-loading">Loading...</div>
        ) : (
          <>
            <button className="modal-close" onClick={onClose}>
              ×
            </button>
            {backdropUrl && (
              <div
                className="modal-backdrop-image"
                style={{ backgroundImage: `url(${backdropUrl})` }}
              />
            )}
            <div className="modal-body">
              <div className="modal-poster">
                <img src={posterUrl} alt={displayMovie.title} />
              </div>
              <div className="modal-info">
                <div className="modal-header">
                  <h2>{displayMovie.title}</h2>
                  <button
                    className={`modal-favorite-btn ${isFavorite(movie.id) ? "active" : ""}`}
                    onClick={handleFavoriteClick}
                  >
                    ♥
                  </button>
                </div>
                <div className="modal-meta">
                  {displayMovie.release_date && (
                    <span className="meta-item">
                      {new Date(displayMovie.release_date).getFullYear()}
                    </span>
                  )}
                  {displayMovie.runtime && (
                    <span className="meta-item">{displayMovie.runtime} min</span>
                  )}
                  {displayMovie.vote_average && (
                    <span className="meta-item">
                      ⭐ {displayMovie.vote_average.toFixed(1)}/10
                    </span>
                  )}
                </div>
                {displayMovie.genres && displayMovie.genres.length > 0 && (
                  <div className="modal-genres">
                    {displayMovie.genres.map((genre) => (
                      <span key={genre.id} className="genre-tag">
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}
                {trailer && !showTrailer && (
                  <div className="modal-trailer-section">
                    <button className="trailer-button" onClick={handleTrailerClick}>
                      ▶ Watch Trailer
                    </button>
                  </div>
                )}
                {showTrailer && trailer && (
                  <div className="modal-trailer-video">
                    <div className="trailer-header">
                      <h3>Trailer</h3>
                      <button className="trailer-close" onClick={() => setShowTrailer(false)}>
                        ×
                      </button>
                    </div>
                    <div className="trailer-embed">
                      <iframe
                        src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                        title={trailer.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}
                {displayMovie.overview && (
                  <div className="modal-description">
                    <h3>Overview</h3>
                    <p>{displayMovie.overview}</p>
                  </div>
                )}
                {displayMovie.production_companies &&
                  displayMovie.production_companies.length > 0 && (
                    <div className="modal-companies">
                      <h3>Production Companies</h3>
                      <div className="companies-list">
                        {displayMovie.production_companies
                          .slice(0, 5)
                          .map((company) => (
                            <span key={company.id} className="company-tag">
                              {company.name}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}
                {credits && (
                  <>
                    {credits.crew && (
                      <>
                        {credits.crew.filter(person => person.job === "Director").length > 0 && (
                          <div className="modal-director">
                            <h3>Director</h3>
                            <div className="crew-list">
                              {credits.crew
                                .filter(person => person.job === "Director")
                                .map((director) => (
                                  <span key={director.id} className="crew-item">
                                    {director.name}
                                  </span>
                                ))}
                            </div>
                          </div>
                        )}
                        {credits.crew.filter(person => 
                          person.job === "Screenplay" || 
                          person.job === "Writer" || 
                          person.job === "Story"
                        ).length > 0 && (
                          <div className="modal-writers">
                            <h3>Writers</h3>
                            <div className="crew-list">
                              {credits.crew
                                .filter(person => 
                                  person.job === "Screenplay" || 
                                  person.job === "Writer" || 
                                  person.job === "Story"
                                )
                                .slice(0, 5)
                                .map((writer) => (
                                  <span key={writer.id} className="crew-item">
                                    {writer.name}
                                  </span>
                                ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                    {credits.cast && credits.cast.length > 0 && (
                      <div className="modal-cast">
                        <h3>Cast</h3>
                        <div className="cast-list">
                          {credits.cast.slice(0, 12).map((actor) => (
                            <div key={actor.id} className="cast-item">
                              {actor.profile_path ? (
                                <img
                                  src={`https://image.tmdb.org/t/w185${actor.profile_path}`}
                                  alt={actor.name}
                                  className="cast-photo"
                                />
                              ) : (
                                <div className="cast-photo cast-photo-placeholder">
                                  {actor.name.charAt(0)}
                                </div>
                              )}
                              <div className="cast-info">
                                <p className="cast-name">{actor.name}</p>
                                <p className="cast-character">{actor.character}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MovieDetailModal;


import MovieCard from "../components/MovieCard";
import MovieDetailModal from "../components/MovieDetailModal";
import { useState, useEffect, useRef } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const debounceTimerRef = useRef(null);

  // Load popular movies on initial mount
  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getPopularMovies(1);
        if (response && Array.isArray(response.results)) {
          setMovies(response.results);
          setCurrentPage(response.page);
          setTotalPages(response.totalPages);
        } else {
          setError("Invalid response from API");
        }
      } catch (err) {
        console.error("Error loading movies:", err);
        setError(`Failed to load movies: ${err.message || "Unknown error"}`);
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  // Live search as user types (with debouncing)
  useEffect(() => {
    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Skip if search query is empty (initial load is handled by first useEffect)
    if (!searchQuery.trim()) {
      return;
    }

    // Debounce the search - wait 500ms after user stops typing
    debounceTimerRef.current = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await searchMovies(searchQuery.trim(), 1);
        if (response && Array.isArray(response.results)) {
          setMovies(response.results);
          setCurrentPage(response.page);
          setTotalPages(response.totalPages);
        }
      } catch (err) {
        console.error("Error searching movies:", err);
        setError(`Failed to search movies: ${err.message || "Unknown error"}`);
      } finally {
        setLoading(false);
      }
    }, 500);

    // Cleanup function to clear timer on unmount or when searchQuery changes
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchQuery]);

  const handleSearch = async (e) => {
    e.preventDefault();
    // The search is already handled by the useEffect as user types
    // This handler is kept for explicit search button clicks (though not strictly necessary)
    if (!searchQuery.trim()) {
      // If empty, reload popular movies
      setLoading(true);
      setError(null);
      try {
        const response = await getPopularMovies(1);
        if (response && Array.isArray(response.results)) {
          setMovies(response.results);
          setCurrentPage(response.page);
          setTotalPages(response.totalPages);
        }
      } catch (err) {
        console.error("Error loading movies:", err);
        setError(`Failed to load movies: ${err.message || "Unknown error"}`);
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle clearing search - reload popular movies when search is cleared
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // If user clears the search, immediately show popular movies
    if (!value.trim()) {
      // Clear any pending debounced search
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      
      setLoading(true);
      setError(null);
      getPopularMovies(1)
        .then((response) => {
          if (response && Array.isArray(response.results)) {
            setMovies(response.results);
            setCurrentPage(response.page);
            setTotalPages(response.totalPages);
          }
        })
        .catch((err) => {
          console.error("Error loading movies:", err);
          setError(`Failed to load movies: ${err.message || "Unknown error"}`);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleLoadMore = async () => {
    if (loadingMore || currentPage >= totalPages) return;

    setLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      let response;
      
      if (searchQuery.trim()) {
        response = await searchMovies(searchQuery.trim(), nextPage);
      } else {
        response = await getPopularMovies(nextPage);
      }

      if (response && Array.isArray(response.results)) {
        setMovies(prevMovies => [...prevMovies, ...response.results]);
        setCurrentPage(response.page);
        setTotalPages(response.totalPages);
      }
    } catch (err) {
      console.error("Error loading more movies:", err);
      setError(`Failed to load more movies: ${err.message || "Unknown error"}`);
    } finally {
      setLoadingMore(false);
    }
  };

  const showHero = !searchQuery.trim() && !loading && movies.length > 0;

  return (
    <div className="home">
      {showHero && (
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Welcome.</h1>
            <p className="hero-subtitle">
              Millions of movies, TV shows and people to discover. Explore now.
            </p>
            <form onSubmit={handleSearch} className="hero-search-form">
              <input
                type="text"
                placeholder="Search for a movie, tv show or person ....."
                className="hero-search-input"
                value={searchQuery}
                onChange={handleInputChange}
              />
              <button type="submit" className="hero-search-button">
                Search
              </button>
            </form>
          </div>
        </div>
      )}

      {!showHero && (
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for movies..."
            className="search-input"
            value={searchQuery}
            onChange={handleInputChange}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      )}

        {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : movies.length > 0 ? (
        <>
          <div className="movies-grid">
            {movies.map((movie) => (
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
          {currentPage < totalPages && (
            <div className="load-more-container">
              <button 
                className="load-more-button" 
                onClick={handleLoadMore}
                disabled={loadingMore}
              >
                {loadingMore ? "Loading..." : "See More"}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="loading">No movies found. Try searching for a movie!</div>
      )}
    </div>
  );
}

export default Home;

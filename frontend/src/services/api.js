const API_KEY = "b89245f556f6b4544158fba35955f3e7";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async (page = 1) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.results) {
      throw new Error("Invalid API response: missing results");
    }
    
    return {
      results: data.results,
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results
    };
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}&page=${page}`
    );
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.results) {
      throw new Error("Invalid API response: missing results");
    }
    
    return {
      results: data.results,
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results
    };
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const getMovieCredits = async (movieId) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    throw error;
  }
};

export const getMovieVideos = async (movieId) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie videos:", error);
    throw error;
  }
};

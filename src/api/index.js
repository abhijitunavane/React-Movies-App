import axios from "axios";
import { api_key } from './config';

const url = "https://api.themoviedb.org/3";

// Get response by searching the query
export const getSearchedResults = async (searchTerm, page=1) => {
    const data = await axios.get(`${url}/search/multi?api_key=${api_key}&query=${searchTerm}&page=${page}`);
    
    return data;
};
// Get All the genres
export const getGenre = async (category="movie") => {
    const data = await axios.get(`${url}/genre/${category}/list?api_key=${api_key}`);
    
    return data;
};
// Get All the languages with acronymns
export const getLanguages = async () => {
    const data = await axios.get(`${url}/configuration/languages?api_key=${api_key}`);
    
    return data;
};
// Get Movies by id
export const getMovieById = async (id) => {
    const data = await axios.get(`${url}/movie/${id}?api_key=${api_key}`);
    
    return data;
};
// Get Tv by id
export const getTvById = async (id) => {
    const data = await axios.get(`${url}/tv/${id}?api_key=${api_key}`);
    
    return data;
};
// Get Person by id
export const getPersonById = async (id) => {
    const data = await axios.get(`${url}/person/${id}?api_key=${api_key}`);
    
    return data;
};

// Get External Ids(social media) by id and category
export const getExternalIds = async (id, category) => {
    const data = await axios.get(`${url}/${category}/${id}/external_ids?api_key=${api_key}`);
    
    return data;
};

// Get Movie credits by person's id
export const getMovieCreditsOfPerson = async (id) => {
    const data = await axios.get(`${url}/person/${id}/movie_credits?api_key=${api_key}`);
    
    return data;
};

// Get Tv credits by person's id
export const getTvCreditsOfPerson = async (id) => {
    const data = await axios.get(`${url}/person/${id}/tv_credits?api_key=${api_key}`);
    
    return data;
};

// Get Movie / Tv credits
export const getCredits = async (id, category) => {
    const data = await axios.get(`${url}/${category}/${id}/credits?api_key=${api_key}`);
    
    return data;
};

// Get Popular movies
export const getPopularMovies = async () => {
    const data = await axios.get(`${url}/movie/popular?api_key=${api_key}`);
    
    return data;
};

// Get Popular Tv shows
export const getPopularTv = async () => {
    const data = await axios.get(`${url}/tv/popular?api_key=${api_key}`);
    
    return data;
};

// Get Movie Trailer
export const getMovieTrailer = async (id) => {
    const data = await axios.get(`${url}/movie/${id}/videos?api_key=${api_key}`);
    
    return data;
};

// Get Tv Trailer
export const getTvTrailer = async (id) => {
    const data = await axios.get(`${url}/tv/${id}/videos?api_key=${api_key}`);
    
    return data;
};


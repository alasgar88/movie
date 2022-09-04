import { MovieList } from "../components";

export const addList = (type, movie) => {
  localStorage.setItem(type, JSON.stringify(movie));
};

export const getList = (type) => {
  const result = localStorage.getItem(type);
  const movie = result ? JSON.parse(result) : [];
  return movie;
};

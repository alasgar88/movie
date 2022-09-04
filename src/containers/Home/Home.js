import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { MovieList } from "../../components";
import categorySlice, {
  getMovieList,
} from "../../store/features/category/categorySlice";

const Home = () => {
  const { movieList } = useSelector((store) => store.category);
  const dispatch = useDispatch();
  const { total_results } = movieList;
  console.log(movieList, "home");
  useEffect(() => {
    dispatch(getMovieList({ page: 1, category: "top_rated" }));
  }, [dispatch]);

  return (
    <>
      <MovieList title='MovieDB' {...movieList} total_results={total_results} />
    </>
  );
};

export default Home;

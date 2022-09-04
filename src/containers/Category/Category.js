import "./category.scss";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { MovieList } from "../../components";
import categorySlice, {
  getMovieList,
} from "../../store/features/category/categorySlice";
import { useParams } from "react-router-dom";

const Category = () => {
  const { movieList } = useSelector((store) => store.category);
  const dispatch = useDispatch();
  const { category } = useParams();
  const { total_results } = movieList;

  useEffect(() => {
    dispatch(getMovieList({ page: 1, category }));
  }, [dispatch, category]);
  return (
    <div>
      <>
        <MovieList
          title='MovieDB'
          {...movieList}
          total_results={total_results}
        />
      </>
    </div>
  );
};

export default Category;

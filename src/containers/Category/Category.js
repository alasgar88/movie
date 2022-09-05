import "./category.scss";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { MovieList, Loading } from "../../components";
import { getMovieList } from "../../store/features/category/categorySlice";
import axios from "axios";
import { useParams } from "react-router-dom";

const Category = () => {
  const { movieList } = useSelector((store) => store.category);
  const dispatch = useDispatch();
  const { category } = useParams();
  const { total_results } = movieList;
  const [data, setData] = useState([]);
  let page = 1;

  const categoryName = category.includes("_")
    ? category.split("_").join("  ").toLocaleUpperCase()
    : category.toUpperCase();

  const loadMoreData = async () => {
    const response = await axios(
      `https://api.themoviedb.org/3/movie/${category}?api_key=edeb82248f1fc52e3b9cca205e360bdc&language=en-US&page=${page}`
    );
    const newData = response.data;
    setData((oldData) => {
      const newResults = [...oldData.results, ...newData.results];
      return { ...oldData, results: newResults };
    });
    page += 1;
  };

  const handleScroll = (e) => {
    if (
      document.documentElement.scrollTop + window.innerHeight + 1 >
      document.documentElement.scrollHeight
    ) {
      loadMoreData();
      return;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });

  useEffect(() => {
    setData(movieList);
  }, [total_results, movieList]);

  useEffect(() => {
    dispatch(getMovieList({ page: 1, category }));
  }, [dispatch, category]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
      <>
        <MovieList
          search={true}
          title={categoryName}
          {...data}
          total_results={total_results}
          show={true}
        />
        <Loading />
      </>
    </div>
  );
};

export default Category;

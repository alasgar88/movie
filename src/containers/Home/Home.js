import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { MovieList, Loading } from "../../components";
import axios from "axios";
import { getMovieList } from "../../store/features/category/categorySlice";

const Home = () => {
  const dispatch = useDispatch();
  const { movieList } = useSelector((store) => store.category);
  const { total_results } = movieList;
  const [data, setData] = useState([]);
  let page = 1;

  const loadMoreData = async () => {
    const response = await axios(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=edeb82248f1fc52e3b9cca205e360bdc&language=en-US&page=${page}`
    );
    const newData = response.data;

    setData((oldData) => {
      const newResults = [...oldData.results, ...newData.results];
      return { ...oldData, results: newResults };
    });
    page += 1;
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

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
    setData(movieList);
  }, [total_results, movieList]);

  useEffect(() => {
    dispatch(getMovieList({ page: 1, category: "top_rated" }));
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <MovieList
        search={true}
        title='MovieDB'
        {...data}
        total_results={total_results}
        titleInfo='List of movies and TV Shows, I, Pramod Poudel have watched till date. Explore what I have watched and also feel free to make a suggestion. 😉'
        show={true}
      />
      <Loading />
    </>
  );
};

export default Home;

// const goToTop = () => {
//   window.scrollTo({
//     top: 0,
//     behavior: "smooth",
//   });
// };

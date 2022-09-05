import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
// import { paginate } from "../../utils/utils";
import {
  addList,
  getList,
  getTotal,
  addMovie,
  getMovie,
} from "../../../utils/localStorage";
import { addListLoading } from "../../../utils/localStorage";

const api = "edeb82248f1fc52e3b9cca205e360bdc";

const initialState = {
  isLoading: false,
  movieList: [],
  detail: {},
  similarMovie: [],
  similarMovieList: [],
  watchList: getMovie("watch_listMovie"),
  suggestList: getMovie("suggest_meMovie"),
  total: getTotal(),
};

//  GET MOVIE LIST / DEFULT FIRST PAGE / TOP RATED CATEGORY
export const getMovieList = createAsyncThunk(
  "category/getMovieList",
  async ({ page, category }, thunkAPI) => {
    try {
      const resp = await axios(
        `https://api.themoviedb.org/3/movie/${category}?api_key=${api}&language=en-US&page=${page}`
      );
      return resp.data;
    } catch (error) {}
  }
);

//  Get DETAIL OF MOVIE
export const getMovieDetail = createAsyncThunk(
  "category/getMovieDetail",
  async (id) => {
    try {
      const resp = await axios(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${api}&language=en-US`
      );
      return resp.data;
    } catch (error) {}
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addRemoveSuggest: (state, { payload }) => {
      // every time we click on button we remove or add "id" from/to suggest list
      let suggestList = getList("suggest");
      let suggestMovie = getMovie("suggest_meMovie");

      // operate for detail
      if (suggestList.includes(payload.id)) {
        toast.dark("Movie Unliked");
        const newDetail = { ...payload.movie, suggest: false };

        state.detail = newDetail;
      } else {
        toast.dark("Movie Liked");
        const newDetail = { ...payload.movie, suggest: true };
        state.detail = newDetail;
      }

      if (suggestList.includes(payload.id)) {
        const newSuggestList = suggestList.filter(
          (item) => item !== payload.id
        );

        // remove moviee from suggest movieList
        const newSuggestMovie = suggestMovie.filter(
          (movie) => movie.id !== payload.movie.id
        );
        // remove suggest true from wtachList
        const watchList = getMovie("watch_listMovie");
        const newWatchList = watchList.map((movie) => {
          console.log(payload.id, "payloadid");
          if (movie.id === payload.id) {
            return { ...movie, suggest: false };
          }
          return movie;
        });
        addMovie("watch_listMovie", newWatchList);
        state.watchList = newWatchList;
        //
        addList("suggest", newSuggestList);
        addMovie("suggest_meMovie", newSuggestMovie);
        state.suggestList = newSuggestMovie;
      } else {
        // if this id does not exist add suggest true
        const newSuggestList = [...suggestList, payload.id];
        const newSuggestMovie = [
          ...suggestMovie,
          { ...payload.movie, suggest: true },
        ];
        // const watchList = getMovie("watch_listMovie");
        // const neWacthList = [...watchList, { ...payload.movie, suggest: true }];
        addList("suggest", newSuggestList);
        addMovie("suggest_meMovie", newSuggestMovie);
        state.suggestList = newSuggestMovie;

        //
        // check if movieWatch list has this current id, if yes add suggest true to it
        let watchMovie = getMovie("watch_listMovie");
        const newWatchMovie = watchMovie.map((movie) => {
          if (movie.id === payload.id) {
            return { ...movie, suggest: true };
          }
          return movie;
        });
        addList("watch_listMovie", newWatchMovie);
        state.watchList = newWatchMovie;
      }

      // update totals
      state.total = getTotal();

      //  then reset our data with new suggest list
      const newSuggestList = getList("suggest");
      const newResults = state.movieList.results?.map((movie) => {
        if (newSuggestList.includes(movie.id)) {
          return { ...movie, suggest: true };
        }
        return { ...movie, suggest: false };
      });
      state.movieList = { ...payload, results: newResults };
    },
    addRemoveWatchList: (state, { payload }) => {
      // every time we click on button we remove or add "id" from/to watch list
      let watchList = getList("watchList");
      let watchListMovie = getMovie("watch_listMovie");

      // operate for detail
      if (watchList.includes(payload.id)) {
        toast.dark("Movie removed from WatchList");
        const newDetail = { ...payload.movie, watchList: false };
        state.detail = newDetail;
      } else {
        const newDetail = { ...payload.movie, watchList: true };
        state.detail = newDetail;
        toast.dark("Movie added to WatchList");
      }
      if (watchList.includes(payload.id)) {
        const newWatchList = watchList.filter((item) => item !== payload.id);
        // remove moviee from watchList movieList
        const newWatchListMovie = watchListMovie.filter(
          (movie) => movie.id !== payload.movie.id
        );
        // remove watch true from suggestList
        const suggestList = getMovie("suggest_meMovie");
        const newSugestList = suggestList.map((movie) => {
          if (movie.id === payload.id) {
            return { ...movie, watchList: false };
          }
          return movie;
        });
        addMovie("suggest_meMovie", newSugestList);
        state.watchList = newWatchListMovie;
        //
        addList("watchList", newWatchList);
        addMovie("watch_listMovie", newWatchListMovie);
        state.suggestList = newSugestList;
      } else {
        // if wathMovie list does not have this id, add movie to id
        const newWatchList = [...watchList, payload.id];
        const newWatchListMovie = [
          ...watchListMovie,
          { ...payload.movie, watchList: true },
        ];
        addList("watchList", newWatchList);
        addMovie("watch_listMovie", newWatchListMovie);
        state.watchList = newWatchListMovie;
        // check if suggest list has current id ,addWatchLit true to it
        let suggestMovie = getMovie("suggest_meMovie");
        const newSuggestMovie = suggestMovie.map((movie) => {
          if (movie.id === payload.id) {
            return { ...movie, watchList: true };
          }
          return movie;
        });
        addList("suggest_meMovie", newSuggestMovie);
        state.suggestList = newSuggestMovie;
      }
      //
      // update totals
      state.total = getTotal();

      //  then reset our data with new suggest list
      const newWatchList = getList("watchList");
      const newResults = state.movieList.results?.map((movie) => {
        if (newWatchList.includes(movie.id)) {
          return { ...movie, watchList: true };
        }
        return { ...movie, watchList: false };
      });
      state.movieList = { ...payload, results: newResults };
    },
  },
  extraReducers: {
    [getMovieList.pending]: (state) => {
      state.isLoading = true;
    },
    [getMovieList.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      const newResults = addListLoading(payload);
      state.movieList = { ...payload, results: newResults };
    },
    [getMovieList.rejected]: (state, { payload }) => {
      state.isLoading = false;
    },
    [getMovieDetail.pending]: (state) => {
      state.isLoading = true;
    },
    [getMovieDetail.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      let suggestMovie = getMovie("suggest_meMovie");
      let watchListMovie = getMovie("watch_listMovie");
      let movieDetail = { ...payload, suggest: false, watchList: false };
      suggestMovie.forEach((element) => {
        if (element.id === payload.id) {
          movieDetail = { ...movieDetail, suggest: element.suggest };
        }
      });
      watchListMovie.forEach((element) => {
        if (element.id === payload.id) {
          movieDetail = { ...movieDetail, watchList: element.watchList };
        }
      });
      state.detail = movieDetail;
    },
    [getMovieDetail.rejected]: (state, { payload }) => {
      state.isLoading = false;
    },
  },
});

export const {
  addSuggest,
  addRemoveSuggest,
  addRemoveWatchList,
  addRemoveList,
  addSimilarMovie,
} = categorySlice.actions;
export default categorySlice.reducer;

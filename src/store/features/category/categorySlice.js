import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { paginate } from "../../utils/utils";
// import { addList, getList } from "../../utils/localStorage";
import { addList, getList } from "../../../utils/localStorage";

const api = "edeb82248f1fc52e3b9cca205e360bdc";

const initialState = {
  isLoading: false,
  movieList: [],
  detail: {},
  //   watchList: getList("watchList"),
  //   paginatedData: [],
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
      if (suggestList.includes(payload)) {
        const newSuggestList = suggestList.filter((item) => item !== payload);
        addList("suggest", newSuggestList);
      } else {
        const newSuggestList = [...suggestList, payload];
        addList("suggest", newSuggestList);
      }
      //  then reset our data with new suggest list
      const newSuggestList = getList("suggest");
      const newResults = state.movieList.results.map((movie) => {
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
      if (watchList.includes(payload)) {
        const newWatchList = watchList.filter((item) => item !== payload);
        addList("watchList", newWatchList);
      } else {
        const newWatchList = [...watchList, payload];
        addList("watchList", newWatchList);
      }
      //  then reset our data with new suggest list
      const newWatchList = getList("watchList");
      console.log(newWatchList, "newWatchList");
      const newResults = state.movieList.results.map((movie) => {
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
      // when loading data from server we get suggest list and watch list. And create new data from loading data based on suggest list and watch list
      const suggestList = getList("suggest");
      const watchList = getList("watchList");
      const newResults = payload.results.map((movie) => {
        if (suggestList.includes(movie.id)) {
          return { ...movie, suggest: true };
        }
        if (watchList.includes(movie.id)) {
          return { ...movie, watchList: true };
        }

        return { ...movie, suggest: false, watchList: false };
      });
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
      state.detail = payload;
    },
    [getMovieDetail.rejected]: (state, { payload }) => {
      state.isLoading = false;
    },
  },
});

export const { addSuggest, addRemoveSuggest, addRemoveWatchList } =
  categorySlice.actions;
export default categorySlice.reducer;

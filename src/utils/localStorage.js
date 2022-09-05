export const addList = (type, movie) => {
  localStorage.setItem(type, JSON.stringify(movie));
};

export const getList = (type) => {
  const result = localStorage.getItem(type);
  const movie = result ? JSON.parse(result) : [];
  return movie;
};

export const addMovie = (type, movie) => {
  localStorage.setItem(type, JSON.stringify(movie));
};

export const getMovie = (type) => {
  const result = localStorage.getItem(type);
  const movie = result ? JSON.parse(result) : [];
  return movie;
};

export const getTotal = () => {
  const suggest = getList("suggest").length;
  const watchList = getList("watchList").length;
  return { suggest, watchList };
};

export const addListLoading = (payload) => {
  const suggestList = getList("suggest");
  const watchList = getList("watchList");
  const newResults = payload.results.map((movie) => {
    if (suggestList.includes(movie.id) && watchList.includes(movie.id)) {
      return { ...movie, suggest: true, watchList: true };
    }
    if (suggestList.includes(movie.id)) {
      return { ...movie, suggest: true };
    }
    if (watchList.includes(movie.id)) {
      return { ...movie, watchList: true };
    }

    return { ...movie, suggest: false, watchList: false };
  });
  return newResults;
};

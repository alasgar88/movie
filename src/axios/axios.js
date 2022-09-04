import axios from "axios";
const api = "edeb82248f1fc52e3b9cca205e360bdc";

const fetchCategoryData = async (id = 1, category = "top_rated") => {
  try {
    const result = await axios(
      `https://api.themoviedb.org/3/movie/${category}?api_key=${api}&language=en-US&page=${id}`
    );
    const data = result.data;
    console.log(data, "data");
  } catch (error) {
    console.log(error.response);
  }
};

// fetchCategoryData();

import "./movie-card.scss";
import React, { useState } from "react";
import {
  addRemoveSuggest,
  addRemoveWatchList,
} from "../../store/features/category/categorySlice";
import {
  LikeFilled,
  StarOutlined,
  VideoCameraFilled,
  VideoCameraAddOutlined,
  LikeOutlined,
} from "../../assets/icons/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const MovieCard = ({
  title,
  poster_path,
  vote_average,
  id,
  suggest,
  watchList,
}) => {
  const [icon, setIcon] = useState(false);
  const image = `https://image.tmdb.org/t/p/w500/${poster_path}`;
  const navigate = useNavigate();
  const { category } = useParams();
  const dispatch = useDispatch();

  const handleClick = (e, id) => {
    // console.log(e.currentTarget.className);

    if (e.target.className === "movie-image") {
      const navigateUrl = category ? `/${category}/${id}` : `/top_rated/${id}`;
      navigate(navigateUrl);
    }
  };
  return (
    <div className='menu-item' onClick={(e) => handleClick(e, id)}>
      <img src={poster_path && image} alt='' className='movie-image' />
      <p className='movie-name-title'>{title}</p>
      <div className='icon-container'>
        <div className='rating'>
          {<StarOutlined className='star' />}{" "}
          <span className='star-rating'>{vote_average}</span>
        </div>
        <div className='suggest-icon'>
          {suggest ? (
            <LikeFilled
              className='suggest'
              onClick={(e) => dispatch(addRemoveSuggest(id))}
            />
          ) : (
            <LikeOutlined
              className='suggest'
              onClick={() => dispatch(addRemoveSuggest(id))}
            />
          )}
        </div>
      </div>
      <div
        className='watch-icon-container'
        onClick={() => {
          dispatch(addRemoveWatchList(id));
        }}
      >
        <div className='watch-icon'>
          {watchList ? (
            <VideoCameraFilled
              className={`${watchList ? "watch active" : "watch"}`}
            />
          ) : (
            <VideoCameraAddOutlined
              className={`${watchList ? "watch active" : "watch"}`}
            />
          )}
        </div>
        <div
          className={`${
            watchList ? "watch-icon-title active" : "watch-icon-title"
          }`}
        >
          {watchList ? "Already watched" : "Add to watch list "}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

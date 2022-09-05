import React, { useEffect, useState } from "react";
import "./detail.scss";
import { MovieList } from "../../components";
import { Col, Row } from "antd";
import {
  getMovieDetail,
  addRemoveSuggest,
  addRemoveWatchList,
} from "../../store/features/category/categorySlice";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  LikeFilled,
  StarOutlined,
  VideoCameraFilled,
  VideoCameraAddOutlined,
  LikeOutlined,
} from "../../assets/icons/icons";

const Detail = () => {
  const { id } = useParams();
  const { detail } = useSelector((store) => store.category);
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const {
    title,
    vote_average,
    overview,
    release_date,
    runtime,
    genres,
    backdrop_path,
    poster_path,
  } = detail;

  const imagePoster = `https://image.tmdb.org/t/p/original/${poster_path}`;
  const imageBackdrop = `https://image.tmdb.org/t/p/original/${backdrop_path}`;

  // scroll data and load new one

  const loadMoreData = async () => {
    const response = await axios(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=edeb82248f1fc52e3b9cca205e360bdc&language=en-US&page=1`
    );
    setData(response.data.results);
    // console.log(newData);
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  useEffect(() => {
    dispatch(getMovieDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [id]);
  return (
    <>
      <div className='detail'>
        <div className='img-container'>
          <img
            src={backdrop_path && imageBackdrop}
            alt=''
            className='detail-header-img'
          />
        </div>
        <div className='detail-title-container'>
          <div className='info-breadcrumbs'>
            <span className='info-title'>
              MaileHereko <span className='info-title blank'>/</span>
              Movies
            </span>
            <h3 className='movie-name'>{title}</h3>
          </div>
        </div>
        <div className='detail-movie-container'>
          <Row gutter={{ md: 40, lg: 60 }}>
            <Col span={10}>
              <div className='detail-image-container'>
                <img
                  src={poster_path && imagePoster}
                  alt=''
                  className='detail-image'
                />
              </div>
            </Col>
            <Col span={14} className='detail-info-row'>
              <div className='detail-movie-info-container'>
                <h2 className='info-title'>{title}</h2>
                <div className='info-text'>{overview}</div>
                <div className='icon-container-detail'>
                  <div className='rating'>
                    {<StarOutlined className='star' />}{" "}
                    <span className='star-rating'>{vote_average}</span>
                  </div>
                  <div className='rating'>
                    <div className='suggest-icon suggest-icon-background'>
                      {detail.suggest ? (
                        <LikeFilled
                          className='suggest'
                          onClick={(e) =>
                            dispatch(
                              addRemoveSuggest({
                                id: detail.id,
                                movie: detail,
                                type: "suggest",
                              })
                            )
                          }
                        />
                      ) : (
                        <LikeOutlined
                          className='suggest'
                          // onClick={() => dispatch(addRemoveSuggest(id))}
                          onClick={() =>
                            dispatch(
                              addRemoveSuggest({
                                id: detail.id,
                                movie: detail,
                                type: "suggest",
                              })
                            )
                          }
                        />
                      )}
                    </div>
                  </div>
                  <div className='rating'>
                    <div className='watch-icon suggest-icon-background'>
                      {detail.watchList ? (
                        <VideoCameraFilled
                          onClick={() => {
                            dispatch(
                              addRemoveWatchList({
                                id,
                                movie: detail,
                                type: "watch",
                              })
                            );
                          }}
                          className={`${
                            detail.watchList ? "watch active" : "watch"
                          }`}
                        />
                      ) : (
                        <VideoCameraAddOutlined
                          onClick={() => {
                            // dispatch(addRemoveWatchList(id));
                            dispatch(
                              addRemoveWatchList({
                                id,
                                movie: detail,
                                type: "watch",
                              })
                            );
                          }}
                          className={`${
                            detail.watchList ? "watch active" : "watch"
                          }`}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className='type'>
                  <span className='title-span'>Type</span>
                  <span className='info-span'>Movie</span>
                </div>
                <div className='type'>
                  <span className='title-span'>Release Date:</span>
                  <span className='info-span'>{release_date}</span>
                </div>
                <div className='type'>
                  <span className='title-span'>Run time</span>
                  <span className='info-span'>{runtime} min</span>
                </div>
                <div className='type'>
                  <span className='title-span'>Genres</span>
                  <span className='info-span'>
                    {genres?.map((genre, index) => {
                      const space = index === 0 ? "" : " ";
                      const symbol = index === genres.length - 1 ? "" : ",";
                      return `${space}${genre.name} ${symbol}`;
                    })}
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className='recomended-div'>
          <p className='recomended-title'>Similar movies</p>
        </div>
        <div className='recomended-container'>
          <MovieList search={false} results={data?.slice(0, 8)} />
        </div>
      </div>
    </>
  );
};

export default Detail;

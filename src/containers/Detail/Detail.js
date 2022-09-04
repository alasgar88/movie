import React, { useEffect } from "react";
import "./detail.scss";
import { StarOutlined } from "../../assets/icons/icons";
import image from "../../assets/images/header.jpeg";
import { MovieCard } from "../../components";
import { Col, Row } from "antd";
import { getMovieDetail } from "../../store/features/category/categorySlice";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Detail = () => {
  const data = ["1", "2", "3"];
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detail } = useSelector((store) => store.category);
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

  useEffect(() => {
    dispatch(getMovieDetail(id));
  }, [dispatch]);
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
                <div className='rating'>
                  {<StarOutlined className='star' />}{" "}
                  <span className='star-rating'>{vote_average}</span>
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
          <Row gutter={[24, 20]}>
            {data.map((data, index) => {
              return (
                <Col
                  key={index}
                  xs={{ span: 24 }}
                  sm={{ span: 12 }}
                  md={{ span: 8 }}
                  lg={{ span: 8 }}
                >
                  <MovieCard />
                </Col>
              );
            })}
            <Col span={8} />
          </Row>
        </div>
      </div>
    </>
  );
};

export default Detail;

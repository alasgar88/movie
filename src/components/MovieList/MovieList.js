import React, { useState } from "react";
import { Input } from "antd";
import { Col, Row } from "antd";
import "./movie-list.scss";
import { MovieCard } from "../";
import { Loading } from "../../components";
import { useSelector } from "react-redux";

const MovieList = ({ title, results, total_results }) => {
  const { Search } = Input;
  const onSearch = (value) => console.log(value);
  const { isLoading } = useSelector((store) => store.category);

  const testMovie = ["1", "2", "3", "4", "5", "6", "7", "8"];
  return (
    <div className='movie-list'>
      <p className='title'>{title}</p>
      <p className='title-info'>
        List of movies and TV Shows, I, <span>Pramod Poudel </span>have watched
        till date. Explore what I have watched and also feel free to make a
        suggestion. 😉
      </p>
      <Search
        // loading={true}
        className='search-movie'
        placeholder='input search text'
        onSearch={onSearch}
        style={{
          width: 344,
        }}
      />
      <div className='movie-number'>
        <span>
          All<span className='number'>{total_results}</span>
        </span>
      </div>

      <Row gutter={[30, 30]} className='movie-item'>
        {results?.map((data, index) => {
          return (
            <Col
              key={index}
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              md={{ span: 8 }}
              lg={{ span: 6 }}
            >
              <MovieCard {...data} />
            </Col>
          );
        })}
        <Col span={8} />
      </Row>
    </div>
  );
};

export default MovieList;

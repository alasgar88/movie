import React from "react";
// import { Input } from "antd";
import { Col, Row } from "antd";
import "./movie-list.scss";
import { MovieCard } from "../";

const MovieList = ({
  title,
  titleInfo,
  results,
  total_results,
  search,
  show,
}) => {
  // const { Search } = Input;
  // const onSearch = (value) => console.log(value);
  return (
    <div className='movie-list'>
      <p className={`${search ? "title" : "title active"}`}>{title}</p>
      <p className='title-info'>{titleInfo}</p>
      {search && (
        <>
          {/* <Search
            loading={true}
            className='search-movie'
            placeholder='input search text'
            onSearch={onSearch}
            style={{
              width: 344,
            }}
          /> */}
          <div className='movie-number'>
            <span>
              All<span className='number'>{total_results}</span>
            </span>
          </div>
        </>
      )}

      <Row
        gutter={[30, 30]}
        className={`${search ? "movie-item" : "movie-item active"}`}
      >
        {results?.map((data, index) => {
          return (
            <Col
              key={index}
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              md={{ span: 8 }}
              lg={{ span: 6 }}
            >
              <MovieCard {...data} movie={data} show={show} />
            </Col>
          );
        })}
        <Col span={8} />
      </Row>
    </div>
  );
};

export default MovieList;

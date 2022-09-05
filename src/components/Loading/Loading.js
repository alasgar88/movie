import "./loading.scss";
import { Col, Row } from "antd";
import React from "react";

const loadingCount = ["1", "2", "3", "4", "5", "6", "7", "8"];

const Loading = () => {
  return (
    <div>
      <Row gutter={[30, 30]} className='movie-item'>
        {loadingCount.map((data, index) => {
          return (
            <Col
              key={index}
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              md={{ span: 8 }}
              lg={{ span: 6 }}
            >
              <div className='menu-loading-item'>
                <div className='inner-container'>
                  <div className='icon-no-container'></div>
                </div>
                <div className='bottom-inner-container'>
                  <div className='blank-title'></div>
                  <div className='blank-title-last'>
                    <div className='circle'></div>
                    <div className='circle-title'></div>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
        <Col span={8} />
      </Row>
    </div>
  );
};

export default Loading;

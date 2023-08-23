import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../styles/css/pages/MainPage.css";
import office from "../images/pages/main/office.png";

class MainPage extends Component {
  render() {
    return (
      <>
        <section className="section sectionMain">
          <div id="container">
            <div id="one">
              <p>이재훈 님,</p>
              <p>오늘도 기분 좋은 하루 보내세요!</p>
              <p>마이페이지 </p>
            </div>
            <div id="two">
              <img src={office} alt="" />
            </div>
          </div>
          <div id="three">
            <div className="card">
              <div className="image_container">
                <img src="" alt="" />
              </div>
              <h2 className="text1">사원등록</h2>
              <p className="text2">직원의 기초자료를 입력합니다.</p>
              <Link to="/er">
                <button className="mainPageBtn">바로가기</button>
              </Link>
            </div>
            <div className="card">
              <div className="image_container">
                <img src="" alt="" />
              </div>
              <h2 className="text1">인사등록</h2>
              <p className="text2">직원의 세부자료를 입력합니다.</p>
              <Link to="/hrm">
                <button className="mainPageBtn">바로가기</button>
              </Link>
            </div>
            <div className="card">
              <div className="image_container">
                <img src="" alt="" />
              </div>
              <h2 className="text1">급여등록</h2>
              <p className="text2">직원의 급여자료를 입력합니다.</p>
              <Link to="/sd">
                <button className="mainPageBtn">바로가기</button>
              </Link>
            </div>
            <div className="card">
              <div className="image_container">
                <img src="" alt="" />
              </div>
              <h2 className="text1">근로계약서</h2>
              <p className="text2">직원의 근로계약서를 작성합니다.</p>
              <Link to="/wc">
                <button className="mainPageBtn">바로가기</button>
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default MainPage;
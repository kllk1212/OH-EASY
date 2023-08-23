import React, { Component } from "react";
import Setting from "../images/pages/common/setting.png";
import Calc from "../images/pages/common/calc.png";
import Print from "../images/pages/common/print.png";
import Delete from "../images/pages/common/delete.png";

import "../styles/css/pages/EmployeeRegister.css";

class HRManagement extends Component {
  render() {
    return (
      <>
        <div className="pageHeader">
          <div className="innerBox fxSpace">
            <h2 className="pageHeaderName">인사관리등록</h2>
            <div className="fxAlignCenter">
              <div className="btnWrapper textBtnWrap">
                <button>사원불러오기</button>
                <button>재계산</button>
                <button>완료</button>
                <button>급여메일 보내기</button>
                <button>급여명세 문자보내기</button>
              </div>
              <div className="iconBtnWrap">
                <button className="print">
                  <img src={Print} alt="프린트" />
                </button>
                <button className="delete">
                  <img src={Delete} alt="삭제" />
                </button>
                <button className="calc">
                  <img src={Calc} alt="계산기" />
                </button>
                <button className="setting">
                  <img src={Setting} alt="설정" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="searchBar">
          <div className="innerBox fxSpace">
            <div className="selectWrapper">
              <div className="searchBarBox">
                <span className="searchBarName">조회구분</span>
                <select
                  id="category"
                  name="category"
                  className="selectBox"
                  defaultValue="0"
                >
                  <option value="0">0. 재직자+당해년도 퇴사자</option>
                  <option value="1">1. 재직자+당해년도 퇴사자</option>
                </select>
              </div>
              <div className="searchBarBox">
                <span className="searchBarName">정렬</span>
                <select
                  id="order"
                  name="order"
                  className="selectBox"
                  defaultValue="0"
                >
                  <option value="0">0. 코드순</option>
                  <option value="1">1. 이름순</option>
                </select>
              </div>
            </div>
            <div className="btnWrapper">
              <button className="gray">조회</button>
              <button className="btnMore">
                <span className="hidden">펼쳐보기? 더보기?</span>
              </button>
              <button>PDF로 내보내기</button>
              <button>전자서명</button>
            </div>
          </div>
        </div>
        <section className="section one">인사등록 페이지</section>
      </>
    );
  }
}

export default HRManagement;
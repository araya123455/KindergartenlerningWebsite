import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFromLocalStorage } from "../LocalStorage/localstorage";
import {
  selectedtest,
  showquestion,
  testedresult,
  testresultdetail,
  finishedtest,
} from "../slice/SearchDataSlice";
import { pyearterm, pkinder } from "../slice/SearchDataSlice";
import "../assets/css/starttest.css";
import { Outlet, Link } from "react-router-dom";

function ShowTestResult() {
  const dispatch = useDispatch();
  const [finished, setfinished] = useState([]);
  const [showdata, setshowdata] = useState([]);
  const [showtest, setshowtest] = useState([]);
  const [showques, setshowques] = useState([]);
  const [showresult, setshowresult] = useState([]);
  const [showredetail, setshowredetail] = useState([]);
  const [yearterm, setyearterm] = useState([]);
  const [kinder, setkinder] = useState([]);
  const auth = getFromLocalStorage("stu_auth");
  const stuid = auth.stu_id;
  const testId = getFromLocalStorage("testId");
  let score = 0,
    totalscore = 0,
    isCorrect = "";

  const loadFinished = () => {
    dispatch(finishedtest({ stuid }))
      .then((result) => {
        setfinished(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadShowtest = () => {
    dispatch(selectedtest({ testId }))
      .then((result) => {
        setshowtest(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadShowquestion = () => {
    dispatch(showquestion({ testId }))
      .then((result) => {
        setshowques(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Time duration
  const loadTestresult = () => {
    dispatch(testedresult({ testId, stuid }))
      .then((result) => {
        setshowresult(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Tested detail
  const loadTestdetail = () => {
    dispatch(testresultdetail({ testId, stuid }))
      .then((result) => {
        setshowredetail(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadyearterm = () => {
    if (stuid != null) {
      dispatch(pyearterm({ stuid }))
        .then((result) => {
          setyearterm(result.payload);
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const loadkinder = () => {
    if (stuid != null) {
      dispatch(pkinder({ stuid }))
        .then((result) => {
          setkinder(result.payload);
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    setshowdata(auth);
    loadShowtest();
    loadShowquestion();
    loadTestresult();
    loadTestdetail();
    loadFinished();
    loadyearterm();
    loadkinder();
  }, []);

  return (
    <>
      <div>
        <div id="clouds">
          <div className="cloud x1"></div>
          <div className="cloud x2"></div>
          <div className="cloud x3"></div>
          <div className="cloud x4"></div>
          <div className="cloud x5"></div>
          <div className="cloud x6"></div>
          <div className="cloud x7"></div>
        </div>
        <button className="btn-back" role="button">
          <Link to={"/student/test"} className="back-font">
            <svg
              viewBox="0 0 96 96"
              height="24px"
              id="Layer_1"
              version="1.2"
              width="24px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M39.3756,48.0022l30.47-25.39a6.0035,6.0035,0,0,0-7.6878-9.223L26.1563,43.3906a6.0092,6.0092,0,0,0,0,9.2231L62.1578,82.615a6.0035,6.0035,0,0,0,7.6878-9.2231Z"
                fill="#ffffff"
              />
            </svg>
            ย้อนกลับ
          </Link>
        </button>
        <div className="body">
          <div className="test-container">
            {/* <div>
              <img
                src="../CLIPLY_372109170_FREE_FIREWORKS_400.gif"
                alt="GIF"
                className="gif-align-right"
              />
            </div> */}
            <div>
              <h2 className="font-mail hh-f">ผลการการทดสอบ</h2>
              <p className="header-f">
                ชื่อ-นามสกุล {showdata?.prefix} {showdata?.stu_Fname}{" "}
                {showdata?.stu_Lname} เลขประจำตัว: {showdata?.stu_user}
              </p>
              <p className="header-f">
                ระดับชั้น: {kinder[0]?.kinde_level}/{kinder[0]?.Kinder_room}{" "}
                ปีการศึกษา: {yearterm[0]?.year}/{yearterm[0]?.term}
              </p>
              {showtest.map((data) => {
                const { test_id, test_detail } = data;
                return (
                  <p key={test_id} className="header-f">
                    {test_detail}
                  </p>
                );
              })}
            </div>

            <div className="summary-f">
              {showresult.map((data) => {
                const { testR_id, time_duration } = data;
                return (
                  <p key={testR_id} className="sum-f">
                    ส่งแบบทดสอบเวลา: {time_duration}
                  </p>
                );
              })}
            </div>
            <div className="sum-f">
              {showredetail.map((data) => {
                const { score, testDe_id } = data;
                totalscore += score;
              })}
              <p>คะแนนที่ได้: {totalscore} คะแนน</p>
              {showques.map((data) => {
                const { ques_id, score_ques } = data;
                score += score_ques;
              })}
              <p>คะแนนเต็ม: {score} คะแนน</p>
            </div>
            <div className="question">
              {showques.map((question, index) => {
                const { ques_id, ques, answer, score_ques } = question;
                const matchingQuestion = showredetail.find(
                  (q) => q.ques_id === ques_id
                );

                if (!matchingQuestion) {
                  // Handle the case where the question is not found
                  console.error(`Question with ques_id ${ques_id} not found.`);
                  return null;
                }

                const { ans_result } = matchingQuestion;
                const isCorrect = ans_result === answer;

                return (
                  <div key={index}>
                    <p>
                      คำถาม {index + 1} {ques}
                    </p>
                    <div
                      className={`answer-summary ${
                        isCorrect ? "correct" : "incorrect"
                      }`}
                    >
                      <p>คำตอบของคุณ: {ans_result}</p>
                      {!isCorrect && <p>คำตอบที่ถูกต้อง: {answer}</p>}
                      <p className="score">
                        คะแนน: {isCorrect ? score_ques : 0}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowTestResult;

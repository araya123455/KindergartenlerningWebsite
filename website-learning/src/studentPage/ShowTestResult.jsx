import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFromLocalStorage } from "../LocalStorage/localstorage";
import {
  selectedtest,
  showquestion,
  testedresult,
  testresultdetail,
  finishedtest,
} from "../slice/StudentSlice";
import "../assets/css/starttest.css";
import { Outlet, Link } from "react-router-dom";

function ShowTestResult() {
  const dispatch = useDispatch();
  const [finished, setfinished] = useState([]);
  const [showtest, setshowtest] = useState([]);
  const [showques, setshowques] = useState([]);
  const [showresult, setshowresult] = useState([]);
  const [showredetail, setshowredetail] = useState([]);
  const auth = getFromLocalStorage("auth");
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

  useEffect(() => {
    loadShowtest();
    loadShowquestion();
    loadTestresult();
    loadTestdetail();
    loadFinished();
  }, []);

  return (
    <>
      <div>
        <h2>ผลการการทดสอบ</h2>
        {showtest.map((data) => {
          const { test_id, test_detail } = data;
          return <h3 key={test_id}>{test_detail}</h3>;
        })}
      </div>
      <div>
        {showresult.map((data) => {
          const { testR_id, time_duration } = data;
          return <h4 key={testR_id}>ส่งแบบทดสอบเวลา: {time_duration}</h4>;
        })}
      </div>
      <div>
        {showredetail.map((data) => {
          const { score, testDe_id } = data;
          totalscore += score;
        })}
        <h5>คะแนนที่ได้: {totalscore} คะแนน</h5>
        {showques.map((data) => {
          const { ques_id, score_ques } = data;
          score += score_ques;
        })}
        <h5>คะแนนเต็ม: {score} คะแนน</h5>
        <div className="body">
          <div className="test-container">
            <div className="question">
              {showredetail.map((question, index) => (
                <div key={index}>
                  <p>
                    คำถาม {index + 1} {showques[index]?.ques || ''}
                  </p>
                  {
                    (isCorrect =
                      showques[index].answer === showredetail[index].ans_result)
                  }
                  <div
                    className={`answer-summary ${
                      isCorrect ? "correct" : "incorrect"
                    }`}
                  >
                    <p>คำตอบของคุณ: {showredetail[index]?.ans_result || ''}</p>
                    {!isCorrect && (
                      <p>คำตอบที่ถูกต้อง: {showques[index]?.answer || ''}</p>
                    )}
                    <p className="score">
                      คะแนน: {isCorrect ? showques[index]?.score_ques : 0}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowTestResult;

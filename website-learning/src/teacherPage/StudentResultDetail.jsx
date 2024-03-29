import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  selectedtest,
  showquestion,
  testedresult,
  testresultdetail,
  finishedtest,
} from "../slice/SearchDataSlice";
import "../assets/css/starttest.css";

function StudentResultDetail({ stuid, testId }) {
  const dispatch = useDispatch();
  const [finished, setfinished] = useState([]);
  const [showtest, setshowtest] = useState([]);
  const [showques, setshowques] = useState([]);
  const [showresult, setshowresult] = useState([]);
  const [showredetail, setshowredetail] = useState([]);

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
      <h2>ผลการการทดสอบ</h2>
      <div className="h2-testdiv">
        {showtest.map((data) => {
          const { test_id, test_detail } = data;
          return (
            <h3 className="h2-testd" key={test_id}>
              {test_detail}
            </h3>
          );
        })}
      </div>
      <div className="h4-sum">
        {showresult.map((data) => {
          const { testR_id, time_duration } = data;
          return (
            <h4 className="h4-sumsize" key={testR_id}>
              ส่งแบบทดสอบเวลา: {time_duration}
            </h4>
          );
        })}
      </div>
      <div>
        <div className="h4-sum">
          {showredetail.map((data) => {
            const { score, testDe_id } = data;
            totalscore += score;
          })}
          <h5 className="h4-sumsize">คะแนนที่ได้: {totalscore} คะแนน</h5>
          {showques.map((data) => {
            const { ques_id, score_ques } = data;
            score += score_ques;
          })}
          <h5 className="h4-sumsize">คะแนนเต็ม: {score} คะแนน</h5>
        </div>
        <div className="body">
          <div className="m-test-container">
            <div className="m-question p-ques">
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

export default StudentResultDetail;

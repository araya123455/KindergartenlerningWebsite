import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFromLocalStorage } from "../LocalStorage/localstorage";
import {
  showquestion,
  showtest,
  testedresult,
  selectedtest,
  testresultdetail,
} from "../slice/StudentSlice";
import { Outlet, Link } from "react-router-dom";

function ShowTestResult() {
  const dispatch = useDispatch();
  const [showques, setshowques] = useState([]);
  const [test, setTest] = useState([]);
  const [showteReDe, setshowteReDe] = useState([]);
  const [showteRe, setshowteRe] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const testId = getFromLocalStorage("testId");
  const [score, setScore] = useState(0);
  const auth = getFromLocalStorage("auth");
  const stuid = auth.stu_id;

  const loadTest = () => {
    dispatch(selectedtest({ testId }))
      .then((result) => {
        setTest(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadData = () => {
    dispatch(showquestion({ testId }))
      .then((result) => {
        setshowques(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadteRe = () => {
    dispatch(testedresult({ testId, stuid }))
      .then((result) => {
        setshowteRe(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadteReDe = () => {
    dispatch(testresultdetail({ testId, stuid }))
      .then((result) => {
        setshowteReDe(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const calculateScore = () => {
    let newScore = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === showques[index]?.answer) {
        newScore += showques[index]?.score_ques;
      }
    });
    setScore(newScore);
  };

  const calculateTotalPossibleScore = () => {
    let totalScore = 0;
    showques.forEach((question) => {
      totalScore += question.score_ques;
    });
    return totalScore;
  };

  const renderAnswerSummary = (questionIndex) => {
    const selectedAnswer = showteReDe[questionIndex]?.ans_result;
    const correctAnswer = showques[questionIndex]?.answer;
    const isCorrect = selectedAnswer === correctAnswer;
    setSelectedAnswers(selectedAnswer);
    // console.log(showques[questionIndex]?.ques_id);
    // onInsertDe(questionIndex);
    return (
      <div className={`answer-summary ${isCorrect ? "correct" : "incorrect"}`}>
        <p>Your Answer: {selectedAnswer}</p>
        {!isCorrect && <p>Correct Answer: {correctAnswer}</p>}
        <p className="score">
          Score: {isCorrect ? showques[questionIndex]?.score_ques : 0}
        </p>
      </div>
    );
  };

  useEffect(() => {
    loadTest();
    // loadData();
    loadteReDe();
    loadteRe();
  }, []);

  return (
    <>
      <div>
        <h2>Test Results</h2>
        {test.map((data) => {
          const { test_detail, test_id } = data;
          return <h3 key={test_id}>{test_detail}</h3>;
        })}
        {showteRe.map((data) => {
          const { time_duration, test_id } = data;
          return <p key={test_id}>You completed the test on {data.time_duration}</p>;
        })}
        <p>
          Your score: {score} out of {calculateTotalPossibleScore()} points
        </p>
        {showques.map((question, index) => (
          <div key={index}>
            <h3>Question {index + 1}</h3>
            <p>{showques[index].ques}</p>
            {renderAnswerSummary(index)}
          </div>
        ))}
      </div>
    </>
  );
}

export default ShowTestResult;

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  showquestion,
  savetestresult,
  savetestresultdetail,
} from "../slice/StudentSlice";
import { getFromLocalStorage } from "../LocalStorage/localstorage";
import "../assets/css/starttest.css";

const StartTest = () => {
  const dispatch = useDispatch();
  const [showques, setshowques] = useState([]);
  const testId = getFromLocalStorage("testId");
  const auth = getFromLocalStorage("auth");
  const stuid = auth.stu_id;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [completionTime, setCompletionTime] = useState(null);
  const allQuestionsAnswered = selectedAnswers.every((answer) => answer !== "");
  const [formattime, setformattime] = useState("");

  const loadData = () => {
    dispatch(showquestion({ testId }))
      .then((result) => {
        setshowques(result.payload);
        // console.log("result.payload ", result.payload);
        setSelectedAnswers(Array(result.payload.length).fill(""));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAnswerSelect = (event) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = event.target.value;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handlePrevClick = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentQuestionIndex < showques.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (allQuestionsAnswered) {
      calculateScore();
      const currentTime = new Date(); // Capture the current time
      setCompletionTime(currentTime); // Set the completion time
      setShowResults(true);
      const formattedTime =
        currentTime &&
        `${currentTime.toLocaleDateString()} at ${currentTime.toLocaleTimeString()}`;
      setformattime(formattedTime);
      console.log(formattedTime);
      if (formattime != null) {
        onInsert(formattedTime);
      }
      showques.map((question, index)=>{
        onInsertDe(index);
      })
    } else {
      alert("กรุณาทำแบบทดสอบให้ครบทุกข้อ!!");
    }
  };

  const onInsert = (formattedTime) => {
    let body = {
      stu_id: stuid,
      time_duration: formattedTime,
      test_id: testId,
    };
    dispatch(savetestresult(body))
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onInsertDe = (questionIndex) => {
    const selectedAnswer = selectedAnswers[questionIndex];
    let body = {
      ans_result: selectedAnswer,
      score:
        selectedAnswers[questionIndex] === showques[questionIndex]?.answer
          ? showques[questionIndex]?.score_ques
          : 0,
      ques_id: showques[questionIndex]?.ques_id,
      stu_id: stuid,
      test_id: testId,
    };
    dispatch(savetestresultdetail(body))
      .then((result) => {
        console.log(result);
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

  const renderChoices = (choices) => {
    return choices.map((choice, index) => (
      <div className="radio-container" key={index}>
        <input
          type="radio"
          value={choice}
          checked={selectedAnswers[currentQuestionIndex] === choice}
          onChange={handleAnswerSelect}
          id={`choice-${index}`}
        />
        <label className="radio-label" htmlFor={`choice-${index}`}>
          {choice}
        </label>
      </div>
    ));
  };

  const renderAnswerSummary = (questionIndex) => {
    const selectedAnswer = selectedAnswers[questionIndex];
    const correctAnswer = showques[questionIndex]?.answer;
    const isCorrect = selectedAnswer === correctAnswer;
    // console.log(showques[questionIndex]?.ques_id);
    // onInsertDe(questionIndex);
    return (
      <div className={`answer-summary ${isCorrect ? "correct" : "incorrect"}`}>
        <p>คำตอบของคุณ: {selectedAnswer}</p>
        {!isCorrect && <p>คำตอบที่ถูกต้อง: {correctAnswer}</p>}
        <p className="score">
          คะแนน: {isCorrect ? showques[questionIndex]?.score_ques : 0}
        </p>
      </div>
    );
  };

  return (
    <div className="body">
      <div className="App">
        <div className="test-container">
          <div className="question">
            {showResults ? (
              <div>
                <h2>ผลลัพธ์</h2>
                <p>
                  คะแนนที่ได้: {score}{" "}คะแนน
                </p>
                <p>
                  คะแนนเต็ม: {calculateTotalPossibleScore()}{" "}คะแนน
                </p>
                {completionTime && (
                  <p>ส่งแบบทดสอบตอน {formattime}</p>
                )}
                {showques.map((question, index) => (
                  <div key={index}>
                    <h4>คำถาม {index + 1} {showques[index].ques}</h4>
                    {renderAnswerSummary(index)}
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <h2>
                  {currentQuestionIndex + 1}.{" "}
                  {showques[currentQuestionIndex]?.ques}
                </h2>
                {/* <p>{showques[currentQuestionIndex]?.ques}</p> */}
                {showques[currentQuestionIndex]?.choice1 &&
                  renderChoices([
                    showques[currentQuestionIndex]?.choice1,
                    showques[currentQuestionIndex]?.choice2,
                    showques[currentQuestionIndex]?.choice3,
                    showques[currentQuestionIndex]?.choice4,
                  ])}
                <p>คะแนน: {showques[currentQuestionIndex]?.score_ques}</p>
              </div>
            )}
          </div>
          <div className="navigation">
            {currentQuestionIndex > 0 &&
              currentQuestionIndex !== showques.length &&
              !showResults && (
                <button className="buttn" onClick={handlePrevClick}>
                  ย้อนกลับ
                </button>
              )}
            {!showResults && currentQuestionIndex !== showques.length - 1 && (
              <button className="buttn" onClick={handleNextClick}>
                ข้อถัดไป
              </button>
            )}
            {!showResults && currentQuestionIndex === showques.length - 1 && (
              <button className="buttn" onClick={handleNextClick}>
                ส่งคำตอบ
              </button>
            )}
          </div>
          <div className="timer">{/* Implement timer logic here */}</div>
        </div>
      </div>
    </div>
  );
};

export default StartTest;

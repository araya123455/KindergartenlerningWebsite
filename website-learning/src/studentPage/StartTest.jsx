import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  showquestion,
  savetestresult,
  savetestresultdetail,
  testresultdetail,
  testedresult,
  selectedtest,
} from "../slice/StudentSlice";
import { getFromLocalStorage } from "../LocalStorage/localstorage";
import "../assets/css/starttest.css";

const StartTest = () => {
  const dispatch = useDispatch();
  const [showtest, setshowtest] = useState([]);
  const [showques, setshowques] = useState([]);
  const [showresult, setshowresult] = useState([]);
  const [showResults, setShowResults] = useState(false); // Check test have result or not
  const [showredetail, setshowredetail] = useState([]);
  const testId = getFromLocalStorage("testId");
  const auth = getFromLocalStorage("auth");
  const stuid = auth.stu_id;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
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

  const loadTestdetail = () => {
    dispatch(testresultdetail({ testId, stuid }))
      .then((result) => {
        setshowredetail(result.payload);
        // console.log(result.payload.length);
        // if (result.payload.length > 0) {
        //   setShowResults(true);
        // } else {
        //   setShowResults(false);
        // }
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

  const loadTestresult = () => {
    dispatch(testedresult({ testId, stuid }))
      .then((result) => {
        setshowresult(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadData();
    loadTestdetail();
    loadTestresult();
    loadShowtest();
  }, []);

  const handleAnswerSelect = (event) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = event.target.value;
    // console.log(newSelectedAnswers);
    // console.log(allQuestionsAnswered);
    // console.log(event.target.value);
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
      setShowResults(true); // Set showResults to true here
      // console.log("showResults",showResults);
      const currentTime = new Date();
      const formattedTime =
        currentTime &&
        `${currentTime.toLocaleDateString()} at ${currentTime.toLocaleTimeString()}`;
      setformattime(formattedTime);
      // console.log(formattedTime);

      if (formattime != null) {
        onInsert(formattedTime);
      }
      showques.forEach((question, index) => {
        onInsertDe(index);
      });
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
    const Answer = selectedAnswers[questionIndex];
    // console.log(Answer);
    let body = {
      ans_result: Answer,
      score:
        Answer === showques[questionIndex]?.answer
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
    showredetail?.forEach((data) => {
      newScore += data.score;
    });
    return newScore;
  };

  const calculateTotalPossibleScore = () => {
    let totalScore = 0;
    showques?.forEach((question) => {
      totalScore += question?.score_ques;
    });
    return totalScore;
  };

  const timeduration = () => {
    let time;
    showresult?.forEach((data) => {
      time = data?.time_duration;
    });
    return time;
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

  const renderAnswerSummary = () => {
    loadTestdetail();
    loadShowtest();
    loadTestresult();
    return (
      <div>
        {showredetail.map((question, index) => {
          const quest = showques[index]?.ques;
          const stuans = showredetail[index]?.ans_result;
          const correctans = showques[index]?.answer;
          const isCorrect = stuans === correctans;
          const scoreq = showques[index]?.score_ques;

          return (
            <div key={index}>
              <p>
                คำถาม {index + 1} {quest}
              </p>
              <div
                className={`answer-summary ${
                  isCorrect ? "correct" : "incorrect"
                }`}
              >
                <p>คำตอบของคุณ: {stuans}</p>
                {!isCorrect && <p>คำตอบที่ถูกต้อง: {correctans}</p>}
                <p className="score">คะแนน: {isCorrect ? scoreq : 0}</p>
              </div>
            </div>
          );
        })}
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
                {showtest?.map((data) => {
                  const { test_id, test_detail } = data;
                  return <h3 key={test_id}>{test_detail}</h3>;
                })}
                <div>
                  <h2>ผลการการทดสอบ</h2>
                  <p>คะแนนที่ได้: {calculateScore()} คะแนน</p>
                  <p>คะแนนเต็ม: {calculateTotalPossibleScore()} คะแนน</p>
                  <h4>ส่งแบบทดสอบเวลา: {timeduration()}</h4>
                </div>
                {renderAnswerSummary()}
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
                <button className="buttn button" onClick={handlePrevClick}>
                  ย้อนกลับ
                </button>
              )}
            {!showResults && currentQuestionIndex !== showques.length - 1 && (
              <button className="buttn button" onClick={handleNextClick}>
                ข้อถัดไป
              </button>
            )}
            {!showResults && currentQuestionIndex === showques.length - 1 && (
              <button className="buttn button" onClick={handleNextClick}>
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

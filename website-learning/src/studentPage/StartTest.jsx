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
  pyearterm,
  pkinder,
} from "../slice/SearchDataSlice";
import { getFromLocalStorage } from "../LocalStorage/localstorage";
import "../assets/css/starttest.css";
import { Link } from "react-router-dom";
import ShowTestResultStu from "./ShowTestResult";

const StartTest = () => {
  const dispatch = useDispatch();
  const [showdata, setshowdata] = useState([]);
  const [yearterm, setyearterm] = useState([]);
  const [kinder, setkinder] = useState([]);
  const [showtest, setshowtest] = useState([]);
  const [showques, setshowques] = useState([]);
  const [showresult, setshowresult] = useState([]);
  const [showResults, setShowResults] = useState(); // Check test have result or not
  const [showredetail, setshowredetail] = useState([]);
  const testId = getFromLocalStorage("testId");
  const auth = getFromLocalStorage("stu_auth");
  const stuid = auth.stu_id;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const allQuestionsAnswered = selectedAnswers.every((answer) => answer !== "");
  const [formattime, setformattime] = useState("");
  // console.log(showResults);
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
        if (result.payload.length > 0) {
          setShowResults(true);
        } else {
          setShowResults(false);
        }
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

  const loadyearterm = () => {
    if (stuid != null) {
      dispatch(pyearterm({ stuid }))
        .then((result) => {
          setyearterm(result.payload);
          // console.log(result);
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
          // console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    loadData();
    setshowdata(auth);
    loadyearterm();
    loadkinder();
    loadTestdetail();
    loadTestresult();
    loadShowtest();
  }, []);

  const handleAnswerSelect = (event) => {
    // console.log("1");
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = event.target.value;
    // console.log(newSelectedAnswers);
    // console.log(allQuestionsAnswered);
    // console.log(event.target.value);
    setSelectedAnswers(newSelectedAnswers);
    console.log(selectedAnswers);
  };

  // Use useEffect to log selectedAnswers when it changes
  useEffect(() => {
    console.log(selectedAnswers);
  }, [selectedAnswers]);

  const handlePrevClick = () => {
    if (currentQuestionIndex > 0) {
      console.log("2");
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  useEffect(() => {
    console.log(selectedAnswers);
  }, [selectedAnswers]);

  const handleNextClick = () => {
    if (currentQuestionIndex < showques.length - 1) {
      console.log("3");
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
        // console.log(question);
        // console.log(index);
        onInsertDe(index);
      });
    } else {
      alert("กรุณาทำแบบทดสอบให้ครบทุกข้อ!!");
    }
  };

  useEffect(() => {
    console.log(selectedAnswers);
  }, [selectedAnswers]);

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
    const quesId = showques[questionIndex]?.ques_id; // Use the correct ques_id
    const isCorrect = Answer === showques[questionIndex]?.answer;

    let body = {
      ans_result: Answer,
      score: isCorrect ? showques[questionIndex]?.score_ques : 0,
      ques_id: quesId, // Use the correct ques_id
      stu_id: stuid,
      test_id: testId,
    };
    console.log(body);

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

  // useEffect(() => {
  //   console.log(selectedAnswers);
  // }, [selectedAnswers]);

  const renderAnswerSummary = () => {
    loadTestdetail();
    loadShowtest();
    loadTestresult();
    return (
      <div>
        {showques.map((question, index) => {
          const { ques_id, ques, answer, score_ques } = question;
          const matchingQuestion = showredetail.find((q) => q.ques_id === ques_id);
  
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
                className={`answer-summary ${isCorrect ? "correct" : "incorrect"}`}
              >
                <p>คำตอบของคุณ: {ans_result}</p>
                {!isCorrect && <p>คำตอบที่ถูกต้อง: {answer}</p>}
                <p className="score">คะแนน: {isCorrect ? score_ques : 0}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  

  return (
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
        <div className="App">
          <div className="test-container">
            <div className="">
              {showResults ? (
                <div className="startsum-question">
                  <h2 className="hh-f">ผลการการทดสอบ</h2>
                  {showtest?.map((data) => {
                    const { test_id, test_detail } = data;
                    return (
                      <h3 className="header-f" key={test_id}>
                        {test_detail}
                      </h3>
                    );
                  })}
                  <div>
                    <p className="header-f">
                      ชื่อ-นามสกุล {showdata?.prefix} {showdata?.stu_Fname}{" "}
                      {showdata?.stu_Lname} เลขประจำตัว: {showdata?.stu_user}
                    </p>
                    <p className="header-f">
                      ระดับชั้น: {kinder[0]?.kinde_level}/
                      {kinder[0]?.Kinder_room} ปีการศึกษา: {yearterm[0]?.year}/
                      {yearterm[0]?.term}
                    </p>
                  </div>
                  <div className="summary-f">
                    <p className="sum-f">ส่งแบบทดสอบเวลา: {timeduration()}</p>
                  </div>
                  <div className="sum-f sum-top">
                    <p>คะแนนที่ได้: {calculateScore()} คะแนน</p>
                    <p>คะแนนเต็ม: {calculateTotalPossibleScore()} คะแนน</p>
                  </div>
                  {renderAnswerSummary()}
                </div>
              ) : (
                <div className="startte-question">
                  <h2 className="startte-h2">
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
    </div>
  );
};

export default StartTest;

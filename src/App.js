import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { MathJax, MathJaxContext } from "better-react-mathjax";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  useEffect(() => {
    const questionIDs = [
      "AreaUnderTheCurve_901",
      "BinomialTheorem_901",
      "DifferentialCalculus2_901",
    ];

    const fetchData = async () => {
      const questionData = await Promise.all(
        questionIDs.map((id) =>
          axios.get(
            `https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=${id}`
          )
        )
      );
      const questions = questionData.map((data) => data.data[0].Question);
      setQuestions(questions);
    };

    fetchData();
  }, []);
  const previousQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  return (
    <MathJaxContext>
      <div className="container">
        <div className="button-container">
          <button
            className="quiz-button"
            onClick={previousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous Question
          </button>
          <button
            className="quiz-button"
            onClick={nextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
          >
            Next Question
          </button>
        </div>
        <h2 className="quiz-title">Question {currentQuestionIndex + 1}</h2>
        <div className="quiz-question-container">
          <MathJax>{questions[currentQuestionIndex]}</MathJax>
        </div>
      </div>
    </MathJaxContext>
  );
}

export default App;

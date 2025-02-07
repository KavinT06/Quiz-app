"use client";
import { useState, useEffect } from 'react';
import Navbar from './Navbar';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [totalPoints, setTotalPoints] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    // Fetch questions from package.json
    fetch('/tech.json')
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.quizQuestions);
      })
      .catch((error) => console.error('Error fetching questions:', error));
  }, []);

  useEffect(() => {
    if (questions.length === 0 || quizFinished) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          // Move to the next question when time runs out
          if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            setTimeLeft(10);
          } else {
            // End the quiz if all questions are answered
            setQuizFinished(true);
            clearInterval(timer);
          }
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, questions, quizFinished]);

  const handleAnswer = (selectedAnswer) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.answer) {
      setTotalPoints((prevPoints) => prevPoints + currentQuestion.points);
    }

    // Move to the next question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTimeLeft(10);
    } else {
      setQuizFinished(true);
    }
  };

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  if (quizFinished) {
    return (
    <div>
      <h1 className='text-[#2563eb] font-bold text-2xl text-center my-5'>Quiz Results</h1>
      Quiz finished! Your total points: {totalPoints}
    </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <div className='flex items-center justify-center bg-[#f3f4f6] my-8'>
        <div className='bg-white w-6/12 text-center'>
          <h2 className='font-bold text-xl my-3'>Question {currentQuestionIndex + 1}</h2>
          <p className='text-2xl font-bold w-3/4 bg-[#3b82f6] ml-20 py-3 text-white rounded-xl'>{currentQuestion.question}</p>
          <p className='text-left ml-20 mt-5 font-bold'>Time left: {timeLeft} seconds</p>
          <ul>
            {currentQuestion.options.map((option, index) => (
              <li key={index}>
                <button className="btn btn-wide bg-slate-200 border-none text-black hover:bg-[#d1d5db] mt-5" onClick={() => handleAnswer(option)}>{option}</button>
              </li>
            ))}
          </ul>
          <p className='my-5'>Total Points: {totalPoints}</p>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
"use client";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Confet from "./Confet";
import Trophy from "./Trophy";
import Correct from "./Correct";
import Wrong from "./Wrong";
import Question from "./Question";
import Percentage from "./Percentage";
import Clock from "./Clock";
import Stopwatch from "./Stopwatch";
import Coins from "./Coins";

const Quiz = ({ jsonFile }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [totalPoints, setTotalPoints] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    fetch(`/${jsonFile}`)
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.quizQuestions);
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  useEffect(() => {
    if (questions.length === 0 || quizFinished) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            setTimeLeft(10);
          } else {
            setQuizFinished(true);
            clearInterval(timer);
          }
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, questions, quizFinished]);

  const handleAnswer = (selectedId) => {
    const currentQuestion = questions[currentQuestionIndex];
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].selectedAnswer = selectedId;
    setQuestions(updatedQuestions);
    if (selectedId === currentQuestion.answer) {
      setTotalPoints((prevPoints) => prevPoints + currentQuestion.points);
    }

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
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-[#2563eb] font-bold text-2xl text-center md:my-8 my-3">Quiz Results</h1>
          <ul className="font-medium w-full flex justify-end text-xl mb-3">
            <li className="flex items-center h-10">
              <Coins />
              <p className="block py-2 px-3 text-gray-900 font-bold">
                Points : <span className="text-blue-600">{totalPoints}</span>
              </p>
            </li>
          </ul>
        </div>
        <div className="flex justify-center items-center">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-10 gap-2 md:text-xl font-semibold">
            <div className="md:h-28 md:w-72 h-20 w-60 bg-white flex justify-center items-center rounded-2xl">
              <Confet />
              <div>
                <p className="mr-14">Total Points</p>
                <p className="ml-4 text-green-700">{totalPoints}</p>
              </div>
              <div className="w-9 my-6">
                <Trophy />
              </div>
            </div>
            <div className="md:h-28 md:w-72 h-20 w-60 bg-white flex justify-center items-center rounded-2xl">
              <div>
                <p className="mr-14">Points Earned</p>
                <p className="ml-4 text-green-700">{totalPoints}</p>
              </div>
              <div className="w-9 my-6">
                <Trophy />
              </div>
            </div>
            <div className="md:h-28 md:w-72 h-20 w-60 bg-white flex justify-center items-center rounded-2xl">
              <div>
                <p className="mr-14">Correct Answers</p>
                <p className="ml-4 text-green-700">
                  {questions.filter((q) => q.answer === q.selectedAnswer).length}
                </p>
              </div>
              <div className="w-9 my-6 fill-green-700">
                <Correct />
              </div>
            </div>
            <div className="md:h-28 md:w-72 h-20 w-60 bg-white flex justify-center items-center rounded-2xl">
              <div>
                <p className="mr-14">Wrong Answers</p>
                <p className="ml-4 text-red-700">
                  {questions.filter((q) => q.answer !== q.selectedAnswer && q.selectedAnswer !== undefined).length}
                </p>
              </div>
              <div className="w-9 my-6 fill-red-700">
                <Wrong />
              </div>
            </div>
            <div className="md:h-28 md:w-72 h-20 w-60 bg-white flex justify-center items-center rounded-2xl">
              <div>
                <p className="mx-6">Unattempted Questions</p>
                <p className="mx-8 text-red-500">
                  {questions.filter((q) => q.selectedAnswer === undefined).length}
                </p>
              </div>
              <div className="w-9 my-6 fill-yellow-600 mr-8">
                <Question />
              </div>
            </div>
            <div className="md:h-28 md:w-72 h-20 w-60 bg-white flex justify-center items-center rounded-2xl">
              <div>
                <p className="mr-16">Percentage</p>
                <p className="ml-4 text-blue-700">
                  {((totalPoints / questions.reduce((acc, q) => acc + q.points, 0)) * 100).toFixed(2)}%
                </p>
              </div>
              <div className="w-9 my-6 fill-blue-700">
                <Percentage />
              </div>
            </div>
            <div className="md:h-28 md:w-72 h-20 w-60 bg-white flex justify-center items-center rounded-2xl">
              <div>
                <p className="mr-14">Total Time Spent</p>
                <p className="ml-4 text-purple-700">{questions.length * 10 - timeLeft} seconds</p>
              </div>
              <div className="w-9 my-6 fill-purple-700">
                <Clock />
              </div>
            </div>
            <div className="md:h-28 md:w-72 h-20 w-60 bg-white flex justify-center items-center rounded-2xl">
              <div>
                <p className="mx-6">Avg Time/Question</p>
                <p className="mx-8 text-blue-500">
                  {((questions.length * 10 - timeLeft) / questions.length).toFixed(2)} seconds
                </p>
              </div>
              <div className="w-9 my-6 fill-blue-400 mr-6">
                <Stopwatch />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="md:h-14 md:w-3/6 bg-white md:my-10 my-3 rounded-2xl">
            <p className="font-bold md:text-xl text-center p-4">
              You scored {totalPoints} out of {questions.reduce((acc, q) => acc + q.points, 0)} points!
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <div className="flex items-center justify-center bg-[#f3f4f6]">
        <div className="bg-white md:w-6/12 w-11/12 text-center md:my-8">
          <h2 className="font-bold text-xl my-3">Question {currentQuestionIndex + 1}</h2>
          <p className="md:text-2xl text-lg font-bold lg:w-3/4 md:w-8/12 w-9/12 bg-[#3b82f6] md:ml-20 md:py-3 ml-10 text-white rounded-xl">
            {currentQuestion.question}
          </p>
          <p className="text-left md:ml-20 md:mt-5 my-3 ml-3 font-bold">
            Time left:
            <span className="inline text-red-700"> {timeLeft}</span > sec
            <span className="hidden md:inline">onds</span>
          </p>
          <ul>
            {currentQuestion.options.map((option) => (
              <li key={option.id}>
                <button
                  className="btn btn-wide bg-slate-200 border-none text-black hover:bg-[#d1d5db] md:mt-5 mt-3 xl:w-2/4"
                  onClick={() => handleAnswer(option.id)}
                >
                  {option.answer}
                </button>
              </li>
            ))}
          </ul>
          <p className="my-5 font-semibold">Total Points: <span className="inline text-green-700 font-bold">{totalPoints}</span></p>
        </div>
      </div>
    </div>
  );
};

export default Quiz;

"use client";
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Confet from './Confet';
import Trophy from './Trophy';
import Correct from './Correct';
import Wrong from './Wrong';
import Question from './Question';
import Percentage from './Percentage';
import Clock from './Clock';
import Stopwatch from './Stopwatch';

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
        <h1 className='text-[#2563eb] font-bold text-2xl text-center my-8'>Quiz Results</h1>
        {/* Quiz finished! Your total points: {totalPoints} */}
        <div className='flex justify-center items-center'>
          <div className='grid grid-cols-3 gap-10 text-xl font-semibold'>
            <div className='h-28 w-72 bg-white flex justify-center items-center rounded-2xl'>
              <Confet />
              <div>
                <p className='mr-14'>Total Points</p>
                <p className='ml-4 text-green-700'>{totalPoints}</p>
              </div>
              <div className='w-9 my-6'>
                <Trophy />
              </div>
            </div>
            <div className='h-28 w-72 bg-white flex justify-center items-center rounded-2xl'>
              <div>
                <p className='mr-14'>Points Earned</p>
                <p className='ml-4 text-green-700'>{totalPoints}</p>
              </div>
              <div className='w-9 my-6'>
                <Trophy />
              </div>
            </div>
            <div className='h-28 w-72 bg-white flex justify-center items-center rounded-2xl'>
              <div>
                <p className='mr-14'>Correct Answers</p>
                <p className='ml-4 text-green-700'>{questions.filter(q => q.answer === q.selectedAnswer).reduce((acc, q) => acc + q.points, 0)}</p>
              </div>
              <div className='w-9 my-6 fill-green-700'>
                <Correct />
              </div>
            </div>
            <div className='h-28 w-72 bg-white flex justify-center items-center rounded-2xl'>
              <div>
                <p className='mr-14'>Wrong Answers</p>
                <p className='ml-4 text-red-700'>{questions.filter(q => q.answer !== q.selectedAnswer && q.selectedAnswer !== undefined).length}</p>
              </div>
              <div className='w-9 my-6 fill-red-700'>
                <Wrong />
              </div>
            </div>
            <div className='h-28 w-72 bg-white flex justify-center items-center rounded-2xl'>
              <div>
                <p className='mx-6'>Unattempted Questions</p>
                <p className='mx-8 text-red-500'>{questions.filter(q => q.selectedAnswer === undefined).length}</p>
              </div>
              <div className='w-9 my-6 fill-yellow-600 mr-8'>
                <Question />
              </div>
            </div>
            <div className='h-28 w-72 bg-white flex justify-center items-center rounded-2xl'>
              <div>
                <p className='mr-16'>Percentage</p>
                <p className='ml-4 text-blue-700'>{((totalPoints / questions.reduce((acc, q) => acc + q.points, 0)) * 100).toFixed(2)}%</p>
              </div>
              <div className='w-9 my-6 fill-blue-700'>
                <Percentage />
              </div>
            </div>
            <div className='h-28 w-72 bg-white flex justify-center items-center rounded-2xl'>
              <div>
                <p className='mr-14'>Total Time Spent</p>
                <p className='ml-4 text-purple-700'>{questions.length * 10 - timeLeft} seconds</p>
              </div>
              <div className='w-9 my-6 fill-purple-700'>
                <Clock />
              </div>
            </div>
            <div className='h-28 w-72 bg-white flex justify-center items-center rounded-2xl'>
              <div>
                <p className='mx-6'>Avg Time/Question</p>
                <p className='mx-8 text-blue-500'>{((questions.length * 10 - timeLeft) / questions.length).toFixed(2)} seconds</p>
              </div>
              <div className='w-9 my-6 fill-blue-400 mr-6'>
                <Stopwatch />
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-center items-center'>
          <div className='h-14 w-3/6 bg-white my-6 rounded-2xl'>
            <p className='font-bold text-xl text-center p-4'>You scored {totalPoints} out of {questions.reduce((acc, q) => acc + q.points, 0)} points!</p>
          </div>
        </div>
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
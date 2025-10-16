import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // If time runs out
    if (timeRemaining === 0) {
      onAnswered(false); // user didn’t answer in time
      setTimeRemaining(10); // reset timer for next question
      return;
    }
    const timer = setTimeout(() => {
      setTimeRemaining((time) => time - 1);
    }, 1000);

    // Cleanup to prevent overlapping timers
    return () => clearTimeout(timer);
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    onAnswered(isCorrect);
    setTimeRemaining(10); // reset timer for next question
  }

  const { answers, correctAnswer, question: questionText } = question;

  return (
    <div className="question">
      <h2>{questionText}</h2>
      <div className="answers">
        {answers.map((answer) => (
          <button
            key={answer}
            onClick={() => handleAnswer(answer === correctAnswer)}
          >
            {answer}
          </button>
        ))}
      </div>
      <p>{timeRemaining} seconds remaining</p>
    </div>
  );
}

export default Question;

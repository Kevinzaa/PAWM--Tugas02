import React, { useState } from 'react';

function InteractiveSection() {
  const questions = [
    {
      question: "Apa itu kimia dasar?",
      options: ["Ilmu tentang atom", "Ilmu tentang komputer", "Ilmu tentang sejarah", "Ilmu tentang psikologi"],
      answer: 0,
    },
    {
      question: "Apa itu tabel periodik?",
      options: ["Daftar atom", "Daftar senyawa", "Daftar tumbuhan", "Daftar mamalia"],
      answer: 0,
    },
    {
      question: "Apa itu reaksi redoks?",
      options: ["Reaksi kimia", "Reaksi biologi", "Reaksi fisika", "Reaksi geologi"],
      answer: 0,
    },
    {
      question: "Apa peran elektron dalam ikatan kimia?",
      options: ["Membentuk ikatan", "Tidak berpengaruh", "Menghasilkan cahaya", "Menjadi negatif"],
      answer: 0,
    },
    {
      question: "Apa perbedaan antara ion dan atom?",
      options: ["Ion memiliki muatan", "Atom memiliki muatan", "Ion berwarna", "Atom bisa berbentuk gas"],
      answer: 0,
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswerSubmit = () => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setSelectedOption(null);
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinished(true);
      saveScoreToProfile(score + 1);
    }
  };

  const saveScoreToProfile = async (finalScore) => {
    try {
      await GlobalApi.updateUserScore(user.email, finalScore); 
      console.log("Skor berhasil disimpan");
    } catch (error) {
      console.error("Gagal menyimpan skor:", error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Interactive Quiz</h3>
      {finished ? (
        <div className="text-center">
          <p className="text-lg">Quiz selesai!</p>
          <p>Skor akhir Anda: {score}/{questions.length}</p>
        </div>
      ) : (
        <div>
          <p className="text-lg mb-2">{questions[currentQuestion].question}</p>
          <div className="flex flex-col gap-2">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedOption(index)}
                className={`p-2 rounded-lg ${selectedOption === index ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}
              >
                {option}
              </button>
            ))}
          </div>
          <button
            onClick={handleAnswerSubmit}
            disabled={selectedOption === null}
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg disabled:bg-gray-300"
          >
            Submit Answer
          </button>
        </div>
      )}
    </div>
  );
}

export default InteractiveSection;

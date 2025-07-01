import { useState, type FC } from "react";
import type { IQviz } from "../types/Qviz";
import '../styles/QvizProgram.css'

interface QvizProgramProps {
  qviz: IQviz[];
}

export const QvizProgram: FC<QvizProgramProps> = ({ qviz }) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  
  if (!qviz || qviz.length === 0) {
    return <div>Ошибка: вопросы не загружены</div>;
  }
  
  const currentQ = qviz[currentQuestion];
  const progressPercentage = ((currentQuestion + 1) / qviz.length) * 100;
  
  const handleAnswerSelect = (answer: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: answer }));
    
    if (currentQuestion < qviz.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      finishQviz();
    }
  };

  const handleInputChange = (value: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: value }));
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const goNext = () => {
    if (currentQuestion < qviz.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      finishQviz();
    }
  };

  const finishQviz = () => {
    console.log("Ответы пользователя:", answers);
    alert("Квиз завершен! Генерируем программу...");
  };

  const isCurrentAnswered = answers[currentQuestion] !== undefined;

  return (
    <div className="qviz-container">
      <div className="qviz-progress-bar">
        <div 
          className="qviz-progress-fill" 
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      <div className="qviz-question-counter">
        Вопрос {currentQuestion + 1} из {qviz.length}
      </div>
      
      <h2 className="qviz-question-text">{currentQ.question}</h2>
      
      {currentQ.inputType ? (
        <div className="qviz-input-container">
          <input
            type={currentQ.inputType}
            min={currentQ.min}
            max={currentQ.max}
            step={currentQ.step}
            value={answers[currentQuestion] || ''}
            onChange={(e) => handleInputChange(e.target.value)}
            className="qviz-input"
          />
          {currentQ.unit && <span className="qviz-input-unit">{currentQ.unit}</span>}
        </div>
      ) : (
        <div className="qviz-answers-grid">
          {currentQ.answers?.map((answer, index) => (
            <button
              key={index}
              className="qviz-answer-button"
              onClick={() => handleAnswerSelect(answer)}
            >
              {answer}
            </button>
          ))}
        </div>
      )}
      
      <div className="qviz-navigation">
        <button
          className="qviz-back-button"
          onClick={goBack}
          disabled={currentQuestion === 0}
        >
          Назад
        </button>
        
        {(currentQ.inputType || currentQuestion === qviz.length - 1) && (
          <button
            className="qviz-next-button"
            onClick={goNext}
            disabled={!isCurrentAnswered}
          >
            {currentQuestion === qviz.length - 1 ? 'Завершить' : 'Далее'}
          </button>
        )}
      </div>
    </div>
  );
};
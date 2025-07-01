import { type FC, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { ITrainingProgram } from "../components/MyProgram";
import '../styles/FormStyles.css';

export const TrainingDetails: FC = () => {
  const { id } = useParams();
  const [training, setTraining] = useState<ITrainingProgram | null>(null);

  useEffect(() => {
    const savedTrainings = JSON.parse(localStorage.getItem('trainings') || '[]');
    const foundTraining = savedTrainings.find((t: ITrainingProgram) => t.id === id);
    setTraining(foundTraining);
  }, [id]);

  if (!training) return <div className="loading">Тренировка не найдена</div>;

  return (
    <div className="form-container">
      <div className="training-header">
        <h2 className="form-title">{training.name}</h2>
        <span className="training-date">
          Создано: {new Date(training.createdAt).toLocaleString()}
        </span>
      </div>

      <div className="result-form">
        <h3>Детали тренировки</h3>
        
        <div className="training-meta">
          <p><strong>Разминка:</strong> {training.warmUp} минут</p>
          <p><strong>Всего упражнений:</strong> {training.exercises.length}</p>
        </div>

        <div className="exercises-details">
          <h4>Упражнения:</h4>
          {training.exercises.map((ex, idx) => (
            <div key={ex.id} className="exercise-detail">
              <div className="exercise-title">
                <span className="exercise-number">{idx + 1}.</span>
                <span className="exercise-name">
                  {ex.exercise === 'custom' ? ex.customExercise : ex.exercise}
                </span>
              </div>
              <div className="exercise-stats">
                <div className="stat-item">
                  <span className="stat-label">Подходы</span>
                  <span className="stat-value">{ex.sets}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Повторения</span>
                  <span className="stat-value">{ex.reps}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Вес</span>
                  <span className="stat-value">{ex.weight} кг</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Link to="/my-trainings" className="calculate-btn">
        ← Назад к моим тренировкам
      </Link>
    </div>
  );
};
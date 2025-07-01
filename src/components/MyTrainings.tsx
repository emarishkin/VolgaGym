import { type FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { ITrainingProgram } from "./MyProgram";
import '../styles/FormStyles.css';

export const MyTrainings: FC = () => {
  const [trainings, setTrainings] = useState<ITrainingProgram[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedTrainings = JSON.parse(localStorage.getItem('trainings') || '[]');
    setTrainings(savedTrainings);
    setIsLoading(false);
  }, []);

  const deleteTraining = (id: string) => {
    const updatedTrainings = trainings.filter(t => t.id !== id);
    localStorage.setItem('trainings', JSON.stringify(updatedTrainings));
    setTrainings(updatedTrainings);
  };

  if (isLoading) return <div className="loading">Загрузка...</div>;

  return (
    <div className="form-container">
      <h2 className="form-title">Мои тренировки</h2>
      
      {trainings.length === 0 ? (
        <div className="no-trainings">
          <p>У вас пока нет сохраненных тренировок</p>
          <Link to="/create/program" className="calculate-btn">
            Создать первую тренировку
          </Link>
        </div>
      ) : (
        <div className="trainings-list">
          {trainings.map(training => (
            <div key={training.id} className="training-card">
              <div className="training-header">
                <h3>{training.name}</h3>
                <span className="training-date">
                  {new Date(training.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              <div className="training-details">
                <p><strong>Разминка:</strong> {training.warmUp} мин</p>
                <h4>Упражнения:</h4>
                <ul className="exercises-list">
                  {training.exercises.map((ex, idx) => (
                    <li key={ex.id}>
                      <span className="exercise-number">{idx + 1}.</span>
                      <span className="exercise-name">
                        {ex.exercise === 'custom' ? ex.customExercise : ex.exercise}
                      </span>
                      <span className="exercise-sets">{ex.sets}×{ex.reps}</span>
                      <span className="exercise-weight">{ex.weight} кг</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="training-actions">
                <button 
                  className="delete-btn"
                  onClick={() => deleteTraining(training.id)}
                >
                  Удалить
                </button>
                <Link 
                  to={`/trainings/${training.id}`} 
                  className="view-btn"
                >
                  Подробнее
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
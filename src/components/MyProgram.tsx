import { useState, type ChangeEvent, type FC, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/FormStyles.css';

interface IExercise {
  id: string;
  exercise: string;
  customExercise?: string;
  weight: number;
  reps: number;
  sets: number;
}

export interface ITrainingProgram {
  id: string;
  name: string;
  warmUp: number;
  exercises: IExercise[];
  createdAt: string;
}

export const MyProgram: FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<Omit<ITrainingProgram, 'id' | 'createdAt'>>({
    name: '',
    warmUp: 5,
    exercises: [{
      id: crypto.randomUUID(),
      exercise: '',
      customExercise: '',
      weight: 50,
      reps: 3,
      sets: 8
    }]
  });

  const handleMainChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: e.target.type === 'number' ? Number(value) : value
    });
  };

  const handleExerciseChange = (index: number, e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedExercises = [...form.exercises];
    updatedExercises[index] = {
      ...updatedExercises[index],
      [name]: e.target.type === 'number' ? Number(value) : value
    };
    setForm({ ...form, exercises: updatedExercises });
  };

  const addExercise = () => {
    setForm({
      ...form,
      exercises: [...form.exercises, {
        id: crypto.randomUUID(),
        exercise: '',
        customExercise: '',
        weight: 50,
        reps: 3,
        sets: 8
      }]
    });
  };

  const removeExercise = (index: number) => {
  if (form.exercises.length <= 1) return;
  const updatedExercises = form.exercises.filter((_, i) => i !== index);
  setForm({ ...form, exercises: updatedExercises });
  };  

  const saveTraining = (e:FormEvent) => {
    e.preventDefault()
    const newTraining: ITrainingProgram = {
      ...form,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };

    const savedTrainings = JSON.parse(localStorage.getItem('trainings') || '[]');
    localStorage.setItem('trainings', JSON.stringify([...savedTrainings, newTraining]));
    
    navigate('/my-trainings');
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Создание тренировочного дня</h2>
      <form onSubmit={saveTraining}>
        <div className="form-group">
          <label className="form-label">Название вашей тренировки</label>
          <input
            type="text"
            name="name"
            className="form-input"
            value={form.name}
            placeholder="Например: Спина/Плечи/Трицепс или Верх/Низ"
            onChange={handleMainChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Разминка (минут)</label>
          <select 
            name="warmUp" 
            className="form-select"
            value={form.warmUp || ''} 
            onChange={handleMainChange} 
            required
          >
            {[2, 5, 10, 15, 20].map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>

        {form.exercises.map((exercise, index) => (
          <div key={index} className="exercise-block">
            <h3 className="exercise-title">{index + 1}-е Упражнение</h3>

            <div className="form-group">
              <label className="form-label">Упражнение</label>
              <select
                name="exercise"
                className="form-select"
                value={exercise.exercise || ''}
                onChange={(e) => handleExerciseChange(index, e)}
                required
              >
                <option value="">Выберите упражнение</option>
                <option value="Жим штанги">Жим штанги</option>
                <option value="Приседания со штангой на плечах">Приседания со штангой</option>
                <option value="Тяга верхнего блока">Тяга верхнего блока</option>
                <option value="Сгибание рук на бицепс с гантелью">Сгибание рук на бицепс</option>
                <option value="Отжимания">Отжимания</option>
                <option value="Французский жим">Французский жим</option>
                <option value="Разгибание">Разгибание</option>
                <option value="custom">Другое</option>
              </select>

              {exercise.exercise === 'custom' && (
                <input
                  type="text"
                  name="customExercise"
                  className="form-input"
                  value={exercise.customExercise || ''}
                  onChange={(e) => handleExerciseChange(index, e)}
                  placeholder="Введите свое упражнение"
                  required
                />
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Вес (кг)</label>
              <input
                type="number"
                name="weight"
                className="form-input"
                min="0"
                step="0.5"
                value={exercise.weight || ''}
                onChange={(e) => handleExerciseChange(index, e)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Подходы</label>
              <select
                name="sets"
                className="form-select"
                onChange={(e) => handleExerciseChange(index, e)}
                value={exercise.sets || ''}
                required
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((set) => (
                  <option key={set} value={set}>{set}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Повторения</label>
              <select
                name="reps"
                className="form-select"
                value={exercise.reps || ''}
                onChange={(e) => handleExerciseChange(index, e)}
                required
              >
                {Array.from({ length: 30 }, (_, i) => (
                  <option key={i+1} value={i+1}>{i+1}</option>
                ))}
              </select>
            </div>

            <button
              type="button"
              className="remove-btn"
              onClick={() => removeExercise(index)}
              disabled={form.exercises.length <= 1}
            >
              Удалить упражнение
            </button>
          </div>
        ))}

        <div className="form-actions">
          <button 
            type="button" 
            className="add-btn calculate-btn"
            onClick={addExercise}
          >
            ➕ Добавить упражнение
          </button>
          <button 
            type="submit" 
            className="submit-btn calculate-btn"
          >
            💾 Сохранить программу
          </button>
          <Link to="/create" className="back-btn calculate-btn">
            ← Назад
          </Link>
        </div>
      </form>
    </div>
  );
};
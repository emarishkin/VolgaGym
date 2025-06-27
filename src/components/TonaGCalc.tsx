import { useState } from "react";
import '../styles/FormStyles.css'


export const VolumeCalculator = () => {
  const [weight, setWeight] = useState(0);
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [volume, setVolume] = useState(0);

  const calculate = () => setVolume(weight * sets * reps);

  return (
    <div className="form-container">
      <h2 className="form-title">Объем тренировки (тоннаж)</h2>
      <div className="input-group">
        <label className="form-label">Вес (кг)</label>
        <input className="form-input" type="number" value={weight || ''} onChange={(e) => setWeight(+e.target.value)} />
      </div>
      <div className="input-group">
        <label className="form-label">Подходы</label>
        <input className="form-input" type="number" value={sets || ''} onChange={(e) => setSets(+e.target.value)} />
      </div>
      <div className="input-group">
        <label className="form-label">Повторения</label>
        <input className="form-input" type="number" value={reps || ''} onChange={(e) => setReps(+e.target.value)} />
      </div>
      <button className="calculate-btn" onClick={calculate}>Рассчитать</button>
      {volume > 0 && (
        <div className="result-form">
          <h3>Общий объем: <strong>{volume} кг</strong></h3>
        </div>
      )}
    </div>
  );
};
import { useState, type FC, type FormEvent } from "react";
import { Link } from "react-router-dom";
import '../styles/FormStyles.css';

export const BACCalc: FC = () => {
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [volume, setVolume] = useState<number>(200);
    const [strength, setStrength] = useState<number>(0.08);
    const [weight, setWeight] = useState<number>(70);
    const [time, setTime] = useState<number>(1);
    const [result, setResult] = useState<number | null>(null);
    
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        let BAC = 0;
        let massAlco = volume * strength * 0.8;
        if (gender === 'male') {
            BAC = massAlco / (weight * 0.68) - (0.15 * time);
        } else {
            BAC = massAlco / (weight * 0.55) - (0.15 * time);
        }
        setResult(BAC);
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h2 className="form-title">Калькулятор содержания алкоголя в крови</h2>
                
                <div className="input-group">
                    <label className="form-label">Пол</label>
                    <select 
                        className="form-select"
                        value={gender} 
                        onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                    >
                        <option value="male">Мужчина</option>
                        <option value="female">Женщина</option>
                    </select>
                </div>

                <div className="input-group">
                    <label className="form-label">Напиток (крепость в %)</label>
                    <select 
                        className="form-select"
                        value={strength} 
                        onChange={(e) => setStrength(Number(e.target.value))}
                    >
                        <option value={0.08}>Пиво (8%)</option>
                        <option value={0.15}>Вино (15%)</option>
                        <option value={0.12}>Шампанское (12%)</option>
                        <option value={0.4}>Водка (40%)</option>
                        <option value={0.5}>Виски (50%)</option>
                        <option value={0.7}>Абсент (70%)</option>
                        <option value={0.42}>Коньяк (42%)</option>
                    </select>
                </div>

                <div className="input-group">
                    <label className="form-label">Объем (мл)</label>
                    <input
                        className="form-input"
                        type="number"
                        value={volume || ''}
                        onChange={(e) => setVolume(Number(e.target.value))}
                        min="1"
                    />
                </div>

                <div className="input-group">
                    <label className="form-label">Ваш вес (кг)</label>
                    <input
                        className="form-input"
                        type="number"
                        value={weight || ''}
                        onChange={(e) => setWeight(Number(e.target.value))}
                        min="30"
                        max="200"
                    />
                </div>

                <div className="input-group">
                    <label className="form-label">Время с последнего приема (часы)</label>
                    <input
                        className="form-input"
                        type="number"
                        value={time || ''}
                        onChange={(e) => setTime(Number(e.target.value))}
                        min="0"
                        step="0.5"
                    />
                </div>

                <button className="calculate-btn" type="submit">Рассчитать</button>

                {result && (
                    <div className="result-form">
                        <h3>Результат: {result.toFixed(2)}%</h3>
                        <p className="result-text">
                            {result >= 0.2 && result <= 0.49 ? 'Нулевая степень' :
                             result >= 0.5 && result <= 1.5 ? 'Легкая степень' :
                             result >= 1.51 && result <= 2.5 ? 'Средняя степень' :
                             'Тяжелая степень'}
                        </p>
                        <p className={`result-verdict ${result <= 0.3 ? 'allowed' : 'not-allowed'}`}>
                            {result <= 0.3 ? 'За руль можно' : 'За руль нельзя'}
                        </p>
                    </div>
                )}

                <Link to='/calc' className="back-link">
                    ← Вернуться к калькуляторам
                </Link>
            </form>
        </div>
    );
};
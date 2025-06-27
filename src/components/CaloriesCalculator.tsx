import { useState, type FC, type FormEvent } from "react";
import { Link } from "react-router-dom";
import '../styles/FormStyles.css';

export const CaloriesCalculator: FC = () => {
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [age, setAge] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [weight, setWeight] = useState<number>(0);
    const [activityLevel, setActivityLevel] = useState<number>(1.55);
    const [result, setResult] = useState<{ 
        bmr: number; 
        tde: number; 
        low: number; 
        high: number 
    } | null>(null);
    
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        let bmr;
        if (gender === 'male') {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }
        const tde = bmr * activityLevel;
        const low = tde * 0.85;
        const high = tde * 1.25;
        
        setResult({
            bmr: Math.round(bmr),
            tde: Math.round(tde),
            low: Math.round(low),
            high: Math.round(high)
        });
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h2 className="form-title">Калькулятор суточной нормы калорий</h2>

                <div className="checkbox-group">
                    <label className="checkbox-label">
                        <input
                            type="radio"
                            name="gender"
                            checked={gender === 'male'}
                            onChange={() => setGender('male')}
                            className="checkbox-input"
                        />
                        Мужчина
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="radio"
                            name="gender"
                            checked={gender === 'female'}
                            onChange={() => setGender('female')}
                            className="checkbox-input"
                        />
                        Женщина
                    </label>
                </div>

                <div className="input-group">
                    <label className="form-label">Возраст (лет)</label>
                    <input
                        className="form-input"
                        type="number"
                        value={age || ''}
                        onChange={(e) => setAge(Number(e.target.value))}
                        min="15"
                        max="100"
                    />
                </div>

                <div className="input-group">
                    <label className="form-label">Рост (см)</label>
                    <input
                        className="form-input"
                        type="number"
                        value={height || ''}
                        onChange={(e) => setHeight(Number(e.target.value))}
                        min="100"
                        max="250"
                    />
                </div>

                <div className="input-group">
                    <label className="form-label">Вес (кг)</label>
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
                    <label className="form-label">Уровень активности</label>
                    <select 
                        className="form-select"
                        value={activityLevel} 
                        onChange={(e) => setActivityLevel(Number(e.target.value))}
                    >
                        <option value={1.2}>Сидячий образ жизни</option>
                        <option value={1.375}>Легкая активность</option>
                        <option value={1.55}>Умеренная активность</option>
                        <option value={1.725}>Высокая активность</option>
                        <option value={1.9}>Экстремальная активность</option>
                    </select>
                </div>
                
                <button className="calculate-btn" type="submit">Рассчитать</button>
                
                {result && (
                    <div className="result-form">
                        <h3>Результаты:</h3>
                        <div className="macros-grid">
                            <div className="macro-item">
                                <h4>Базовый метаболизм</h4>
                                <p>{result.bmr} ккал/день</p>
                            </div>
                            <div className="macro-item">
                                <h4>Снижение веса</h4>
                                <p>{result.low} ккал/день</p>
                            </div>
                            <div className="macro-item">
                                <h4>Поддержание веса</h4>
                                <p>{result.tde} ккал/день</p>
                            </div>
                            <div className="macro-item">
                                <h4>Набор веса</h4>
                                <p>{result.high} ккал/день</p>
                            </div>
                        </div>
                    </div>
                )}
                
                <Link to='/calc' className="back-link">
                    ← Вернуться к калькуляторам
                </Link>
            </form>
        </div>
    );
};
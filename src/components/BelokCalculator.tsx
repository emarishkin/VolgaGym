import { useState, type FC, type FormEvent } from "react";
import { Link } from "react-router-dom";
import '../styles/FormStyles.css';

export const BelokCalculator: FC = () => {
    const [gender, setGender] = useState<'male' | 'female' | 'не выбрано'>('не выбрано');
    const [weight, setWeight] = useState<number>(70);
    const [activity, setActivity] = useState<number>(1.55);
    const [result, setResult] = useState<number | null>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        let normaBelka;
        if (weight <= 0 || gender === 'не выбрано') return alert('Заполните все поля');
        if (gender === 'male') {
            normaBelka = weight * activity;
        } else {
            normaBelka = weight * activity - 50;
        }
        setResult(normaBelka);
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h2 className="form-title">Расчет суточной нормы белка</h2>
                
                <div className="input-group">
                    <label className="form-label">Пол</label>
                    <select
                        className="form-select"
                        value={gender}
                        onChange={(e) => setGender(e.target.value as 'male' | 'female' | 'не выбрано')}
                    >
                        <option value="не выбрано">Не выбрано</option>
                        <option value="male">Мужчина</option>
                        <option value="female">Женщина</option>
                    </select>
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
                    <label className="form-label">Коэффициент активности</label>
                    <select
                        className="form-select"
                        value={activity}
                        onChange={(e) => setActivity(Number(e.target.value))}
                    >
                        <option value={0.9}>Сидячий образ жизни</option>
                        <option value={1.1}>Легкая активность</option>
                        <option value={1.55}>Умеренная активность</option>
                        <option value={1.925}>Высокая активность</option>
                        <option value={2.1}>Экстремальная активность</option>
                    </select>
                </div>

                <button className="calculate-btn" type="submit">Рассчитать</button>

                {result && (
                    <div className="result-form">
                        <h3>Ваша суточная норма белка:</h3>
                        <p className="result-value">{result} грамм</p>
                    </div>
                )}

                <Link to='/calc' className="back-link">
                    ← Вернуться к калькуляторам
                </Link>
            </form>
        </div>
    );
};
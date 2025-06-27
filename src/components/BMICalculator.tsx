import { useState, type FC, type FormEvent } from "react";
import { Link } from "react-router-dom";
import '../styles/FormStyles.css';

export const BMICalculator: FC = () => {
    const [height, setHeight] = useState<number>(0);
    const [weight, setWeight] = useState<number>(0);
    const [bmi, setBmi] = useState<number | null>(null);
    
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (height > 0 && weight > 0) {
            const heightNorm = height / 100;
            const res = weight / (heightNorm * heightNorm);
            setBmi(Number(res.toFixed(1)));
        }
    };
    
    const HandleCategory = () => {
        if (!bmi) return '';
        if (bmi < 18.5) return 'Недостаточный вес';
        if (bmi < 25) return 'Нормальный вес';
        if (bmi < 30) return 'Избыточный вес';
        return 'Ожирение';
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h2 className="form-title">Калькулятор ИМТ</h2>

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

                <button className="calculate-btn" type="submit">Рассчитать</button>

                {bmi && (
                    <div className="result-form">
                        <div className="macro-item">
                            <h3>Ваш ИМТ:</h3>
                            <p className="result-value">{bmi}</p>
                        </div>
                        <div className="macro-item">
                            <h3>Категория:</h3>
                            <p className="result-text">{HandleCategory()}</p>
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
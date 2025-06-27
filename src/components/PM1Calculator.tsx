import { useState, type FC, type FormEvent } from "react";
import { Link } from "react-router-dom";
import '../styles/FormStyles.css';

export const PM1Calculator: FC = () => {
    const [weight, setWeight] = useState<number>(0);
    const [reps, setReps] = useState<number>(0);
    const [result, setResult] = useState<{
        FormulaEply: number,
        FormulaBR: number,
        FormulaLen: number,
        averange: number
    } | null>(null);
    
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (weight <= 0 || reps <= 0) {
            return alert('Введите корректные данные');
        }

        const FormulaEply = (weight * reps) / 30 + weight;
        const FormulaBR = weight * (36 / (37 - reps));
        const FormulaLen = (100 * weight) / (101.3 - 2.67123 * reps);
        const averange = (FormulaEply + FormulaBR + FormulaLen) / 3;

        setResult({
            FormulaEply: Math.round(FormulaEply),
            FormulaBR: Math.round(FormulaBR),
            FormulaLen: Math.round(FormulaLen),
            averange: Math.round(averange)
        });
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h2 className="form-title">Расчёт одноповторного максимума</h2>
                
                <div className="input-group">
                    <label className="form-label">Вес (кг)</label>
                    <input
                        className="form-input"
                        type="number"
                        value={weight || ''}
                        onChange={(e) => setWeight(Number(e.target.value))}
                        min="1"
                    />
                </div>

                <div className="input-group">
                    <label className="form-label">Повторения</label>
                    <input
                        className="form-input"
                        type="number"
                        value={reps || ''}
                        onChange={(e) => setReps(Number(e.target.value))}
                        min="1"
                    />
                </div>
                
                <button className="calculate-btn" type="submit">Рассчитать</button>

                {result && (
                    <div className="result-form">
                        <h3>Результаты расчета:</h3>
                        <div className="macros-grid">
                            <div className="macro-item">
                                <p>Формула Эпли:</p>
                                <strong>{result.FormulaEply} кг</strong>
                            </div>
                            <div className="macro-item">
                                <p>Формула Бржицки:</p>
                                <strong>{result.FormulaBR} кг</strong>
                            </div>
                            <div className="macro-item">
                                <p>Формула Лэндера:</p>
                                <strong>{result.FormulaLen} кг</strong>
                            </div>
                        </div>
                        <div className="macro-item average">
                            <p>Среднее значение:</p>
                            <strong>{result.averange} кг</strong>
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
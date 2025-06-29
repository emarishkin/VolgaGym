import { useState, type FC, type FormEvent } from "react";
import { Link } from "react-router-dom";
import '../styles/FormStyles.css';

interface BJUResult {
    belok: number;
    fat: number;
    yglivody: number;
    belokGRAM: number;
    fatGRAM: number;
    yglivodyGRAM: number;
}

export const BJUCalcFull: FC = () => {
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [age, setAge] = useState<number>(25);
    const [height, setHeight] = useState<number>(170);
    const [weight, setWeight] = useState<number>(70);
    const [activityLevel, setActivityLevel] = useState<number>(1.55);
    const [purpose, setPurpose] = useState<number>(1);
    const [isCalculating, setIsCalculating] = useState<boolean>(false);
    const [result, setResult] = useState<number | null>(null);
    const [bju, setBju] = useState<BJUResult | null>(null);

    const validateInputs = (): boolean => {
        return age > 0 && height > 0 && weight > 0;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        if (!validateInputs()) {
            alert("Пожалуйста, заполните все поля корректно");
            return;
        }

        setIsCalculating(true);

        setTimeout(() => {
            calculateResults();
            setIsCalculating(false);
        }, 500);
    };

    const calculateResults = () => {
        let metabolizm = 0;
        if (gender === 'male') {
            metabolizm = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else {
            metabolizm = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }

        const support = metabolizm * activityLevel;
        
        let finalCalories = support;
        if (purpose === 2) {
            finalCalories = support * 1.15;
        } else if (purpose === 3) {
            finalCalories = support * 0.85;
        }

        setResult(finalCalories);

        const proteinPerKg = purpose === 2 ? 2.2 : 1.8;
        const fatPercentage = purpose === 2 ? 0.85 : 0.55;

        const belokGRAM = proteinPerKg * weight;
        const belok = belokGRAM * 4;
        
        const fatGRAM = weight * fatPercentage;
        const fat = fatGRAM * 9
        
        const yglivody = finalCalories - belok - fat;
        const yglivodyGRAM = yglivody / 4;

        setBju({
            belok,
            fat,
            yglivody,
            belokGRAM,
            fatGRAM,
            yglivodyGRAM
        });
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h2 className="form-title">Калькулятор БЖУ</h2>

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

                <div className="input-group">
                    <label className="form-label">Цель</label>
                    <select
                        className="form-select"
                        value={purpose}
                        onChange={(e) => setPurpose(Number(e.target.value))}
                    >
                        <option value={1}>Поддержание веса</option>
                        <option value={2}>Набор массы</option>
                        <option value={3}>Похудение</option>
                    </select>
                </div>
                
                <button 
                    className="calculate-btn"
                    type="submit"
                    disabled={isCalculating}
                >
                    {isCalculating ? 'Расчет...' : 'Рассчитать'}
                </button>
                
                {result && bju && (
                    <div className="result-form">
                        <h3>Результаты:</h3>
                        <div className="calories-result">
                            <p>Рекомендуемая норма:</p>
                            <strong>{Math.round(result)} ккал/день</strong>
                        </div>
                        
                        <div className="macros-grid">
                            <div className="macro-item">
                                <h4>Белки</h4>
                                <p>{Math.round(bju.belokGRAM)} г</p>
                                <p>({Math.round(bju.belok)} ккал, {Math.round((bju.belok / result) * 100)}%)</p>
                            </div>
                            
                            <div className="macro-item">
                                <h4>Жиры</h4>
                                <p>{Math.round(bju.fatGRAM)} г</p>
                                <p>({Math.round(bju.fat)} ккал, {Math.round((bju.fat / result) * 100)}%)</p>
                            </div>
                            
                            <div className="macro-item">
                                <h4>Углеводы</h4>
                                <p>{Math.round(bju.yglivodyGRAM)} г</p>
                                <p>({Math.round(bju.yglivody)} ккал, {Math.round((bju.yglivody / result) * 100)}%)</p>
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
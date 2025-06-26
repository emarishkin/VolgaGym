import { useState, type FC, type FormEvent } from "react";
import { Link } from "react-router-dom";


export const BJUCalcFull:FC = () => {

    const [gender,setGender] = useState<'male' | 'female'>('male')
    const [age,setAge] = useState<number>(0)
    const [height,setHeight] = useState<number>(0)
    const [weight, setWeight] = useState<number>(0);
    const [activityLevel, setActivityLevel] = useState<number>(1.55);
    const [purpose,setPurpose] = useState<number>(1)

    const [result, setResult] = useState<number | null>(null);
    const [bju, setBju] = useState<{ belok: number; fat: number; yglivody: number } | null>(null)

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault()
        let metabolizm = 0
        if(gender==='male'){
            metabolizm = (weight*10)+(6.25*height)-(5*age)+5
        } else {
            metabolizm = (weight*10)+(6.25*height)-(5*age)-161
        } 
        
        const support = metabolizm*activityLevel
        const upMass = support * 1.15
        const lowMass = support * 0.85

        
        if(purpose===1){
            setResult(support)
        } else if (purpose===2) {
            setResult(upMass)
        } else {
            setResult(lowMass)
        }

        const belok = 2 * weight
        const fat = support * 0.25
        const yglivody = support - belok - fat

        setBju({
            belok,
            fat,
            yglivody
        })
    
    }


    return (
        <form onSubmit={handleSubmit}>
            <h2>Калькулятор суточной нормы калорий</h2>

            <div className="input-group">
                <select value={gender} onChange={(e)=>setGender(e.target.value as 'male' | 'female')}>
                    <option value={'male'}>Мужчина</option>
                    <option value={'female'}>Женщина</option>
                </select>
            </div>

            <div className="input-group">
                <label>Сколько вам лет?</label>
                <input
                type="number"
                value={age || ''} 
                onChange={(e)=>setAge(Number(e.target.value))}
                />
            </div>

            <div className="input-group">
                <label>Рост(см)</label>
                <input
                type="number"
                value={height || ''} 
                onChange={(e)=>setHeight(Number(e.target.value))}
                min="100"
                max="250"
                 />
            </div>

            <div className="input-group">
                <label>Вес(кг)</label>
                <input
                type="number"
                value={weight || ''} 
                onChange={(e)=>setWeight(Number(e.target.value))}
                min="30"
                max="200"
                />
                <span>кг</span>
            </div>
            
            <div className="input-group">
                <label>Уровень активности</label>
                <select value={activityLevel} onChange={(e)=>setActivityLevel(Number(e.target.value))}>
                    <option value={1.2}>Сидячий образ жизни (мало или нет тренировок)</option>
                    <option value={1.375}>Легкая активность (1-3 тренировки в неделю)</option>
                    <option value={1.55}>Умеренная активность (3-5 тренировок)</option>
                    <option value={1.725}>Высокая активность (6-7 тренировок)</option>
                    <option value={1.9}>Экстремальная активность (2+ тренировки в день)</option>
                </select>
            </div>

            <div className="input-group">
                <label>Цель</label>
                <select value={purpose} onChange={(e)=>setPurpose(Number(e.target.value))}>
                    <option value={1}>Поддержание</option>
                    <option value={2}>Набор мышечной массы</option>
                    <option value={3}>Поохудение</option>
                </select>
            </div>
            
            <button type="submit">Рассчитать</button>
            
            {result && bju && (
                <div className="result-form">
                    <h2>Результат</h2>
                    {Math.round(result)} ккал/день
                    <h3>Рекомендуемое БЖУ:</h3>
                    <p>Белки: {Math.round(bju.belok)} г</p>
                    <p>Жиры: {Math.round(bju.fat)} г</p>
                    <p>Углеводы: {Math.round(bju.yglivody)} г</p>
                </div>
            )}
            
            <Link to='/calc'>
               ← Вернуться к калькуляторам
            </Link>

        </form>
    )
}
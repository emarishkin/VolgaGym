import { useState, type FC, type FormEvent } from "react";
import { Link } from "react-router-dom";
import '../styles/CaloriesCalculator.css'

export const CaloriesCalculator:FC = () => {

    const [gender,setGender] = useState<'male' | 'female'>('male')
    const [age,setAge] = useState<number>(0)
    const [height,setHeight] = useState<number>(0)
    const [weight, setWeight] = useState<number>(0);
    const [activityLevel, setActivityLevel] = useState<number>(1.55);

    const [result, setResult] = useState<{ bmr: number; tde: number; low: number; high:number } | null>(null);
    
    const handleSubmit = (e:FormEvent) => {
        e.preventDefault()
        let bmr //(метаболизм)
        if(gender==='male'){
            bmr = (10*weight)+(6.25*height)-(5*age)+5
        } else {
            bmr = (10*weight)+(6.25*height)-(5*age)-161
        }
        const tde = bmr*activityLevel //поддержание веса
        const low = tde * 0.85 //снижение веса
        const high = tde * 1.25 //набор веса
        
        setResult({
           bmr: Math.round(bmr),
           tde: Math.round(tde),
           low: Math.round(low),
           high: Math.round(high)
        })


    }


    return (
        <form onSubmit={handleSubmit}>
            <h2>Калькулятор суточной нормы калорий</h2>

            <div className="input-group">
                <label>Мужчина</label>
                <input
                type="checkbox"
                value={gender}
                onChange={()=>setGender('male')}
                />

                <label>Женщина</label>
                <input
                type="checkbox"
                value={gender}
                onChange={()=>setGender('female')}
                />
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
            
            <button type="submit">Рассчитать</button>
            
            {result && (
                <div className="result-form">
                    <h2>Результат</h2>
                    <div className="res-full">
                        <h3>Баззовый метаболизм</h3>
                        {result.bmr}<span>ккал/день</span>
                    </div>
                    <div className="res-full">
                        <h3>Снижение веса</h3>
                        {result.low}<span>ккал/день</span>
                    </div>
                    <div className="res-full">
                        <h3>Поддержание веса</h3>
                        {result.tde}<span>ккал/день</span>
                    </div>
                    <div className="res-full">
                        <h3>Набор Веса</h3>
                        {result.high}<span>ккал/день</span>
                    </div>
                </div>
            )}
            
            <Link to='/calc'>
               ← Вернуться к калькуляторам
            </Link>

        </form>
    )
}
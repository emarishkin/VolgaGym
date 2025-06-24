import { useState, type FC, type FormEvent } from "react";
import { Link } from "react-router-dom";

export const BelokCalculator:FC = () => {

    const [gender,setGender] = useState<'male'|'female'|'не выбрано'>('не выбрано')
    const [weight,setWeight] = useState<number>(70)
    const [activity,setActivity] = useState<number>(1.55)
    const [result,setResult] = useState<number | null>(null)

    const handleSubmit = (e:FormEvent) => {
       e.preventDefault()
       let normaBelka
       if(weight<=0||gender==='не выбрано')return alert('Заполните все поля')
       if(gender==='male'){
          normaBelka=weight*activity
       } else {
          normaBelka=weight*activity-50
       }
       setResult(normaBelka)
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Расссчет суточной нормы белка</h2>
            <div>
                <div>
                    <label>Пол:</label>
                    <select value={gender} onChange={(e)=>setGender(e.target.value as 'male' | 'female' | 'не выбрано')}>
                        <option value={'не выбрано'}>не выбрано</option>
                        <option value={'male'}>Мужчина</option>
                        <option value={'female'}>Женщина</option>
                    </select>
                </div>
            </div>

            <div>
                <label>Вес:</label>
                <input 
                type="number"
                value={weight || ''} 
                onChange={(e)=>setWeight(Number(e.target.value))}
                />
            </div>
            
            <div>
                <label>Коэффициенты физической активности:</label>
                <select value={activity} onChange={(e)=>setActivity(Number(e.target.value))}>
                    <option value={0.9}>Сидячий образ жизни (мало или нет тренировок)</option>
                    <option value={1.1}>Легкая активность (1-3 тренировки в неделю)</option>
                    <option value={1.55}>Умеренная активность (3-5 тренировок)</option>
                    <option value={1.925}>Высокая активность (6-7 тренировок)</option>
                    <option value={2.1}>Экстремальная активность (2+ тренировки в день)</option>
                </select>
            </div>

            <button type="submit">Рассчитать</button>

            {result && (
                <div>
                    <p>{`Ваша суточная норма белка ${result}`}</p>
                </div>
            )}

            <Link to='/calc'>
                ← Вернуться к калькуляторам
            </Link>
        </form>
    )
}
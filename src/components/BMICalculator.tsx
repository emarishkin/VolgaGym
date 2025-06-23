import { useState, type FC, type FormEvent } from "react";
import '../styles/BMICalculator.css'

export const BMICalculator:FC = () => {

    const [height,setHeight] = useState<number>(0)
    const [weight,setWeight] = useState<number>(0)
    const [bmi,setBmi] = useState<number | null>(null)
    
    const handleSubmit = (e:FormEvent) => {
        e.preventDefault()
        if(height>0 && weight>0){
            const heightNorm = height/100
            const res = weight/(heightNorm*heightNorm)
            setBmi(Number(res.toFixed(1)))
        }
    }
    
    const HandleCategory = () => {
        if(!bmi) return ''
        if (bmi < 18.5) return 'Недостаточный вес';
        if (bmi < 25) return 'Нормальный вес';
        if (bmi < 30) return 'Избыточный вес';
        return 'Ожирение';
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Калькулятор ИМТ</h2>

            <div className="input-group">
                <label>Введите рост(см)</label>
                <input
                type="number" 
                value={height || ''}
                onChange={(e)=>setHeight(Number(e.target.value))}
                />
            </div>

            <div className="input-group">
                <label>Введите вес(кг)</label>
                <input
                type="number" 
                value={weight || ''}
                onChange={(e)=>setWeight(Number(e.target.value))}
                />
            </div>

            <button type="submit">Рассчитать</button>

            {bmi && (
                <div className="result-bmi">
                    <h3>Ваш ИМТ: {bmi}</h3>
                    <h3>Категория:{HandleCategory()}</h3>
                </div>
            )}
        </form>
    )
}
import { useState, type FC, type FormEvent } from "react";

export const BACCalc:FC = () => {

    const [gender,setGender] = useState<'male'|'female'>('male')//в мл
    const [volume,setVolume] = useState<number>(200)//в мл
    const [strength,setStrength ] = useState<number>(0.08)//в процентах
    const [weight,setWeight] = useState<number>(200)//в кг
    const [time,setTime] = useState<number>(1)//в часах
    const [result,setResult] = useState<number | null>(null)
    
    const handleSubmit = (e:FormEvent) => {
      e.preventDefault()
      let BAC = 0
      let massAlco = volume * strength * 0.8
      if(gender==='male'){
        BAC = massAlco/(weight*0.68)-(0.15*time)
      } else {
        BAC = massAlco/(weight*0.55)-(0.15*time)
      }
      setResult(BAC)

    }

    return(
        <form onSubmit={handleSubmit}>
            <h2>Калькулятор содержания алкоголя в крови</h2>
            <div>
                <select value={gender} onChange={(e)=>setGender(e.target.value as 'male' | 'female')}>
                    <option value={'male'}>Мужчина</option>
                    <option value={'female'}>Женщина</option>
                </select>    
            </div>

            <div>
                <label>Напиток(крепость в %)</label>
                <select value={strength} onChange={(e)=>setStrength(Number(e.target.value))}>
                    <option value={0.08}>Пиво</option>
                    <option value={0.15}>Вино</option>
                    <option value={0.12}>Шампанское</option>
                    <option value={0.4}>Водка</option>
                    <option value={0.5}>Виски</option>
                    <option value={0.7}>Абсент</option>
                    <option value={0.42}>Коньяк</option>
                </select>
            </div>

            <div>
                <label>Объем(мл)</label>
                <input
                value={volume}
                onChange={(e)=>setVolume(Number(e.target.value))}
                />
            </div>

            <div>
                <label>Ваш вес(кг)</label>
                <input
                value={weight}
                onChange={(e)=>setWeight(Number(e.target.value))}
                />
            </div>

            <div>
                <label>Время с последнего приема(часы)</label>
                <input
                value={time}
                onChange={(e)=>setTime(Number(e.target.value))}
                />
            </div>

            <button type="submit">Рассчитать</button>

            {result && (
                <div>
                    <h2>Результат: {result.toFixed(2)}%</h2>
                    <p>{result >= 0.2 && result <= 0.49?'Нулевая степень':
                        result >= 0.5 && result <= 1.5?'Легкая степень':
                        result >= 1.51 && result <= 2.5?'Средняя степень':
                        'Тяжелая степень'
                    }</p>
                    <p style={{fontWeight:'bold'}}>{result<=0.3?'За руль можно':'За руль нельзя'}</p>
                </div>
            )}

        </form>
    )
}
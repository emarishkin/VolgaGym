import { useState, type ChangeEvent, type FC, type FormEvent } from "react";

interface FormTypes {
gender:'male'|'female',
age:number,
height:number,
weigth:number,
stepsInDay:number,
timeCardio:number,
timeStrong:number,
activnosty:number,
purpose:'weight loss'| 'weight maintenance' | 'muscle weight gain',
diseases:'No' | 'Hypothyroidism' | 'Leptin resistance/Insulin resistance' | 'Deficiencies in sex hormones and various active compensatory mechanisms' | 'endocrine disorders',
level:'amateur'|'professional'
}


export const MainCalculate:FC = () => {

    const [form,setForm] = useState<FormTypes>({
        gender:'male',
        age:20,
        height:170,
        weigth:70,
        stepsInDay:2500,
        timeCardio:20,
        timeStrong:180,
        activnosty:1.55,
        purpose:'weight loss',
        diseases:'No',
        level:'amateur'
    })

    const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({...form,[e.target.name]:e.target.value})
    }
     
    const handleSubmit = (e:FormEvent) => {
        e.preventDefault()
        
        function IMT(weight:number,height:number){
            const hMetr = height/100
         const imt = weight / hMetr**2
         return imt
        }
        function IdealWeight(height:number){
         const ideal = height - 100 - ((height-150)/4)
         return ideal
        }
        const ResultIMT = IMT(form.weigth,form.height)
        const ResultIdealWeight = IdealWeight(form.height)
        console.log(ResultIMT.toFixed(1))
        console.log(ResultIdealWeight)
    }




    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Пол</label>
                <select name="gender" value={form.gender} onChange={handleChange}>
                    <option value="male">Мужчина</option>
                    <option value="female">Женщина</option>
                </select>         
            </div>

            <div>
                <label>Возраст</label>
                <input name="age" value={form.age} onChange={handleChange}/>
            </div>

            <div>
                <label>Рост(см)</label>
                <input name="height" value={form.height} onChange={handleChange}/>
            </div>

            <div>
                <label>Вес(кг)</label>
                <input name="weigth" value={form.weigth} onChange={handleChange}/>
            </div>

            <div>
                <label>Количество шагов в день</label>
                <input name="stepsInDay" value={form.stepsInDay} onChange={handleChange}/>
            </div>

            <div>
                <label>Кардио тренировки(время в минутах)</label>
                <input name="timeCardio" value={form.timeCardio} onChange={handleChange}/>
            </div>

            <div>
                <label>Силовые тренировки(время в минутах)</label>
                <input name="timeStrong" value={form.timeStrong} onChange={handleChange}/>
            </div>
            
            <div className="input-group">
                <label className="form-label">Уровень активности</label>
                <select name="activnosty" value={form.activnosty} onChange={handleChange}>
                    <option value={1.2}>Сидячий образ жизни</option>
                    <option value={1.375}>Легкая активность</option>
                    <option value={1.55}>Умеренная активность</option>
                    <option value={1.725}>Высокая активность</option>
                    <option value={1.9}>Экстремальная активность</option>
                </select>
            </div>

            <div>
                <label>Цель</label>
                <select name="purpose" value={form.purpose} onChange={handleChange}>
                    <option value="weight loss">Похудение</option>
                    <option value="weight maintenance">Сохранение веса / Рекомпозиция</option>
                    <option value="muscle weight gain">Набор веса / мышечной массы</option>
                </select>         
            </div>

            <div>
                <label>Есть ли у вас гормональные нарушения?</label>
                <select name="diseases" value={form.diseases} onChange={handleChange}>
                    <option value="No">Нет / Никогда не сдавал анализы</option>
                    <option value="Hypothyroidism">Гипотиреоз</option>
                    <option value="Leptin resistance/Insulin resistance">Лептинорезистентность/Инсулинорезистентность</option>
                    <option value="Deficiencies in sex hormones and various active compensatory mechanisms">Дефициты половых гормонов и различные активные компенсаторные механизмы</option>
                    <option value="endocrine disorders">Различные эндокринные нарушения</option>
                </select>         
            </div>
            
            <div>
                <label>Ваш уровень</label>
                <select name="level" value={form.level} onChange={handleChange}>
                    <option value="amateur">Любительский</option>
                    <option value="professional">Профессиональный / выступающий спортсмен</option>
                </select>         
            </div>
            
            <button type="submit">Рассчитать</button>

        </form>
    )
}
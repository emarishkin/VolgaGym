import { useState, type ChangeEvent, type FC } from "react";

interface Iform{
  name:string
  warmUp:number
  exercise:string
  weigth:number
  reps:number 
  sets:number   
}

export const MyProgram:FC = () => {

    const [form,setForm] = useState<Iform>({
       name:'',
       warmUp:5,
       exercise:'штанга на бицепс',
       weigth:50,
       reps:3,
       sets:8
    })
    
    const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = e.target.type === 'number'?Number(e.target.value):e.target.value
        setForm({...form,[e.target.name]:value})
    }

    return (
        <div>
            <h2>Создание тренировочного дня</h2>
            <form>
                <div>
                    <label>Название вашей тренировки</label>
                    <input 
                    type="text" 
                    name="name"
                    value={form.name}
                    placeholder="Например: Спина/Плечи/Трицепс или Верх/Низ"
                    onChange={handleChange}
                    required
                    />
                </div>

                <div>
                    <label>Разминка</label>
                    <select name="warm-up" value={form.warmUp} onChange={handleChange} required>
                        <option value="">2</option>
                        <option value="">5</option>
                        <option value="">10</option>
                        <option value="">15</option>
                    </select>
                </div>

                <div>
                    <h3>1-Упражнение</h3>
                    <div>
                        <label>Упражнение</label>
                        <select name="exercise" value={form.exercise} onChange={handleChange} required>
                            <option value="">Жим штанги</option>
                            <option value="">Приседания со штангой на плечах</option>
                            <option value="">Тяга верхнего блока</option>
                            <option value="">Сгибание рук на бицепс с гантелью</option>
                            <option value="">Отжимания</option>
                            <option value="">Французский жим</option>
                            <option value="">Разгибание</option>
                            <option value="myExercise">Напишите свое упражнение</option>
                            {/* {if (value==='myExercise') <input type="text" onChange={handleChange} />} */}
                        </select>
                    </div>

                    <div>
                        <label>Вес</label>
                        <input 
                        type="number" 
                        name="weigth"
                        value={form.weigth}
                        onChange={handleChange}
                        required
                        />
                    </div>

                    <div>
                        <label>Подходы</label>
                        <select name="reps" value={form.reps} onChange={handleChange} >
                            <option value="">1</option>
                            <option value="">2</option>
                            <option value="">3</option>
                            <option value="">4</option>
                            <option value="">5</option>
                        </select>
                    </div>
                    
                    <div>
                        <label>Повторения</label>
                        <select name="sets" value={form.sets} onChange={handleChange} >
                            {Array.from({length: 30}, (_, i) => (
                                <option key={i} value={i}>{i}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </form>
        </div>
    )
}
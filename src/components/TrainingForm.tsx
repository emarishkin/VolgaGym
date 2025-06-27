import { useState, type ChangeEvent, type FC, type FormEvent } from "react";
import type { WorkoutEntry } from "../types/WorkoutEntry";


interface TrainingFormProps{
onSubmit:(entry:WorkoutEntry)=>void
}

export const TrainingForm:FC<TrainingFormProps> = ({onSubmit}) => {

    const [form,setForm] = useState({
        date:new Date().toISOString().split('T')[0],
        user:'не выбрано',
        exercise: 'Не выбрано',
        weight:'',
        sets:0,
        reps:0,
        duration:0
    })
    
    const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        return setForm({...form,[e.target.name]:e.target.value})
    }
     
    const handleSubmit = (e:FormEvent) => {
        e.preventDefault()

        if(!form.user || !form.exercise || !form.weight || !form.date || !form.reps || !form.sets){
            alert('Заполните все поля')
            return
        }

        const newEntry:WorkoutEntry = {
            id:Date.now().toString(),
            date:form.date,
            user:form.user as 'Не выбрано' | 'Егор' | 'Сергей' | 'Роман' | 'Слава' | 'Руслан',
            exercise: form.exercise as 'Не выбрано' | 'Жим лежа' | 'Жим на наклонной скамье' | 'Штанга на бицепс' | 'Французкий жим' | 'Приседания' | 'Становая тяга' | 'Средняя дельта' | 'Бабочка(грудь)' | 'Подтягивания на турнике',
            weight: Number(form.weight),
            sets: form.sets as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 ,
            reps: form.reps as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20,
            duration: form.duration as 0 | 1 | 2 | 3 | 4 
        }
        onSubmit(newEntry)
        alert(`Запись сохранена. Данные: Имя:${form.user}, упражнение: ${form.exercise}, вес: ${form.weight}, повторения: ${form.reps}`)

        setForm({
            date: new Date().toISOString().split('T')[0],
            user: 'не выбрано',
            exercise: 'Не выбрано',
            weight: '',
            sets: 0,
            reps: 0,
            duration: 0
        });
    }



return(
    <form className="workout-form" onSubmit={handleSubmit}>
            <h2 className="workout-form__title">Новая тренировка</h2>
            
            <div className="form-group">
                <label className="form-label">
                    Дата:
                    <input className="form-input" name="date" type="date" value={form.date} onChange={handleChange} required />
                </label>
            </div>

            <div className="form-group">
                <label className="form-label">
                    Кто:
                    <select className="form-select" name="user" value={form.user} onChange={handleChange}>
                        <option value="Не выбрано">Не выбрано</option>
                        <option value="Егор">Егор</option>
                        <option value="Сергей">Сергей</option>
                        <option value="Роман">Роман</option>
                        <option value="Слава">Слава</option>
                        <option value="Руслан">Руслан</option>
                    </select>
                </label>
            </div>

            <div className="form-group">
                <label className="form-label">
                    Упражнение:
                    <select className="form-select" name="exercise" value={form.exercise} onChange={handleChange}>
                        <option value="Не выбрано">Не выбрано</option>
                        <option value="Жим лежа">Жим лежа</option>
                        <option value="Жим на наклонной скамье">Жим на наклонной скамье</option>
                        <option value="Штанга на бицепс">Штанга на бицепс</option>
                        <option value="Французкий жим">Французкий жим</option>
                        <option value="Приседания">Приседания</option>
                        <option value="Становая тяга">Становая тяга</option>
                        <option value="Средняя дельта">Средняя дельта</option>
                        <option value="Бабочка(грудь)">Бабочка(грудь)</option>
                        <option value="Подтягивания на турнике">Подтягивания на турнике</option>
                    </select>
                </label>
            </div>

            <div className="form-group">
                <label className="form-label">
                    Вес (кг):
                    <input className="form-input" name="weight" type="number" value={form.weight} onChange={handleChange} min="0" step="0.5" />
                </label>
            </div>
            
            <div className="form-group">
                <label className="form-label">
                    Подходы:
                    <select className="form-select" name="sets" value={form.sets} onChange={handleChange}>
                        {Array.from({length: 8}, (_, i) => (
                            <option key={i} value={i}>{i}</option>
                        ))}
                    </select>
                </label>
            </div>

            <div className="form-group">
                <label className="form-label">
                    Повторения:
                    <select className="form-select" name="reps" value={form.reps} onChange={handleChange}>
                        {Array.from({length: 21}, (_, i) => (
                            <option key={i} value={i}>{i}</option>
                        ))}
                    </select>
                </label>
            </div>

            <div className="form-group">
                <label className="form-label">
                    Время на упражнении (мин):
                    <select className="form-select" name="duration" value={form.duration} onChange={handleChange}>
                        <option value="Не выбрано">Не выбрано</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="30">30</option>
                        <option value="35">35</option>
                        <option value="40">40</option>
                    </select>
                </label>
            </div>

            <button className="form-submit" type="submit">Добавить тренировку</button>
    </form>
)
}
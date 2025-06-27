import { useState, type ChangeEvent, type FC, type FormEvent } from "react";

interface FormTypes {
  gender: 'male' | 'female';
  age: number;
  height: number;
  weight: number; // Исправлено
  stepsInDay: number;
  timeCardio: number;
  timeStrong: number;
  activity: number; // Исправлено
  purpose: 'weight loss' | 'weight maintenance' | 'muscle weight gain';
  diseases: 'No' | 'Hypothyroidism' | 'Leptin resistance/Insulin resistance' | 'Deficiencies in sex hormones and various active compensatory mechanisms' | 'endocrine disorders';
  level: 'amateur' | 'professional';
}

export const MainCalculate: FC = () => {
  const [form, setForm] = useState<FormTypes>({
    gender: 'male',
    age: 20,
    height: 170,
    weight: 70, // Исправлено
    stepsInDay: 2500,
    timeCardio: 20,
    timeStrong: 180,
    activity: 1.55, // Исправлено
    purpose: 'weight loss',
    diseases: 'No',
    level: 'amateur'
  });

  const [result, setResult] = useState<{
    ResultIMT: number;
    ResultIdealWeight: number;
    ResultMetabolism: number;
    ResultTDEE: number;
    ResultPURPOSE: number;
  } | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    function IMT(weight: number, height: number) {
      const hMetr = height / 100;
      const imt = weight / hMetr ** 2;
      return imt;
    }

    function IdealWeight(height: number) {
      const ideal = height - 100 - ((height - 150) / 4);
      return ideal;
    }

    function MetaBolism(weight: number, height: number, age: number, gender: 'male' | 'female') {
      let metabolism = 0;
      if (gender === 'male') {
        metabolism = 10 * weight + 6.25 * height - 5 * age + 5;
      } else {
        metabolism = 10 * weight + 6.25 * height - 5 * age - 161;
      }
      return metabolism;
    }

    function TDEE(metabolism: number, activity: number) {
      const tdee = metabolism * activity;
      return tdee;
    }

    function Purpose(tdee: number, purpose: string) {
      let ResultPurpose;
      if (purpose === 'weight loss') {
        ResultPurpose = tdee * 0.85;
      } else if (purpose === 'weight maintenance') {
        ResultPurpose = tdee;
      } else {
        ResultPurpose = tdee * 1.15;
      }
      return ResultPurpose;
    }

    const ResultMetabolism = MetaBolism(form.weight, form.height, form.age, form.gender);
    const ResultTDEE = TDEE(ResultMetabolism, form.activity);
    const ResultIMT = IMT(form.weight, form.height);
    const ResultIdealWeight = IdealWeight(form.height);
    const ResultPURPOSE = Purpose(ResultTDEE, form.purpose);

    setResult({
      ResultIMT,
      ResultIdealWeight,
      ResultMetabolism,
      ResultTDEE,
      ResultPURPOSE
    });
  };




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
                <input name="weigth" value={form.weight} onChange={handleChange}/>
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
                <select name="activnosty" value={form.activity} onChange={handleChange}>
                    <option value={1.2}>Сидячий образ жизни(не занимаюсь в зале,максимальная активность 1500 шагов в день)</option>
                    <option value={1.375}>Легкая активность(1–3 тренировки/неделю или 1500-2500 шагов в день)</option>
                    <option value={1.55}>Умеренная активность(3–5 тренировок, возможно немного кардио, 3000 шагов в день)</option>
                    <option value={1.725}>Высокая активность(6–7 тренировок)</option>
                    <option value={2.1}>Экстремальная активность(Профессиональный / выступающий спортсмен)</option>
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
            
            {result && (
                <div>
                    <p>Ваш ИМТ: {result.ResultIMT.toFixed(1)}</p>
                    <p>Ваш оптимальный(идеальный) вес: {result.ResultIdealWeight.toFixed(1)}</p>
                    <p>Ваша дневная калорийность составит: {result.ResultPURPOSE.toFixed(0)}</p>
                </div>
            )}

        </form>
    )
}
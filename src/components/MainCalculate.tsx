import { useState, type ChangeEvent, type FC, type FormEvent } from "react";
import '../styles/FormStyles.css'

interface FormTypes {
  gender: 'male' | 'female';
  age: number;
  height: number;
  weight: number; 
  stepsInDay: number;
  timeCardio: number;
  timeStrong: number;
  activity: number; 
  purpose: 'weight loss' | 'weight maintenance' | 'muscle weight gain';
  diseases: 'No' | 'Hypothyroidism' | 'Leptin resistance/Insulin resistance' | 'Deficiencies in sex hormones and various active compensatory mechanisms' | 'endocrine disorders';
  level: 'amateur' | 'professional';
}

export const MainCalculate:FC = () => {
  const [form, setForm] = useState<FormTypes>({
    gender: 'male',
    age: 20,
    height: 170,
    weight: 70, 
    stepsInDay: 2500,
    timeCardio: 20,
    timeStrong: 180,
    activity: 1.55, 
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
    ResultBJU: {
      belok: number;
      fat: number;
      yglivody: number;
    };
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

    function BJU(weight: number, level: string, purpose: string) {
      let belok = 0;
      let fat = 0;
      let yglivody = 0;
      
      if (purpose === 'muscle weight gain') {
        belok = level === 'professional' ? weight * 2.2 : weight * 1.8;
      } else if (purpose === 'weight loss') {
        belok = weight * 2.0;
      } else { 
        belok = weight * 1.6;
      }
      
      if (purpose === 'weight loss') {
        fat = weight * 0.45;
      } else if (purpose === 'weight maintenance') {
        fat = weight * 0.65;
      } else if (purpose === 'muscle weight gain') {
        fat = weight * 1;
      }
      
      if (purpose === 'muscle weight gain') {
        yglivody = weight * 4;
      } else if (purpose === 'weight maintenance') {
        yglivody = weight * 3.5;
      } else if (purpose === 'weight loss') {
        yglivody = weight * 3;
      } 
      return { belok, fat, yglivody };
    }

    const ResultMetabolism = MetaBolism(form.weight, form.height, form.age, form.gender);
    const ResultTDEE = TDEE(ResultMetabolism, form.activity);
    const ResultIMT = IMT(form.weight, form.height);
    const ResultIdealWeight = IdealWeight(form.height);
    const ResultPURPOSE = Purpose(ResultTDEE, form.purpose);
    const ResultBJU = BJU(form.weight, form.level, form.purpose);

    setResult({
      ResultIMT,
      ResultIdealWeight,
      ResultMetabolism,
      ResultTDEE,
      ResultPURPOSE,
      ResultBJU
    });
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Калькулятор питания и тренировок</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="form-label">Пол</label>
          <select 
            name="gender" 
            value={form.gender} 
            onChange={handleChange}
            className="form-select"
          >
            <option value="male">Мужчина</option>
            <option value="female">Женщина</option>
          </select>         
        </div>

        <div className="input-group">
          <label className="form-label">Возраст</label>
          <input 
            name="age" 
            type="number"
            value={form.age} 
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="input-group">
          <label className="form-label">Рост (см)</label>
          <input 
            name="height" 
            type="number"
            value={form.height} 
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="input-group">
          <label className="form-label">Вес (кг)</label>
          <input 
            name="weight" 
            type="number"
            value={form.weight || ''} 
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="input-group">
          <label className="form-label">Количество шагов в день</label>
          <input 
            name="stepsInDay" 
            type="number"
            value={form.stepsInDay} 
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="input-group">
          <label className="form-label">Кардио тренировки (время в минутах)</label>
          <input 
            name="timeCardio" 
            type="number"
            value={form.timeCardio} 
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="input-group">
          <label className="form-label">Силовые тренировки (время в минутах)</label>
          <input 
            name="timeStrong" 
            type="number"
            value={form.timeStrong} 
            onChange={handleChange}
            className="form-input"
          />
        </div>
        
        <div className="input-group">
          <label className="form-label">Уровень активности</label>
          <select 
            name="activity" 
            value={form.activity} 
            onChange={handleChange}
            className="form-select"
          >
            <option value={1.2}>Сидячий образ жизни (не занимаюсь в зале, максимальная активность 1500 шагов в день)</option>
            <option value={1.375}>Легкая активность (1–3 тренировки/неделю или 1500-2500 шагов в день)</option>
            <option value={1.55}>Умеренная активность (3–5 тренировок, возможно немного кардио, 3000 шагов в день)</option>
            <option value={1.725}>Высокая активность (6–7 тренировок)</option>
            <option value={2.1}>Экстремальная активность (Профессиональный / выступающий спортсмен)</option>
          </select>
        </div>

        <div className="input-group">
          <label className="form-label">Цель</label>
          <select 
            name="purpose" 
            value={form.purpose} 
            onChange={handleChange}
            className="form-select"
          >
            <option value="weight loss">Похудение</option>
            <option value="weight maintenance">Сохранение веса / Рекомпозиция</option>
            <option value="muscle weight gain">Набор веса / мышечной массы</option>
          </select>         
        </div>

        <div className="input-group">
          <label className="form-label">Есть ли у вас гормональные нарушения?</label>
          <select 
            name="diseases" 
            value={form.diseases} 
            onChange={handleChange}
            className="form-select"
          >
            <option value="No">Нет / Никогда не сдавал анализы</option>
            <option value="Hypothyroidism">Гипотиреоз</option>
            <option value="Leptin resistance/Insulin resistance">Лептинорезистентность/Инсулинорезистентность</option>
            <option value="Deficiencies in sex hormones and various active compensatory mechanisms">Дефициты половых гормонов и различные активные компенсаторные механизмы</option>
            <option value="endocrine disorders">Различные эндокринные нарушения</option>
          </select>         
        </div>
        
        <div className="input-group">
          <label className="form-label">Ваш уровень</label>
          <select 
            name="level" 
            value={form.level} 
            onChange={handleChange}
            className="form-select"
          >
            <option value="amateur">Любительский</option>
            <option value="professional">Профессиональный / выступающий спортсмен</option>
          </select>         
        </div>
        
        <button type="submit" className="calculate-btn">Рассчитать</button>
        
        {result && (
          <div className="result-form">
            <h2>Результаты расчета</h2>
            
            <div className="macro-item">
              <h4>Индекс массы тела</h4>
              <p className="result-value">{result.ResultIMT.toFixed(1)}</p>
            </div>
            
            <div className="macro-item">
              <h4>Оптимальный вес</h4>
              <p className="result-value">{result.ResultIdealWeight.toFixed(1)} кг</p>
            </div>
            
            <div className="macro-item">
              <h4>Рекомендуемая калорийность</h4>
              <p className="result-value">{result.ResultPURPOSE.toFixed(0)} ккал</p>
            </div>
            
            <h3>Рекомендации по БЖУ:</h3>
            <div className="macros-grid">
              <div className="macro-item">
                <h4>Белки</h4>
                <p className="result-value">{result.ResultBJU.belok.toFixed(1)} г</p>
              </div>
              <div className="macro-item">
                <h4>Жиры</h4>
                <p className="result-value">{result.ResultBJU.fat.toFixed(1)} г</p>
              </div>
              <div className="macro-item">
                <h4>Углеводы</h4>
                <p className="result-value">{result.ResultBJU.yglivody.toFixed(1)} г</p>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
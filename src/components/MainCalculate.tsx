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
    purpose: 'weight loss',
    diseases: 'No',
    level: 'amateur'
  });

  const [result, setResult] = useState<{
    ResultIMT: number;
    ResultIdealWeight: number;
    ResultMetabolism: number;
    ResultActivnosty:number
    ResultTDEE:number
    ResultBJU:{
      belok:number
      fat:number
      yglivody:number
    }
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

    function IdealWeight(height: number, gender: 'male' | 'female') {
      if (gender === 'male') {
        return 50 + 0.91 * (height - 152.4); 
      } else {
        return 45.5 + 0.91 * (height - 152.4);
      }
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
    
    function Activnosty(stepsInDay:number,timeCardio:number,timeStrong:number,level:string){
      let activ = 1.2
      if(stepsInDay>=5000) activ=1.275
      else if(stepsInDay>=8000) activ=1.45
      else if(stepsInDay>=12000) activ=1.65
      
      const cardioBoost = Math.min(timeCardio / 2000, 0.2)
      activ+=cardioBoost

      const strongBoost = Math.min(timeStrong / 2000, 0.2);
      activ+=strongBoost

      if (level === 'professional') activ *= 1.125  ;

      return Math.min(Math.max(activ, 1.2), 2);
    }
    function TDEE(ResultActivnosty:number,ResultMetabolism:number,purpose:string){
      let resultTDEE = ResultActivnosty*ResultMetabolism
      if(purpose==='muscle weight gain'){
        resultTDEE = resultTDEE * 1.15
      } else if(purpose==='weight loss'){
        resultTDEE = resultTDEE * 0.85
      } else {
        resultTDEE = resultTDEE
      }
      return resultTDEE
    }
    function BJU(weight:number,level:string,purpose:string,ResultTDEE:number){
      let belok = 0
      let fat = 0
      let yglivody = 0

      if(purpose==='muscle weight gain'){
        belok = level === 'professional'?weight*2.2:weight*1.7
      } else if (purpose==='weight loss') {
        belok = level === 'professional'?weight*2.2:weight*1.7
      } else {
        belok = weight*2
      }
      
      if(purpose==='muscle weight gain'){
        fat = level === 'professional'?weight*0.85:weight*1
      } else if (purpose==='weight loss') {
        fat = level === 'professional'?weight*0.5:weight*0.73
      } else {
        fat = weight*0.75
      }

      yglivody = (ResultTDEE - (belok*4) - (fat*9))/4

      return {belok,fat,yglivody}
    }

    const ResultMetabolism = MetaBolism(form.weight, form.height, form.age, form.gender);
    const ResultIMT = IMT(form.weight, form.height);
    const ResultIdealWeight = IdealWeight(form.height,form.gender);
    const ResultActivnosty = Activnosty(form.stepsInDay,form.timeCardio,form.timeStrong,form.level);
    const ResultTDEE = TDEE(ResultActivnosty,ResultMetabolism,form.purpose);
    const ResultBJU = BJU(form.weight,form.level,form.purpose,ResultTDEE);

    setResult({
      ResultIMT,
      ResultIdealWeight,
      ResultMetabolism,
      ResultActivnosty,
      ResultTDEE,
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
            value={form.age || ''} 
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="input-group">
          <label className="form-label">Рост (см)</label>
          <input 
            name="height" 
            type="number"
            value={form.height || ''} 
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
            value={form.stepsInDay || ''} 
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="input-group">
          <label className="form-label">Кардио тренировки (время в минутах)</label>
          <input 
            name="timeCardio" 
            type="number"
            value={form.timeCardio || ''} 
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="input-group">
          <label className="form-label">Силовые тренировки (время в минутах)</label>
          <input 
            name="timeStrong" 
            type="number"
            value={form.timeStrong || ''} 
            onChange={handleChange}
            className="form-input"
          />
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
              <p className="result-text">
                {result.ResultIMT < 18.5 ? 'Недостаточный вес' : 
                 result.ResultIMT < 25 ? 'Нормальный вес' : 
                 result.ResultIMT < 30 ? 'Избыточный вес' : 'Ожирение'}
              </p>
            </div>
            
            <div className="macro-item">
              <h4>Оптимальный вес</h4>
              <p className="result-value">{result.ResultIdealWeight.toFixed(1)} кг</p>
            </div>
            
            <div className="macro-item">
              <h4>Рекомендуемая калорийность</h4>
              <p className="result-value">{result.ResultTDEE.toFixed(1)} ккал</p>
            </div>
            
            <h3>Рекомендации по БЖУ:</h3>
            <div className="macros-grid">
              <div className="macro-item">
                <h4>Белки</h4>
                <p className="result-value">{result.ResultBJU.belok.toFixed(0)} г</p>
              </div>
              <div className="macro-item">
                <h4>Жиры</h4>
                <p className="result-value">{result.ResultBJU.fat.toFixed(0)} г</p>
              </div>
              <div className="macro-item">
                <h4>Углеводы</h4>
                <p className="result-value">{result.ResultBJU.yglivody.toFixed(0)} г</p>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
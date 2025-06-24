import { useState, type FC, type FormEvent } from "react";
import '../styles/PM1Calculator.css'
import { Link } from "react-router-dom";

export const PM1Calculator:FC = () => {
    
    const [weight,setWeight] = useState<number>(0);
    const [reps,setReps] = useState<number>(0);
    const [result,setResult] = useState<{FormulaEply:number,FormulaBR:number,FormulaLen:number,averange:number} | null>(null);
    
    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();
        if(weight <= 0 || reps <= 0){
          return alert('введите корректные данные');
        } 

        const FormulaEply = (weight*reps)/30+weight;
        const FormulaBR = weight*(36/(37-reps));
        const FormulaLen = (100*weight)/(101.3-2.67123*reps);
        const averange = (FormulaEply+FormulaBR+FormulaLen)/3;

        setResult({
            FormulaEply:Math.round(FormulaEply),
            FormulaBR:Math.round(FormulaBR),
            FormulaLen:Math.round(FormulaLen),
            averange:Math.round(averange)
        });
    }

    return (
        <div className="pm1-calculator">
            <form className="pm1-form" onSubmit={handleSubmit}>
                <h2 className="pm1-title">Расчёт одноповторного максимума</h2>
                
                <div className="pm1-input-group">
                    <label className="pm1-label">Вес (кг)</label>
                    <input
                      className="pm1-input"
                      type="number"
                      value={weight || ''} 
                      onChange={(e)=>setWeight(Number(e.target.value))}
                    />
                </div>

                <div className="pm1-input-group">
                    <label className="pm1-label">Повторения</label>
                    <input
                      className="pm1-input"
                      type="number"
                      value={reps || ''} 
                      onChange={(e)=>setReps(Number(e.target.value))}
                    />
                </div>
                
                <button className="pm1-button" type="submit">Рассчитать</button>

                {result && (
                  <div className="pm1-results">
                      <p className="pm1-result">{`По формуле Эпли: ${result.FormulaEply} кг`}</p>
                      <p className="pm1-result">{`По формуле Бржицки: ${result.FormulaBR} кг`}</p>
                      <p className="pm1-result">{`По формуле Лэндера: ${result.FormulaLen} кг`}</p>
                      <p className="pm1-result pm1-average">{`Среднее значение: ${result.averange} кг`}</p>
                  </div>
                )}

                <Link to='/calc'>
                    ← Вернуться к калькуляторам
                </Link>

            </form>
        </div>
    );
}
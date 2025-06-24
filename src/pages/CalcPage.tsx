import type { FC } from "react";
import { CalcCard } from "../components/CalcCard";
import '../styles/CalcPage.css';

export const CalcPage: FC = () => {
  return (
    <div className="calc-page">
      <h1>Калькуляторы</h1>
      <div className="calc-grid">
        <CalcCard 
          title="ИМТ (Индекс массы тела)"
          description="Рассчитайте ваш индекс массы тела на основе роста и веса"
          path="/calc/bmi"
          color="#4CAF50"
        />
        <CalcCard 
          title="Суточная норма калорий"
          description="Рассчитайте вашу ежедневную потребность в калориях"
          path="/calc/calories"
          color="#2196F3"
        />
        <CalcCard 
          title="Соотношение БЖУ"
          description="Оптимальное распределение белков, жиров и углеводов"
          path="/calc/macros"
          color="#FF9800"
        />
        <CalcCard 
          title="1ПМ (Одноповторный максимум)"
          description="Рассчитайте ваш максимальный вес для одного повторения"
          path="/calc/1rm"
          color="#F44336"
        />

        <CalcCard 
          title="Суточная норма белка"
          description="Рассчитайте вашу суточную норму белка"
          path="/calc/belok"
          color="#2196F3"
        />
      </div>
    </div>
  );
};
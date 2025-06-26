import type { FC } from "react";
import { CalcCard } from "../components/CalcCard";
import '../styles/CalcPage.css';
import { Cards } from "../data/Card";

export const CalcPage: FC = () => {
  return (
    <div className="calc-page">
      <h1>Калькуляторы</h1>
      <div className="calc-grid">
        {Cards.map((card)=>(
          <div key={card.path}>
             <CalcCard cards={card} />
          </div>
        ))}
      </div>
    </div>
  );
};
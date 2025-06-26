import type { FC } from "react";
import { Link } from "react-router-dom";
import '../styles/CalcCard.css'
import type { ICard } from "../types/ICard";

interface CalcCardProps {
  cards:ICard
}

export const CalcCard: FC<CalcCardProps> = ({cards}) => {
  return (
    <div className="calc-card" style={{ '--card-color': cards.color } as React.CSSProperties}>
      <div className="calc-card-content">
        <h3>{cards.title}</h3>
        <p>{cards.description}</p>
      </div>
      <Link to={cards.path} className="calc-button">
        Рассчитать
      </Link>
    </div>
  );
};
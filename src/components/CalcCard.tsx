import type { FC } from "react";
import { Link } from "react-router-dom";
import '../styles/CalcCard.css'

interface CalcCardProps {
  title: string;
  description: string;
  path: string;
  color?: string;
}

export const CalcCard: FC<CalcCardProps> = ({ title, description, path, color = '#1a73e8' }) => {
  return (
    <div className="calc-card" style={{ '--card-color': color } as React.CSSProperties}>
      <div className="calc-card-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <Link to={path} className="calc-button">
        Рассчитать
      </Link>
    </div>
  );
};
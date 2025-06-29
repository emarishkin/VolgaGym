import type { FC } from "react";
import type { ICreate } from "../types/ICreate";
import { Link } from "react-router-dom";
import '../styles/CalcCard.css'

interface CreateCardProps{
  Creates:ICreate
}

export const CreateCard:FC<CreateCardProps> = ({Creates}) => {
    return(
        <div className="calc-card" style={{ '--card-color': Creates.color } as React.CSSProperties}>
      <div className="calc-card-content">
        <h3>{Creates.title}</h3>
        <p>{Creates.description}</p>
      </div>
      <Link to={Creates.path} className="calc-button">
        Рассчитать
      </Link>
    </div>
    )
}
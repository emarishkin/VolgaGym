import type { FC } from "react";
import { Link } from "react-router-dom";
import '../styles/HomePage.css'

interface HomePageProps{}

export const HomePage:FC<HomePageProps> = () => {
    return(
        <div className="home-page">
            <h1>Volga</h1>
            <div className="buttons-container">
                <Link to='/add-workout'>
                    Добавить тренировку
                </Link>
                <Link to='/training-history'>
                    История тренировок
                </Link>
                <Link to='/training-history'>
                    Статистика тренировок(зал)
                </Link>
                <Link to='/training-history'>
                    Калькуляторы
                </Link>
                <Link to='/training-history'>
                    Сообщество
                </Link>
            </div>
        </div>
    )
}
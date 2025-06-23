import type { FC } from "react";
import { Link } from "react-router-dom";
import '../styles/HomePage.css'

interface HomePageProps{}

export const HomePage:FC<HomePageProps> = () => {
    return(
        <div className="home-page">
            <h1>Тренировочное приложение</h1>
            <div className="buttons-container">
                <Link to='/add-workout'>
                    Добавить тренировку
                </Link>
                <Link to='/training-history'>
                    История тренировок
                </Link>
            </div>
        </div>
    )
}
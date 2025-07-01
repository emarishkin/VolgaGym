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
                <Link to='/'>
                    Статистика тренировок(зал)
                </Link>
                <Link to='/create'>
                    Создать
                </Link>
                <Link to='/my-trainings'>
                    Мои тренировки
                </Link>
                <Link to='/calc'>
                    Калькуляторы
                </Link>
                <Link to='/program'>
                    Получить программу тренировок
                </Link>
                <Link to='/'>
                    Сообщество
                </Link>
            </div>
        </div>
    )
}
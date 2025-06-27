import type { ICard } from "../types/ICard";

export const Cards:ICard[] = [
    {
       title: "Суточная норма калорий",
       description: "Рассчитайте вашу ежедневную потребность в калориях",
       path: "/calc/calories",
       color: "#2196F3"
    },
    {
       title: "ИМТ (Индекс массы тела)",
       description: "Рассчитайте ваш индекс массы тела на основе роста и веса",
       path: "/calc/bmi",
       color: "#4CAF50"
    },
    {
       title: "Суточная норма калорий,Соотношение БЖУ и общие рекомендации",
       description: "Оптимальное распределение белков, жиров и углеводов",
       path: "/calc/macros",
       color: "#FF9800"
    },
    {
       title: "1ПМ (Одноповторный максимум)",
       description: "Рассчитайте ваш максимальный вес для одного повторения",
       path: "/calc/1rm",
       color: "#F44336"
    },
    {
       title: "Суточная норма белка",
       description: "Рассчитайте вашу суточную норму белка",
       path: "/calc/belok",
       color: "#2196F3"
    },
    {
       title: "Калькулятор BAC",
       description: "Оцените содержание алкоголя в крови в зависимости от количества выпитых напитков",
       path: "/calc/bac",
       color: "#F44336"
    },
    {
       title: "Объем тренировки (тоннаж)",
       description: "Рассчитайте ваш общий тоннаж",
       path: "/calc/tonaG",
       color: "#4CAF50"
    },
]
import {  useEffect, useState, type FC } from "react";
import type { WorkoutEntry } from "../types/WorkoutEntry";
import '../styles/TrainingHistoryPage.css'


interface TrainingHistoryPageProps{}

export const TrainingHistoryPage:FC<TrainingHistoryPageProps> = () => {

    const [entries,setEntries] = useState<WorkoutEntry[]>([])
    
    useEffect(()=>{
       const saved = localStorage.getItem("volga-traning")
       if(saved){
        setEntries(JSON.parse(saved))
       }
    },[])


    return (
        <div className="history-page">
            <h1>История тренировок</h1>
            {entries.length === 0?(
                <p>Записей по нет</p>
            ):(
                <ul>
                    {entries.map((entry)=>(
                        <li key={entry.id}> 
                            <strong>{entry.date}</strong> - {entry.user} делал {entry.exercise} ({entry.sets}x{entry.reps}, {entry.weight} кг)
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
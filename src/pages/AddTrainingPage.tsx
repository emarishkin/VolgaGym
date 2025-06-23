import type { FC } from "react";
import { TrainingForm } from "../components/TrainingForm";
import type { WorkoutEntry } from "../types/WorkoutEntry";
import '../styles/AddTrainingPage.css'

interface AddTrainingPageProps{}


export const AddTrainingPage:FC<AddTrainingPageProps> = () => {

    const handleSave = (entry:WorkoutEntry) => {
        const saved = localStorage.getItem('volga-traning')
        const parsed = saved?JSON.parse(saved) : []
        const update = [...parsed,entry]
        localStorage.setItem('volga-traning',JSON.stringify(update))
    }

    return (
        <div className="add-traning-page">
            <TrainingForm onSubmit={handleSave }/>
        </div>
    )
}
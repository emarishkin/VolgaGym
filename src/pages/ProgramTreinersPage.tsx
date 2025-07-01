import type { FC } from "react";
import { QvizProgram } from "../components/QvizProgram";
import { Qviz } from "../data/Qviz";
import '../styles/ProgramTreinersPage.css'

export const ProgramTreinersPage:FC = () => {
  return (
    <div className="program-container">
      <header className="program-header">
        <h1 className="program-title">Персональная программа тренировок</h1>
        <p className="program-subtitle">
          Ответьте на несколько вопросов, чтобы получить индивидуальную программу тренировок, 
          разработанную специально под ваши цели и физическую подготовку
        </p>
      </header>
      
      <main className="program-content">
        <QvizProgram qviz={Qviz} />
      </main>
      
      <footer className="program-footer">
        <p>© 2023 FitnessApp. Все права защищены</p>
      </footer>
    </div>
  );
};
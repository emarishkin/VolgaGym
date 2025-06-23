import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { HomePage } from "./pages/HomePage"
import { AddTrainingPage } from "./pages/AddTrainingPage"
import { TrainingHistoryPage } from "./pages/TrainingHistoryPage"
import { BottomNavigation } from "./components/BottomNavigation"


export const App = () => {
 
  return (
  <Router>
    <main className="main-content">
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/add-workout" element={<AddTrainingPage/>}/>
        <Route path="/training-history" element={<TrainingHistoryPage/>}/>
      </Routes>
    </main>
    <BottomNavigation />
  </Router>
  )
}

export default App

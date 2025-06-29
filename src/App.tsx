import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AddTrainingPage } from "./pages/AddTrainingPage";
import { TrainingHistoryPage } from "./pages/TrainingHistoryPage";
import { BottomNavigation } from "./components/BottomNavigation";
import './styles/global.css'
import { CalcPage } from "./pages/CalcPage";
import { BMICalculator } from "./components/BMICalculator";
import { PM1Calculator } from "./components/PM1Calculator";
import { BelokCalculator } from "./components/BelokCalculator";
import { BACCalc } from "./components/BACCalc";
import { BJUCalcFull } from "./components/BJUCalcFull";
import { VolumeCalculator } from "./components/TonaGCalc";
import { MainCalculate } from "./components/MainCalculate";
import { CreatePage } from "./pages/CreatePage";

const AppContent = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="app-container">
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/add-workout" element={<AddTrainingPage />} />

          <Route path="/training-history" element={<TrainingHistoryPage />} />

          <Route path="/create" element={<CreatePage />} />

          <Route path="/calc" element={<CalcPage />} />
          <Route path="/calc/bmi" element={<BMICalculator/>} />
          <Route path="/calc/macros" element={<BJUCalcFull />} />
          <Route path="/calc/1rm" element={<PM1Calculator/>} />
          <Route path="/calc/belok" element={<BelokCalculator />} />
          <Route path="/calc/bac" element={<BACCalc />} />
          <Route path="/calc/tonaG" element={<VolumeCalculator />} />
          <Route path="/calc/FULL" element={<MainCalculate/>} />

        </Routes>
      </main>
      {!isHomePage && <BottomNavigation />}
    </div>
  );
};

export const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
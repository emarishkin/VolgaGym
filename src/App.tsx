import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AddTrainingPage } from "./pages/AddTrainingPage";
import { TrainingHistoryPage } from "./pages/TrainingHistoryPage";
import { BottomNavigation } from "./components/BottomNavigation";
import './styles/global.css'

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
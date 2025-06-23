import { Link } from "react-router-dom";
import '../styles/BottomNavigation.css';
import type { FC } from "react";

interface BottomNavigationProps {}

export const BottomNavigation:FC<BottomNavigationProps> = () => {
  return (
    <nav className="bottom-navigation">
      <Link to="/" className="nav-item">
        На главную
      </Link>
    </nav>
  );
};
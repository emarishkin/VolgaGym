import { Link, useLocation } from "react-router-dom";
import '../styles/BottomNavigation.css';
import { Home, Search, Plus, Bell, User } from 'react-feather';
import type { FC } from "react";

interface BottomNavigationProps {}

export const BottomNavigation: FC<BottomNavigationProps> = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bottom-navigation">
      <Link 
        to="/" 
        className={`nav-item ${isActive('/') ? 'active' : ''}`}
      >
        <Home size={20} />
        <span>Главная</span>
      </Link>
      
      <Link 
        to="/search" 
        className={`nav-item ${isActive('/search') ? 'active' : ''}`}
      >
        <Search size={20} />
        <span>Поиск</span>
      </Link>
      
      <Link 
        to="/create" 
        className={`nav-item ${isActive('/create') ? 'active' : ''}`}
      >
        <Plus size={20} />
        <span>Создать</span>
      </Link>
      
      <Link 
        to="/notifications" 
        className={`nav-item ${isActive('/notifications') ? 'active' : ''}`}
      >
        <Bell size={20} />
        <span>Уведомления</span>
      </Link>
      
      <Link 
        to="/profile" 
        className={`nav-item ${isActive('/profile') ? 'active' : ''}`}
      >
        <User size={20} />
        <span>Профиль</span>
      </Link>
    </nav>
  );
};
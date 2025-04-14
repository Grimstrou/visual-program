import React from 'react';
import { createRoot } from 'react-dom/client'; // Импортируем createRoot из ReactDOM
import './App.css';
import App from './components/App';

// Создаем корневой элемент для рендеринга
const container = document.getElementById('root');
const root = createRoot(container);

// Рендерим приложение
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
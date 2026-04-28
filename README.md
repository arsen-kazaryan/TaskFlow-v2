# TaskFlow - Project 

## Что надо реализовать

- сделать несколько страниц: Dashboard, Projects, Board, Analytics, Settings
- реализовать создание проектов и доски с колонками  Todo, In Progress, Done
- дать возможность добавлять и редактировывать задачи 
- добавить  поиск и фильтрацию задачь
- созранять данные в localStorage

## Этапы
  1. Создание и установка зависимостей *Routing, Zustand*
  2. Создание UI
  3. Определение общего стиля (color,hover,border-radius)
  4. Разделение на компоненты 
  5. Создание правильной архитектуры  
  6. Подклчение Routing
  7. Подготовка к подключению Zustand
  8. Создание и подключении логики к UI
  9. Добавление поиска и фильтрации
  10. Подключение к LocalStorage


**Примерная структура файлов:**
  ```
  src/
  app/
    router/
      index.jsx
  layouts/
    MainLayout.jsx
  pages/
    Dashboard.jsx
    Projects.jsx
    Board.jsx
    Analytics.jsx
    Settings.jsx
  components/
    Sidebar.jsx
    Header.jsx
  main.jsx
  App.jsx

  ```



На этом этапе: 
- App.jsx - карта маршрутов
- MainLayout.jsx - рамка приложения
- Outlet - пустое место внутри рамки
- Home, Board, Projects - страницы, которые вставляются в это место
*Папка Routes пока что пустая*

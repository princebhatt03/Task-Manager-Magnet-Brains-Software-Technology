import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import UserRegister from './pages/UserRegister';
import UserLogin from './pages/UserLogin';
import Dashboard from './pages/Dashboard';
import Task from './pages/Task';
import Edittask from './pages/Edittask';

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/user-register"
          element={<UserRegister />}
        />
        <Route
          path="/user-login"
          element={<UserLogin />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route
          path="/task"
          element={<Task />}
        />
        <Route
          path="/edit-task/:id"
          element={<Edittask />}
        />
        <Route
          path="*"
          element={<ErrorPage />}
        />
      </Routes>
    </>
  );
}

export default App;



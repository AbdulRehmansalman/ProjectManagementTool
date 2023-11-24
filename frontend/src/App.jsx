import React, { createContext, useReducer, useEffect } from 'react';
import Navbar from './components/Navbar/navbar';
import Home from './components/Navbar/home';

import Registration from './components/Registration/registration';
import Login from './components/Login/login';
import Manager from './components/Manager/Manager';
import Developer from './components/Developer/Developer';
import UpdateProject from './components/UpdateProject/updateProject';
import AssignTask from './components/Assigntasks/AssignTask';
import DevAssign from './components/DevAssign/devAssign';
import UpdateTask from './components/UpdateProject/UpdateTask';
import TrackProgres from './components/TrackProgress/TrackProgres';

import { Routes, Route } from 'react-router-dom';
import { reducer, initialState } from '../src/Reducer/useReducer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const userContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  //Get LocalStorage Data that which user has LOgin:
  const storedUserData = localStorage.getItem('userType');
  console.log('The Current UserType is ' + storedUserData);
  return (
    <>
      <userContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route
            path="/login"
            element={storedUserData === null ? <Login /> : <Login />}
          />
          <Route
            path="/manager"
            element={storedUserData === 'Manager' ? <Manager /> : <Login />}
          />
          <Route
            path="/developer"
            element={storedUserData === 'Developer' ? <Developer /> : <Login />}
          />
          <Route path="/updateProject/:id" element={<UpdateProject />} />
          <Route path="/createTask/:id" element={<AssignTask />} />
          <Route path="/assignTask/:id" element={<DevAssign />} />
          <Route path="/updatetasks/:id" element={<UpdateTask />} />
          <Route path="/progressTrack/:id" element={<TrackProgres />} />
        </Routes>
      </userContext.Provider>
      <ToastContainer />
    </>
  );
};

export default App;

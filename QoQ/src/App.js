import './App.css';
import {BrowserRouter } from "react-router-dom";
import MainRouter from "../src/components/router/mainRouter";
import React, { useState, useEffect, useCallback } from "react";


function App() {
  

  return (
    <div className="App">
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter> 
    </div>
  );
}

export default App;

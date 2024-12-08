import React from 'react';
import './App.css';
import Login from "./Components/Login/Login";
import {
    Routes,
    Route,
} from "react-router-dom";

import Content from "./Components/Content/Content";
import Sheet from "./Components/Sheet/Sheet";
import Task from "./Components/Task/Task";
import login from "./Components/Login/Login";





function App() {

  return (

<div>
          <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Content/>}>
                  <Route path="sheet" element={<Sheet/>}/>
                  {["/","/task"].map((path, index) => {
                      return (
                  <Route path={path}  element={<Task/>}/>)})}
                  <Route path="company" element={<Sheet/>}/>
              </Route>



          </Routes>

</div>

  );
}

export default App;

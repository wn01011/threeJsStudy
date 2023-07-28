import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import FirstQuiz from "./firstQuiz/firstQuz";
import Home from "./Home/Home";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz1" element={<FirstQuiz />} />
      </Routes>
    </Router>
  );
};

export default App;

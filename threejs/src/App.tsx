import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import FirstQuiz from "./firstQuiz/firstQuz";
import Home from "./Home/Home";
import Test1 from "./Test/Test1";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz1" element={<FirstQuiz />} />
        <Route path="/test1" element={<Test1 />} />
      </Routes>
    </Router>
  );
};

export default App;

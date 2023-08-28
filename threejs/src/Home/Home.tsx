import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Home</h1>
      <div>
        <Link to="/quiz1">Go to Quiz 1</Link>
      </div>
      <div>
        <Link to="/test1">Test1</Link>
      </div>
    </div>
  );
};

export default Home;

import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Home from "./components/Home";
import Country from "./components/Country";

function capitalize(word) {
  const lower = word.toLowerCase();
  return word.charAt(0).toUpperCase() + lower.slice(1);
}

function App() {
  const [userInput, setUserInput] = React.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      elements: {
        inputSearch: { value: userInput },
      },
    } = e.target;
    setUserInput(capitalize(userInput));
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { value: userInput } = e.target;
    setUserInput(capitalize(userInput));
  };

  return (
    <Router>
      <Navbar>
        <Search handleSubmit={handleSubmit} handleChange={handleChange} />
      </Navbar>
      <Route path="/" exact>
        <Home userInput={userInput} />
      </Route>
      <Route path="/:country" exact>
        <Country userInput={userInput} />
      </Route>
    </Router>
  );
}

export default App;

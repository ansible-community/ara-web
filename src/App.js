import React from "react";
import "./App.css";
import Navbar from "./components/Header/Navbar";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <p className="App-intro">...</p>
      </div>
    );
  }
}

export default App;

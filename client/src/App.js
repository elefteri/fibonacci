import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Otherpage from './OtherPage';
import Fib from './Fib';

import logo from './logo.svg';
import './App.css';
import OtherPage from './OtherPage';



function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2 className="App-title">Welcome to Fibonacci</h2>
          <Link to = "/">Home</Link>
          <Link to = "/otherPage">Other Page</Link>
        </header>
        <div>
          <Route exact path = "/" component = {Fib} />
          <Route path = "/otherPage" component = {OtherPage} />
        </div>
      </div>
    </Router>
  );
}

export default App;

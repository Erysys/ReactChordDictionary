import React, { Component } from 'react';
import './App.css';
import './bootstrap.min.css';
import Dictionary from './components/Dictionary.js';

function Header() {
  return (<div className="header text-center col-12">
    <h1>Chord Dictionary</h1>
  </div>

  );
}

function Footer() {
  return (
    <div className="footer text-center col-12">
      &copy; 2019 Joel Balmes
    </div>
  )
}

class App extends Component {
  render() {
    return <div className="app-main col-12">
      <Header />
      <Dictionary />
      <Footer />
    </div>
  }
}

export default App;

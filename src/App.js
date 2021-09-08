import './App.css';
import { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <News pageSize={9} country="in" category="sport" />
      </div>
    )
  }
}
import './App.css';
import { Route } from 'react-router-dom'
import LandingPage from './Components/LandingPage/LandingPage';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import CreateActivity from './Components/CreateActivity/CreateActivity';
import CountryDetail from './Components/CountryDetail/CountryDetail';


function App() {
  return (
    <div className="App">
      <Route exact path='/' component={LandingPage} />
      <Route path='/Home' component={Home} />
      <Route path='/About' component={About} />
      <Route path='/CreateActivity' component={CreateActivity} />
      <Route path='/update-activity/:id/:idAct' component={CreateActivity} />
      <Route path='/CountryDetail/:id' component={CountryDetail} />
    </div>
  );
}

export default App;

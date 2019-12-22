import React from 'react';
import logo from './logo.svg';
import './App.css';
import Toolbar from './ui/Toolbar';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Admin from './routers/Admin';
import PlantsPanel from './routers/PlantsPanel';
const App: React.FC = () => {
  return (
    <div className="App">
      <Toolbar />
      <Switch>
        <Route path='/admin/' component={Admin} />
        <Route path='/' component={PlantsPanel} />
      </Switch>

    </div>

  );
}

export default App;

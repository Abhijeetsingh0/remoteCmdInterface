import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/navbar';
import Home from "./components/home"
import Servers from "./components/servers/servers"
import addServer from "./components/servers/addServer/addServer"
import Command from './components/command/command';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/servers" component={Servers} />
          <Route path="/addServer" component={addServer}/>
          <Route path="/command/server/:serverName" component={Command} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

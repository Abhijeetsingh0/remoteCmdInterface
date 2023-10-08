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
import RunCommandOnServer from './components/command/runCommand';
import Alerts from './components/alerts/alerts';
import Test from './components/test/test'



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
          <Route path="/commandOnServer" component={RunCommandOnServer} />
          <Route path="/alerts" component={Alerts} />
          <Route path="/test" component={Test} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

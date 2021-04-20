import { Register } from "./pages/Register";
import { Info } from "./pages/Info";
import { Switch, Route } from 'react-router-dom'
import './style.css'

function App() {
  return (
    <div className="App" >
      <Switch>
        <Route component={Info} path="/info" />
        <Route component={Register} path="/" />
      </Switch>
    </div>
  );
}

export default App;

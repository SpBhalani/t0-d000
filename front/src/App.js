import './App.css';
import { Route , Switch } from 'react-router-dom'
import { Header } from './Pages/Header';
import { Home } from './Pages/Home';
import { SignIn } from './Pages/SignIn';
import { SignUp } from './Pages/SingUp';
import { PrivetRoute } from './helpers/PrivetRoute';
function App() {
  return (
    <div className="App ">
      <Header/>
      <Switch>
        <PrivetRoute path='/' exact component={Home}/>
        <Route path='/signup'  component={SignUp}/>
        <Route path='/signin'  component={SignIn}/>
      </Switch>
  
    </div>
  );
}

export default App;

// import CheckboxG from './Components/CheckboxG';
// import Load from './Pages/LoadingPage';
// import Login from './Pages/LoginPage';
// import Bar from "./Components/AppBar"
import Home from './Pages/ManagementPage';
// import Send from './Components/MailBtn'
import './App.css';

function App() {
  console.log(process.env.REACT_APP_URL)
  return (
    <div className="App">
      <Home/>
    </div>
  );
}

export default App;

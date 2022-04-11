// import CheckboxG from './Components/CheckboxG';
// import Load from './Pages/LoadingPage';
import Login from './Pages/LoginPage';
import './App.css';

function App() {
  console.log(process.env.REACT_APP_URL)
  return (
    <div className="App">
      <Login/>
    </div>
  );
}

export default App;

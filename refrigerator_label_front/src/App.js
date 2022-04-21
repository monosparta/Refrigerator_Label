// import CheckboxG from './Components/CheckboxG';
// import Load from './Pages/LoadingPage';
// import Login from './Pages/LoginPage';
// import Home from './Pages/ManagementPage';
// import Send from './Components/MailBtn'
import LoginError from './Pages/LoginErrorPage';
import './App.css';

function App() {
  console.log(process.env.REACT_APP_URL)
  return (
    <div className="App">
      {/* <Load/> */}
      {/* <Login/> */}
      {/* <Home/> */}
      <LoginError/>
    </div>
  );
}

export default App;

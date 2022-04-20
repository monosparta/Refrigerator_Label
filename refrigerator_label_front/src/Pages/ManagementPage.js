import Bar from "../Components/AppBar";
import Checkbox from "../Components/CheckboxG";
import "../App.css";


function HomePage() {
  return (
    <div className="Home">
      <div className="Bar">
        <Bar />
      </div>
      <div className="HomeBody">
        <Checkbox />
      </div>
    </div>
  );
}

export default HomePage;

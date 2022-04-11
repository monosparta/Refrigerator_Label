import Bar from "../Components/AppBar";
import Checkbox from "../Components/CheckboxG";
import '../App.css';

function HomePage() {
console.log(process.env.REACT_APP_URL)
return (
    <div className="Home">
        <div className="Bar">
            <Bar/>
        </div>
        <div className="HomeBody">
            <Checkbox/>
        </div>
    </div>
);
}

export default HomePage;
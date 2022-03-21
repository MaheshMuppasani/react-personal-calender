import "./App.css";
import NavBar from "./app/main/components/pageNavbar/NavBar";
import CalenderAppMain from "./app/main/components/CalenderAppMain";

function App() {
  return (
    <div className="App">
      <div className="calender-application">
        <NavBar />
        <CalenderAppMain />
      </div>
    </div>
  );
}

export default App;

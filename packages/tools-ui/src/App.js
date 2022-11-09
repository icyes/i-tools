import "./App.css";
import SideBar from "./view/side-tabs";
import Stage from "./view/stage";

function App() {
  return (
    <div className="App flex">
      <SideBar />
      <Stage />
    </div>
  );
}

export default App;

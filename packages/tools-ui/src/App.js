import "./App.css";
import Menu from "./view/menu/menu";

function App() {
  return (
    <div className="App flex">
      <Menu></Menu>
      <div id="cesiumContainer" className={"flex-1"}></div>
    </div>
  );
}

export default App;

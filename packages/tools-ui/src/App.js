import "./App.css";
import SideBar from "./view/side-tabs";
import CesiumBox from "./view/cesium-box";

function App() {
  return (
    <div className="App flex">
      <SideBar />
      <CesiumBox></CesiumBox>
    </div>
  );
}

export default App;

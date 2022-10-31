import "./App.css";
import SideBar from "./view/side-tabs";
import CesiumBox from "./view/cesium-box";
import { useCallback, useState } from "react";

function App() {
  const [code, setCode] = useState();
  const menuClick = useCallback(({ fn }) => {
    setCode(fn && fn.toString());
  }, []);

  return (
    <div className="App flex">
      <SideBar></SideBar>
      <CesiumBox></CesiumBox>
    </div>
  );
}

export default App;

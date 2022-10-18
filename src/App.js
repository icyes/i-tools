import './App.css';
import {CESIUM_TOKEN} from "./config"
import {useEffect} from "react";

//引入cesium
import * as Cesium from 'cesium/Cesium';
Cesium.Ion.defaultAccessToken = CESIUM_TOKEN;

function App() {
    useEffect(() => {
        const viewer = new Cesium.Viewer('cesiumContainer', {
            terrainProvider: Cesium.createWorldTerrain()
        });
        return ()=>{
            viewer.destroy()
        }
    },[])
    return (
        <div className="App">
            <div id="cesiumContainer"></div>
        </div>
    );
}

export default App;

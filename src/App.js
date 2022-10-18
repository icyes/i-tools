import logo from './logo.svg';
import './App.css';
import * as Cesium from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";
import {CESIUM_TOKEN} from "./config"
import {useEffect} from "react";

Cesium.Ion.defaultAccessToken = CESIUM_TOKEN;

function App() {
    useEffect(() => {

    })
    return (
        <div className="App">
            <div></div>
        </div>
    );
}

export default App;

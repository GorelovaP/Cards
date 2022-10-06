import React from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import Pages from "./pages/Pages";

function App() {
    return (
        <div className="App">
            <HashRouter>
                <Pages/>
            </HashRouter>
        </div>
    );
}

export default App;

import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import SistemaCP from './index.jsx';
import './App.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <SistemaCP />
        </Provider>
    </React.StrictMode>
);
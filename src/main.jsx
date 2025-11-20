import React from "react";
import ReactDOM from "react-dom/client"
import App from "./App";
import { Podcast } from "./context/PodcastContext";

const rootDom = document.getElementById("root")
const root = ReactDOM.createRoot(rootDom);

root.render(
    <Podcast>
        <App />
    </Podcast>
);
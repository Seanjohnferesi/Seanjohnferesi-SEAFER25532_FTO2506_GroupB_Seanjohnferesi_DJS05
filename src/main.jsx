import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './App'
import { Podcast } from "./context/PodcastContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Podcast>
      <App />
    </Podcast>
  </BrowserRouter>
);

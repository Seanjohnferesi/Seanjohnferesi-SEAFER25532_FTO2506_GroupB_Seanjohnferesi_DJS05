import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import { Podcast } from "./context/PodcastContext.jsx";
import ShowDetail from "./pages/ShowDetail.jsx";

export default function App() {
  return (
    <Podcast>
        <Header />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/show/:id" element={<ShowDetail />} />
        </Routes>
    </Podcast>
  );
}

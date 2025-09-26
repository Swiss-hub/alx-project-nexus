import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Favorites from "./pages/Favorites";
import NavBar from "./components/Navbar";

function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<MovieDetail />} />
                <Route path="/favorites" element={<Favorites />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
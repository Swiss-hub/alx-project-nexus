
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Favorites from "./pages/Favorites";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import BackToTopButton from "./components/BackToTopButton";
import Search from "./pages/search";


function App() {
    return (
        <BrowserRouter>
            <div className="flex flex-col min-h-screen">
                <NavBar />
                <div className="flex-1">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/movie/:id" element={<MovieDetail />} />
                        <Route path="/favorites" element={<Favorites />} />
                        <Route path="/search" element={<Search />} />
                    </Routes>
                </div>
                <Footer />
                <BackToTopButton />
            </div>
        </BrowserRouter>
    );
}

export default App;
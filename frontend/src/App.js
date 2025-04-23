// import react from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import Store from "./pages/Store";
import NotFound from "./pages/NotFound";
import Product from "./pages/Product";
import Profile from "./components/Profile";
// import Categories from "./components/Categories";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/store" element={<Store />} />
                    {/* <Route path="/product-detail" element={<Product />} /> */}
                    <Route path="/product/:id" element={<Product />} />
                    <Route path="/profile" element={<Profile />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

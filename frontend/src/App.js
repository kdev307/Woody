import "./App.css";
import MainNav from "./components/MainNav";
import Navbar from "./components/Navbar";

function App() {
    return (
        <div className="App">
            <Navbar>
                <MainNav />
            </Navbar>
        </div>
    );
}

export default App;

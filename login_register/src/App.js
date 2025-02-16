import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Cần thêm react-router-dom
import Login from './components/js/Login';
import Register from './components/js/Register';

function App() {
    return (
        <Router>
            <div className="App">
                <h1 style={{ textAlign: "center", margin: "20px 0" }}>React Auth System</h1>
                {/* Chuyển hướng giữa Login và Register */}
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

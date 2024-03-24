// import logo from './logo.svg';
import './App.css';
import HomePage from './pages/home';
import TextEditor from './pages/doc';
import {BrowserRouter, Routes, Route} from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
            <Routes>
                <Route path="/home" element={<HomePage></HomePage>} /> 
                <Route path="/" element={<HomePage/>} />
                <Route path="/doc" element={<TextEditor/>} /> 
            </Routes>
        </BrowserRouter>
  );
}

export default App;

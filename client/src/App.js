// import logo from './logo.svg';
import './App.css';
import HomePage from './pages/Home';
import DocPage from './pages/doc';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import SocketContextProvider from './Providers/Socket';
function App() {
  return (
    <BrowserRouter>
      <SocketContextProvider>
          <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/home" element={<HomePage />} /> 
              <Route path="/doc/:pageId" element={<DocPage/>} /> 
          </Routes>
      </SocketContextProvider>
    </BrowserRouter>
  );
}

export default App;

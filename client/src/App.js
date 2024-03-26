// import logo from './logo.svg';
import './App.css';
import HomePage from './pages/home';
import TextEditor from './pages/doc';
import DocPage from './pages/Doc1';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import SocketContextProvider from './Providers/Socket';
function App() {
  return (
    <BrowserRouter>
      <SocketContextProvider>
          <Routes>
              <Route path="/home" element={<HomePage></HomePage>} /> 
              <Route path="/" element={<HomePage/>} />
              <Route path="/doc/:pageId" element={<DocPage/>} /> 
          </Routes>
      </SocketContextProvider>
    </BrowserRouter>
  );
}

export default App;

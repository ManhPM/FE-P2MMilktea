import './App.css';
import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import HomePage from './pages/HomePage';
import Register from './pages/Register';


function App() {
  console.log('Hello word')

  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/register" element={<Register/>} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;

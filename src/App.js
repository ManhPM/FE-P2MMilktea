import './App.css';
import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import WishList from './pages/WishList';
import ProductDetail from './components/ProductDetail/ProductDetail';


function App() {
  console.log('Hello word')

  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/register" element={<Register/>} />
          <Route path="/wish-list" element={<WishList/>} />
          <Route path="/product-detail" element={<ProductDetail/>} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;

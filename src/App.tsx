import React, { Dispatch } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from "./components/Header/Header";
import Home from './pages/Home';
import Pizza from './pages/Pizza';
import "./scss/app.scss";
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';


const App: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path='/Jo-Jo-Pizza' element={<Home />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/pizza/:id' element={<Pizza />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;

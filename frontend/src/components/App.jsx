import '../App.css';
import React, { useState } from "react";

import { Routes, Route } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import CartPage from "../pages/CartPage";
import Store from "../pages/Store";
import Navbar from "./Navbar";
import { getUser } from "../utilities/users-service";
const apiKey = process.env.REACT_APP_API_KEY

function App() {
  const [user, setUser] = useState(getUser());
  const [foundGame, setFoundGame] = useState(null)
  const [cart, setCart] = useState([]);
  console.log(user)
  const searchGame = async (searchTerm) => {
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games/${searchTerm}?key=${apiKey}`
      );
      // Parse JSON response into a javascript object
      const data = await response.json();
      // console.log(data.results)
      // const game = data
       console.log(data)
      setFoundGame(data);
      
    } catch (e) {
      console.error(e)
    }
  };
  const amountOfItems = (id) => cart.filter((item) => item.id === id).length;

  return (
    <div className="App">
       {user ? (
        <>
          <Navbar user={user} setUser={setUser} searchGame={searchGame} cart={cart} />
          <Routes>
            <Route path="/games/cart" element={<CartPage cart={cart} setCart={setCart} amountOfItems={amountOfItems}/>} />
            <Route path="/games" element={<Store foundGame={foundGame} setFoundGame={setFoundGame} cart={cart} setCart={setCart}/>} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </div>
  );
}

export default App;
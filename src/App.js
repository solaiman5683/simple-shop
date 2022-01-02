import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import { ProductContextProvider } from './Contexts/ProductContext';
import Home from './Components/Home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductDetails from './Components/Products/ProductDetails';
import CartPage from './Components/Cart/CartPage';

class App extends Component {
	render() {
		return (
			<ProductContextProvider>
				<BrowserRouter>
					<Navigation logo={logo} />
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/product/:id' element={<ProductDetails />} />
						<Route path='/cart' element={<CartPage />} />
					</Routes>
				</BrowserRouter>
			</ProductContextProvider>
		);
	}
}

export default App;

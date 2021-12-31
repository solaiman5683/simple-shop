import Products from '../Products/Products';
import styles from './Home.module.css';

import React, { Component } from 'react';
import ProductContext from '../../Contexts/ProductContext';

class Home extends Component {
	static contextType = ProductContext;
	render() {
		const { setShowCart, showCart } = this.context;
		return (
			<div className={styles.container}>
				<Products />
				{showCart && <div className='wrapper' onClick={setShowCart}></div>}
			</div>
		);
	}
}

export default Home;

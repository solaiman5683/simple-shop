import React from 'react';
import Products from '../Products/Products';
import styles from './Home.module.css';

const Home = () => {
	return (
		<div className={styles.container}>
			<Products />
		</div>
	);
};

export default Home;

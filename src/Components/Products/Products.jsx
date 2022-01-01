import React, { Component } from 'react';
import ProductContext from '../../Contexts/ProductContext';
import Product from './Product';
import styles from './Product.module.css';

class Products extends Component {
	static contextType = ProductContext;

	render() {
		const { products, activeCurrency } = this.context;
		const activeProducts = products?.filter(
			product => product.category === this.context.activeCategory
		);
		return (
			<div>
				<div className={styles.products__grid}>
					{activeProducts?.map(product => (
						<Product
							key={product.id}
							product={product}
							activeCurrency={activeCurrency}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default Products;

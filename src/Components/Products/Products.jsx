import React, { Component } from 'react';
import ProductContext from '../../Contexts/ProductContext';
import Product from './Product';
import styles from './Product.module.css';

class Products extends Component {
	static contextType = ProductContext;
	componentDidMount = () => {
		fetch('http://localhost:4000/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query: `
                    query {
                        categories{
                          name
                          products{
							id
                            name
                            category
                            prices{
                              amount
                              currency
                            }
							gallery
                          }
                        }
                    }
                `,
			}),
		})
			.then(res => res.json())
			.then(res => {
				this.context.setProducts(res.data.categories);
			});
	};
	render() {
		const { products, activeCurrency } = this.context;
		const activeProducts = products?.find(
			product => product.name === this.context.activeCategory
		)?.products;
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

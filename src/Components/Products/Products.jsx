import React, { Component } from 'react';
import ProductContext from '../../Contexts/ProductContext';

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
                            name
                            category
                            prices{
                              amount
                              currency
                            }
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
		console.log(activeProducts);
		return (
			<div>
				{activeProducts?.map((product, i) => (
					<>
						<h1 key={i}>{product.name}</h1>
						<h2>
							{product.prices?.map(
								(price, i) => price.currency === activeCurrency && price.amount
							)}
						</h2>
					</>
				))}
			</div>
		);
	}
}

export default Products;

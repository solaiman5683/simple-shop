import React from 'react';
import styles from './Navigation.module.css';
import ProductContext from '../../Contexts/ProductContext';

export default class Navigation extends React.Component {
	// use context data
	static contextType = ProductContext;

	// lifecycle method
	componentDidMount() {
		// fetch data from API
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
                        }
                    }
                `,
			}),
		})
			.then(res => res.json())
			.then(res => {
				// update context data
				this.context.setCategories(res.data.categories);
			});
	}

	// render the navigation
	render() {
		const { logo } = this.props;
		const { activeCategory, setActiveCategory, cart } = this.context;
		console.log(this.context);
		const handleCurrencyChange = event => {
			this.context.setCurrency(event.target.value);
		};
		// return the navigation
		return (
			<div className={styles.navigation}>
				<div className={styles.navigation__links}>
					<ul>
						{this.context.categories.map((category, i) => (
							<li
								key={i}
								className={`${styles.link} ${
									category.name === activeCategory && styles.active
								}`}
								onClick={() => setActiveCategory(category.name)}>
								{category.name}
							</li>
						))}
					</ul>
				</div>
				<div className={styles.navigation__logo}>
					<img src={logo} alt='logo' />
				</div>
				<div className={styles.navigation__links}>
					<ul>
						<li>
							<select name='currency' onChange={handleCurrencyChange}>
								<option value='usd'>$ USD</option>
								<option value='eur'>€ EUR</option>
								<option value='jpy'>¥ JPY</option>
							</select>
						</li>
						<li className={styles.cart}>
							<img src='/assets/images/icons/cart.svg' alt='' />
							{cart.length > 0 && (
								<span className={styles.badge}>{cart.length}</span>
							)}
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

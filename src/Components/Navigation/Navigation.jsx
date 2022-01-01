import React from 'react';
import styles from './Navigation.module.css';
import ProductContext from '../../Contexts/ProductContext';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';

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
                        currencies
                    }
                `,
			}),
		})
			.then(res => res.json())
			.then(res => {
				// update context data
				this.context.setCategories(res.data.categories);
				this.context.setCurrencies(res.data.currencies);
			});
	}

	// render the navigation
	render() {
		const { logo } = this.props;
		const {
			categories,
			activeCategory,
			setActiveCategory,
			cart,
			currencies,
			setActiveCurrencies,
			showCart,
			setShowCart,
			cartCount,
		} = this.context;
		const handleCurrencyChange = event => {
			setActiveCurrencies(event.target.value);
		};
		// return the navigation
		return (
			<div className={styles.container}>
				<div className={styles.navigation}>
					<div className={styles.navigation__links}>
						<ul>
							{categories.map((category, i) => (
								<Link to='/' key={i}>
									<li
										className={`${styles.link} ${
											category.name === activeCategory && styles.active
										}`}
										onClick={() => setActiveCategory(category.name)}>
										{category.name}
									</li>
								</Link>
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
									{currencies.map((currency, i) => (
										<option key={i} value={currency}>
											{currency === 'USD'
												? '$ USD'
												: currency === 'GBP'
												? '£ GBP'
												: currency === 'AUD'
												? '$ AUD'
												: currency === 'JPY'
												? '¥ JPY'
												: currency === 'RUB'
												? '₽ RUB'
												: ''}
										</option>
									))}
								</select>
							</li>
							<li className={styles.cart}>
								<span onClick={setShowCart}>
									<img src='/assets/images/icons/cart.svg' alt='' />
									{cart.length > 0 && (
										<span className={styles.badge}>{cartCount}</span>
									)}
								</span>
								{showCart && (
									<div className={styles.cart__items}>
										<Cart />
									</div>
								)}
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

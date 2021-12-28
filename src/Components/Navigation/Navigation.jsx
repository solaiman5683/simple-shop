import React from 'react';
import styles from './Navigation.module.css';
import ProductContext from '../../Contexts/ProductContext';

export default class Navigation extends React.Component {
	// use context data
	static contextType = ProductContext;

	// render the navigation
	render() {
		const { logo } = this.props;
		console.log(this.context.currency);
		// return the navigation
		const handleCurrencyChange = event => {
			this.context.setCurrency(event.target.value);
		};
		return (
			<div className={styles.navigation}>
				<div className={styles.navigation__links}>
					<ul>
						<li className={`${styles.link} ${styles.active}`}>Woman</li>
						<li className={styles.link}>Men</li>
						<li className={styles.link}>Kids</li>
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
						<li>
							<img src='/assets/images/icons/cart.svg' alt='' />
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

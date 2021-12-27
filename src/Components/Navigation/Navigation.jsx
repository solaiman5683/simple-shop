import React from 'react';
import styles from './Navigation.module.css';
export default class Navigation extends React.Component {
	// render the navigation
	render() {
		const { logo } = this.props;
		// return the navigation
		return (
			<div className={styles.navigation}>
				<div className={styles.navigation__links}>
					<ul>
						<li>Woman</li>
						<li>Men</li>
						<li>Kids</li>
					</ul>
				</div>
				<div className={styles.navigation__logo}>
					<img src={logo} alt='logo' />
				</div>
				<div className={styles.navigation__links}>
					<ul>
						<li>
							<select name='currency' id='currency'>
								<option selected hidden>
									$
								</option>
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

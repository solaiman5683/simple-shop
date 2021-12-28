import logo from './logo.svg';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import { ProductContextProvider } from './Contexts/ProductContext';
import Home from './Components/Home/Home';

function App() {
	return (
		<ProductContextProvider>
			<Navigation logo={logo} />
			<Home />
		</ProductContextProvider>
	);
}

export default App;

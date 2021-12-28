import logo from './logo.svg';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import { ProductContextProvider } from './Contexts/ProductContext';

function App() {
	return (
		<ProductContextProvider>
			<Navigation logo={logo} />
		</ProductContextProvider>
	);
}

export default App;

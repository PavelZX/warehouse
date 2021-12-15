import './App.css'
import { AuthProvider } from './utils/UserContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import {
	CreatePost,
	CreateGood,
	CreateOrder,
	Header,
	Login,
	Logout,
	PostList,
	GoodList,
	OrderList,
	Signup,
} from './components'

function App() {
	return (
		<AuthProvider>
			<Router>
				<Header />
				<Switch>
					<Route path="/" exact component={PostList} />
					<Route path="/login" component={Login} />
					<Route path="/signup" component={Signup} />
					<Route path="/logout" component={Logout} />
					<Route path="/goods" exact component={GoodList} />
					<Route path="/orders" exact component={OrderList} />
					<Route path="/create-post" component={CreatePost} />
					<Route path="/create-good" component={CreateGood} />
					<Route path="/create-order" component={CreateOrder} />
				</Switch>
			</Router>
		</AuthProvider>
	)
}

export default App

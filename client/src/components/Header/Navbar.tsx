import { useLocation, Link } from 'react-router-dom'
import classes from '../../css/Header.module.css'

interface NavbarProps {
	user: any
	location: ReturnType<typeof useLocation>
}

const Navbar = ({ user, location }: NavbarProps) => {
	return (
		<nav className={classes.navbar}>
			<Link to="/" className={location.pathname === '/' ? classes.active : ''}>
				Домой
			</Link>
			{user != null ? (
				<>
					<Link
						to="/create-post"
						className={
							location.pathname === '/create-post' ? classes.active : ''
						}
					>
						Создать новость
					</Link>
					<Link
						to="/create-good"
						className={
							location.pathname === '/create-good' ? classes.active : ''
						}
					>
						Создать товар
					</Link>
					<Link
						to="/create-order"
						className={
							location.pathname === '/create-order' ? classes.active : ''
						}
					>
						Создать заказ
					</Link>
					<Link to="/logout">Logout</Link>
					<span>{user.username}</span>
				</>
			) : (
				<Link
					to="/login"
					className={location.pathname === '/login' ? classes.active : ''}
				>
					Выйти
				</Link>
			)}
		</nav>
	)
}

export default Navbar

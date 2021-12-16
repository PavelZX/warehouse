import { useState } from 'react'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocation, Link } from 'react-router-dom'
import classes from '../../css/Header.module.css'

interface DropDownProps {
	user: any
	location: ReturnType<typeof useLocation>
}

const DropDown = ({ user, location }: DropDownProps) => {
	const [dropDownOpen, setDropDownOpen] = useState(false)

	return (
		<div className={classes.dropDown}>
			<button type="button" onClick={() => setDropDownOpen(value => !value)}>
				<FontAwesomeIcon icon={dropDownOpen ? faTimes : faBars} />
			</button>

			{dropDownOpen && (
				<ul className={classes.dropDownMenu}>
					<li className={classes.dropDownItem}>
						<Link
							to="/"
							className={location.pathname === '/' ? classes.active : ''}
						>
							Домой
						</Link>
					</li>
					{user ? (
						<>
							<li className={classes.dropDownItem}>
								<Link
									to="/create-article"
									className={
										location.pathname === '/create-article' ? classes.active : ''
									}
								>
									Создать новость
								</Link>
							</li>
							<li className={classes.dropDownItem}>
								<Link
									to="/create-good"
									className={
										location.pathname === '/create-good' ? classes.active : ''
									}
								>
									Создать товар
								</Link>
							</li>
							<li className={classes.dropDownItem}>
								<Link
									to="/create-order"
									className={
										location.pathname === '/create-order' ? classes.active : ''
									}
								>
									Создать заказ
								</Link>
							</li>
							<li className={classes.dropDownItem}>
								<Link to="/logout">Выйти</Link>
							</li>
						</>
					) : (
						<li className={classes.dropDownItem}>
							<Link
								to="/login"
								className={location.pathname === '/login' ? classes.active : ''}
							>
								Войти
							</Link>
						</li>
					)}
				</ul>
			)}
		</div>
	)
}

export default DropDown

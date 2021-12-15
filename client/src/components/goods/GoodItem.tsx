import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Good } from '../../interfaces/goodInterface'
import { useAuth } from '../../utils/UserContext'
import classes from '../../css/GoodList.module.css'

interface GoodItemProps {
	good: Good
}

const GoodItem = ({
	good: { createdAt, title, text, points, owner },
}: GoodItemProps) => {
	const { currentUser } = useAuth()

	const time = new Date(createdAt).toLocaleString('ru-RU', {
		dateStyle: 'short',
		timeStyle: 'short',
	})

	return (
		<section className={classes.goodCard}>
			<div className={classes.goodHeader}>
				<small>
					{owner.username} - {time}
				</small>
			</div>

			<div className={classes.goodBody}>
				<h4>{title}</h4>
				<p>{text.length > 100 ? `${text.substring(0, 100)}...` : text}</p>
			</div>

			<div className={classes.goodButtons}>
				<button disabled={!currentUser}>
					<FontAwesomeIcon
						icon={faThumbsUp}
						style={{ color: 'var(--color-neutral-500)' }}
					/>
				</button>
				{points}
				<button disabled={!currentUser}>
					<FontAwesomeIcon
						icon={faThumbsDown}
						style={{ color: 'var(--color-neutral-500)' }}
					/>
				</button>
			</div>
		</section>
	)
}

export default GoodItem

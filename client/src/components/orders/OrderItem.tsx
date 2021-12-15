import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Order } from '../../interfaces/orderInterface'
import { useAuth } from '../../utils/UserContext'
import classes from '../../css/OrderList.module.css'

interface OrderItemProps {
	order: Order
}

const OrderItem = ({
	order: { createdAt, title, text, points, owner },
}: OrderItemProps) => {
	const { currentUser } = useAuth()

	const time = new Date(createdAt).toLocaleString('ru-RU', {
		dateStyle: 'short',
		timeStyle: 'short',
	})

	return (
		<section className={classes.orderCard}>
			<div className={classes.orderHeader}>
				<small>
					{owner.username} - {time}
				</small>
			</div>

			<div className={classes.orderBody}>
				<h4>{title}</h4>
				<p>{text.length > 100 ? `${text.substring(0, 100)}...` : text}</p>
			</div>

			<div className={classes.orderButtons}>
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

export default OrderItem

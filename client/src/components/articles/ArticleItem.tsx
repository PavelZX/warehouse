import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Article } from '../../interfaces/articleInterface'
import { useAuth } from '../../utils/UserContext'
import classes from '../../css/ArticleList.module.css'

interface ArticleItemProps {
	article: Article
}

const ArticleItem = ({
	article: { createdAt, title, text, points, owner },
}: ArticleItemProps) => {
	const { currentUser } = useAuth()

	const time = new Date(createdAt).toLocaleString('ru-RU', {
		dateStyle: 'short',
		timeStyle: 'short',
	})

	return (
		<section className={classes.articleCard}>
			<div className={classes.articleHeader}>
				<small>
					{owner.username} - {time}
				</small>
			</div>

			<div className={classes.articleBody}>
				<h4>{title}</h4>
				<p>{text.length > 100 ? `${text.substring(0, 100)}...` : text}</p>
			</div>

			<div className={classes.articleButtons}>
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

export default ArticleItem

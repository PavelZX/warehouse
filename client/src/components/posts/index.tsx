import { useState, useEffect, useRef, useCallback } from 'react'
import { useOnScreen } from '../../hooks/useOnScreen'
import { Article } from '../../interfaces/articleInterface'
import { articlesRequest } from '../../utils/getArticles'
import ArticleItem from './ArticleItem'
import classes from '../../css/ArticleList.module.css'

const ArticleList = () => {
	const [articles, setArticles] = useState<Article[]>([])
	const [hasMore, setHasMore] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const pageBottom = useRef<any>()
	const bottomVisible = useOnScreen(pageBottom)

	const getArticles = () => {
		setIsLoading(true)
		articlesRequest().then(({ articles, hasMore }) => {
			setArticles(articles)
			setHasMore(hasMore)
			setIsLoading(false)
		})
	}

	useEffect(() => {
		getArticles()
	}, [])

	const loadMore = useCallback(async () => {
		setIsLoading(true)
		const [lastArticle] = articles.slice(-1)
		const lastArticleDate = lastArticle.createdAt
		const { articles: newArticles, hasMore: newHasMore } = await articlesRequest(
			lastArticleDate
		)
		setArticles(currentArticles => [...currentArticles, ...newArticles])
		setHasMore(newHasMore)
		setIsLoading(false)
	}, [articles])

	useEffect(() => {
		if (isLoading || !hasMore) return
		bottomVisible && loadMore()
	}, [bottomVisible, hasMore, isLoading, loadMore])

	const showArticle = (article: Article) => <ArticleItem key={article.id} article={article} />

	return (
		<main className={classes.articleList} style={{ paddingBottom: '3rem' }}>
			{articles.length > 0 && articles.map(showArticle)}
			<div ref={pageBottom} style={{ height: '1px' }} />
		</main>
	)
}

export default ArticleList

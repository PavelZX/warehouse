import { useState, useEffect, useRef, useCallback } from 'react'
import { useOnScreen } from '../../hooks/useOnScreen'
import { Good } from '../../interfaces/goodInterface'
import { goodsRequest } from '../../utils/getGoods'
import GoodItem from './GoodItem'
import classes from '../../css/GoodList.module.css'

const GoodList = () => {
	const [goods, setGoods] = useState<Good[]>([])
	const [hasMore, setHasMore] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const pageBottom = useRef<any>()
	const bottomVisible = useOnScreen(pageBottom)

	const getGoods = () => {
		setIsLoading(true)
		goodsRequest().then(({ goods, hasMore }) => {
			setGoods(goods)
			setHasMore(hasMore)
			setIsLoading(false)
		})
	}

	useEffect(() => {
		getGoods()
	}, [])

	const loadMore = useCallback(async () => {
		setIsLoading(true)
		const [lastGood] = goods.slice(-1)
		const lastGoodDate = lastGood.createdAt
		const { goods: newGoods, hasMore: newHasMore } = await goodsRequest(
			lastGoodDate
		)
		setGoods(currentGoods => [...currentGoods, ...newGoods])
		setHasMore(newHasMore)
		setIsLoading(false)
	}, [goods])

	useEffect(() => {
		if (isLoading || !hasMore) return
		bottomVisible && loadMore()
	}, [bottomVisible, hasMore, isLoading, loadMore])

	const showGood = (good: Good) => <GoodItem key={good.id} good={good} />

	return (
		<main className={classes.goodList} style={{ paddingBottom: '3rem' }}>
			{goods.length > 0 && goods.map(showGood)}
			<div ref={pageBottom} style={{ height: '1px' }} />
		</main>
	)
}

export default GoodList

import { useState, useEffect, useRef, useCallback } from 'react'
import { useOnScreen } from '../../hooks/useOnScreen'
import { Order } from '../../interfaces/orderInterface'
import { ordersRequest } from '../../utils/getOrders'
import OrderItem from './OrderItem'
import classes from '../../css/OrderList.module.css'

const OrderList = () => {
	const [orders, setOrders] = useState<Order[]>([])
	const [hasMore, setHasMore] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const pageBottom = useRef<any>()
	const bottomVisible = useOnScreen(pageBottom)

	const getOrders = () => {
		setIsLoading(true)
		ordersRequest().then(({ orders, hasMore }) => {
			setOrders(orders)
			setHasMore(hasMore)
			setIsLoading(false)
		})
	}

	useEffect(() => {
		getOrders()
	}, [])

	const loadMore = useCallback(async () => {
		setIsLoading(true)
		const [lastOrder] = orders.slice(-1)
		const lastOrderDate = lastOrder.createdAt
		const { orders: newOrders, hasMore: newHasMore } = await ordersRequest(
			lastOrderDate
		)
		setOrders(currentOrders => [...currentOrders, ...newOrders])
		setHasMore(newHasMore)
		setIsLoading(false)
	}, [orders])

	useEffect(() => {
		if (isLoading || !hasMore) return
		bottomVisible && loadMore()
	}, [bottomVisible, hasMore, isLoading, loadMore])

	const showOrder = (order: Order) => <OrderItem key={order.id} order={order} />

	return (
		<main className={classes.orderList} style={{ paddingBottom: '3rem' }}>
			{orders.length > 0 && orders.map(showOrder)}
			<div ref={pageBottom} style={{ height: '1px' }} />
		</main>
	)
}

export default OrderList

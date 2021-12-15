import { OrderResponse } from '../interfaces/orderInterface'
import { sendRequest } from './sendRequest'

export const ordersRequest = async (cursor?: any): Promise<OrderResponse> => {
	const path = `/orders${cursor ? `?cursor=${cursor}` : ''}`
	const response = await sendRequest({ path })
	return await response.json()
}

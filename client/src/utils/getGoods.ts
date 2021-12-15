import { GoodResponse } from '../interfaces/goodInterface'
import { sendRequest } from './sendRequest'

export const goodsRequest = async (cursor?: any): Promise<GoodResponse> => {
	const path = `/goods${cursor ? `?cursor=${cursor}` : ''}`
	const response = await sendRequest({ path })
	return await response.json()
}

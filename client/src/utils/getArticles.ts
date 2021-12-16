import { ArticleResponse } from '../interfaces/articleInterface'
import { sendRequest } from './sendRequest'

export const articlesRequest = async (cursor?: any): Promise<ArticleResponse> => {
	const path = `/articles${cursor ? `?cursor=${cursor}` : ''}`
	const response = await sendRequest({ path })
	return await response.json()
}

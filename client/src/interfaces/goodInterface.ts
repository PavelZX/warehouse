export interface Good {
	id: string
	title: string
	text: string
	points: number
	ownerId: string
	createdAt: Date
	updatedAt: Date
	owner: {
		id: string
		username: string
	}
}

export interface GoodResponse {
	goods: Good[]
	hasMore: boolean
}

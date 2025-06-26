// Типы для рабочих часов
export interface IWorkingHoursDay {
	day: string // 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'
	open: string | null
	close: string | null
	type?: string // 'daily' | 'weekdays' | 'null' | null
	break?: Record<string, unknown> // для перерывов
}

// Типы данных API
export interface ISeller {
	id: number
	name: string
	store_name: string
	status: number // 1-открыт, 0-неактивен, 4-скоро откроется
	latitude: string
	longitude: string
	logo: string // путь к логотипу
	type: string // 'restaurant' | 'shop'
	store_description: string | null
	working_hours: string | null // JSON строка с IWorkingHoursDay[]
	time_delivery: string | null
	time_cooking: string | null
	formatted_address: string
	accepting_orders: number // 0 или 1
	max_delivery_distance: string
	row_order: number
	logo_url: string
	categories_array: string // строка с ID категорий через запятую
	products: IProduct[]
}

export interface IProduct {
	id: number
	name: string
	slug: string
	subtitle?: string
	image: string
	image_url?: string
	type: string
	price?: number
	discounted_price?: number
	description?: string
	seller_id?: number
	variants?: Array<{
		id: number
		price: number
		discounted_price: number
		stock: number
		unit: {
			unit_short_code: string
		}
	}>
}

export interface ICategory {
	id: number
	name: string
	slug: string
	subtitle: string
	image: string
	image_url?: string
	type: string
	products_count: number
	products?: IProduct[]
}

export interface IApiResponse<T> {
	status: number
	message: string
	total?: number
	data: T
	success?: boolean
}

export interface ISlider {
	id: string
	type: string
	type_id: string
	slider_url: string
	type_name: string
	image_url: string
}

export interface IHomeData {
	sliders?: ISlider[]
	offers?: unknown[]
	sections?: unknown[]
	is_category_section_in_homepage?: string
	is_brand_section_in_homepage?: string
	is_seller_section_in_homepage?: string
	is_country_section_in_homepage?: string
	categories?: unknown[]
	brands?: unknown[]
	sellers?: ISeller[]
	countries?: unknown[]
}

// Трансформированные типы для приложения
export interface ITransformedSeller {
	id: number
	name: string
	storeName: string
	logoUrl: string
	type: 'restaurant' | 'shop'
	status: number
	acceptingOrders: boolean
	deliveryTime: string | null
	cookingTime: string | null
	address: string
	description: string | null
	workingHours: IWorkingHoursDay[] | null
	maxDeliveryDistance: number
	categories: number[]
	products: ITransformedProduct[]
}

export interface ITransformedProduct {
	id: number
	name: string
	description: string
	price: number
	imageUrl: string
	sellerId: number
}

export interface ITransformedSlider {
	id: string
	imageUrl: string
	title: string
	url: string
}

// Типы для рабочих часов
export interface IWorkingHoursDay {
	day: string // 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'
	open: string | null
	close: string | null
	type?: string // 'daily' | 'weekdays' | 'null' | null
	break?: Record<string, unknown> // для перерывов
}

// Типы для единиц измерения
export interface IUnit {
	id: number
	unit_short_code: string
}

// Типы для вариантов товаров
export interface IVariant {
	id: number
	product_id: number
	type: string
	status: number
	measurement: number
	price: number
	discounted_price: number
	stock: number
	stock_unit_id: number
	unit: IUnit
}

// Типы данных API
export interface ISeller {
	id: number
	name: string
	store_name: string
	logo: string
	status: number // 1-открыт, 0-неактивен, 4-скоро откроется
	time_delivery: string | null
	time_cooking: string | null
	type: string // 'restaurant' | 'shop'
	accepting_orders: number // 0 или 1
	max_delivery_distance: string
	latitude: string
	longitude: string
	row_order: number
	working_hours: string | null // JSON строка с IWorkingHoursDay[]
	logo_url: string
	national_identity_card_url: string | null
	address_proof_url: string | null
	categories_array: string // строка с ID категорий через запятую
	products: IProduct[]
	categories: ISellerCategory[]
}

export interface ISellerCategory {
	id: number
	image_url: string
	has_child: boolean
	has_active_child: boolean
	pivot: {
		seller_id: number
		category_id: number
		commission: number
	}
	cat_active_childs: unknown[]
}

export interface IProduct {
	id: number
	seller_id: number
	row_order: number
	name: string
	tags: string
	tax_id: number
	brand_id: number
	slug: string
	category_id: number
	indicator: number | null
	manufacturer: string
	made_in: string
	return_status: number
	cancelable_status: number
	till_status: string
	image: string
	other_images: string | null
	description: string
	status: number
	is_approved: number
	return_days: number
	type: string
	is_unlimited_stock: number
	cod_allowed: number
	total_allowed_quantity: number
	tax_included_in_price: number
	fssai_lic_no: string
	featured: number
	proteins_per_100: number | null
	fats_per_100: number | null
	carbohydrates_per_100: number | null
	kcal: number | null
	composition: string | null
	terms_and_conditions_of_storage: string | null
	'1c_code': string | null
	image_url: string
	variants: IVariant[]
}

export interface ICategory {
	id: number
	name: string
	slug: string
	status: number
	image: string
	row_order: number
	image_url: string
	has_child: boolean
	has_active_child: boolean
	cat_active_childs: unknown[]
}

export interface IApiResponse<T> {
	status: number
	message: string
	total?: number
	data: T
	success?: boolean
}

export interface ISlider {
	id: number
	type: string
	type_id: string
	slider_url: string | null
	type_name: string
	image_url: string
}

export interface IHomeData {
	categories: ICategory[]
	sellers: ISeller[]
	sliders: ISlider[]
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

import { ISeller, sellerProductsByCategoryGet, sellersGet } from '@/actions'
import VendorScreen from '@/components/pages/vendor/VendorScreen'
import { withErrorHandler } from '@/utils/withErrorHandler'

// TODO: на беке ошибки
interface VendorPageProps {
	params: Promise<{ id: string }>
}

export default async function VendorPage({ params }: VendorPageProps) {
	const { id } = await params

	const { data } = await withErrorHandler(() => sellersGet())

	const seller = data?.find((seller: ISeller) => seller.id === +id)

	if (!seller) {
		throw new Error('Продавец не найден')
	}

	const firstCategoryId = seller.categories_array.split(',')[0]
	if (!firstCategoryId) {
		throw new Error('У продавца нет категорий')
	}

	const { data: products } = await withErrorHandler(() =>
		sellerProductsByCategoryGet({
			categoryId: +firstCategoryId,
		})
	)

	if (!products) {
		throw new Error('Не удалось загрузить товары')
	}

	return <VendorScreen seller={{ ...seller, products }} />
}

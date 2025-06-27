import { productGetOne } from '@/actions'
import { ProductDetailScreen } from '@/components/pages/product/ProductDetailScreen'
import { withErrorHandler } from '@/utils/withErrorHandler'

interface ProductPageProps {
	params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
	const { id } = await params

	const { data } = await withErrorHandler(() => productGetOne({ id }))

	return <ProductDetailScreen product={data!} />
}

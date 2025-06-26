import { ProductDetailScreen } from '@/components/screens/product/ProductDetailScreen'

interface ProductPageProps {
	params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
	const { id } = await params
	return <ProductDetailScreen productId={id} />
}

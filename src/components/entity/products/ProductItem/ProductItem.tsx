import Link from 'next/link'
import styles from './ProductItem.module.css'

interface ProductItemProps {
	product?: {
		id: number
		name: string
		image_url: string
		price: number
		weight?: number
		isCombo?: boolean
		isSpecial?: boolean
		quantity?: number
	}
}

const formatPrice = (price: number): string => {
	return price.toString().padStart(4, '0')
}

const defaultProduct = {
	id: 1,
	name: 'Пицца Пепперони',
	image_url: '/image 76.png',
	price: 1000,
	weight: 500,
	isCombo: false,
	isSpecial: false,
	quantity: 0,
}

export function ProductItem({ product }: ProductItemProps) {
	const productData = product || defaultProduct

	return (
		<Link href={`/product/${productData.id}`} className={styles.itemLink}>
			<div className={styles.item}>
				<div className={styles.imageContainer}>
					<img
						src={productData.image_url}
						alt={productData.name}
						className={styles.image}
					/>
					{productData.isCombo && (
						<div className={styles.comboLabel}>Комбо</div>
					)}
				</div>
				<div className={styles.info}>
					<h4 className={styles.name}>{productData.name}</h4>
					{productData.weight && (
						<p className={styles.weight}>{productData.weight} г</p>
					)}
					<div
						className={`${styles.priceButton} ${
							productData.isSpecial ? styles.priceButtonSpecial : ''
						}`}
						onClick={(e) => e.preventDefault()}
					>
						{productData.quantity && productData.quantity > 0 ? (
							<button className={styles.minus}>−</button>
						) : (
							<span></span>
						)}
						<span className={styles.price}>
							{formatPrice(productData.price)} ₽
						</span>
						<button className={styles.plus}>+</button>
					</div>
				</div>
			</div>
		</Link>
	)
}

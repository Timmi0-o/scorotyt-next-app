import { IProduct } from '@/types/api.types'
import Image from 'next/image'
import Link from 'next/link'
import styles from './ProductItem.module.css'

interface ProductItemProps {
	product: IProduct
}

function formatPrice(price: number): string {
	return new Intl.NumberFormat('ru-RU').format(price)
}

function stripHtml(html: string): string {
	return html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ')
}

export function ProductItem({ product }: ProductItemProps) {
	// Получаем первый вариант товара для отображения цены
	const firstVariant = product?.variants?.[0]
	const price = firstVariant?.price || 0
	const discountedPrice = firstVariant?.discounted_price || 0
	const hasDiscount = discountedPrice > 0 && discountedPrice < price
	const displayPrice = hasDiscount ? discountedPrice : price

	const unit = firstVariant?.unit?.unit_short_code || 'шт.'
	const measurement = firstVariant?.measurement || 1

	const description = product?.description ? stripHtml(product.description) : ''

	return (
		<Link href={`/product/${product?.id}`} className={styles.itemLink}>
			<div className={styles.item}>
				<div className={styles.imageContainer}>
					{product?.image_url ? (
						<Image
							src={product?.image_url}
							alt={product?.name}
							width={144}
							height={144}
							className={styles.image}
						/>
					) : (
						<div className={styles.image}></div>
					)}
					{product?.featured === 1 && (
						<div className={styles.comboLabel}>Рекомендуем</div>
					)}
					{hasDiscount && (
						<div className={styles.discountLabel}>
							-{Math.round(((price - discountedPrice) / price) * 100)}%
						</div>
					)}
				</div>
				<div className={styles.info}>
					<h4 className={styles.name}>{product?.name}</h4>
					{measurement > 1 && unit && (
						<p className={styles.weight}>
							{measurement} {unit}
						</p>
					)}
					{description && <p className={styles.description}>{description}</p>}
					<div className={styles.priceContainer}>
						{hasDiscount && (
							<span className={styles.oldPrice}>{formatPrice(price)} ₽</span>
						)}
						<div
							className={`${styles.priceButton} ${
								hasDiscount ? styles.priceButtonSpecial : ''
							}`}
							onClick={(e) => e.preventDefault()}
						>
							<span className={styles.price}>
								{formatPrice(displayPrice)} ₽
							</span>
							<button className={styles.plus}>+</button>
						</div>
					</div>
				</div>
			</div>
		</Link>
	)
}

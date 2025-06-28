'use client'

import { useCategories } from '@/hooks/useHomeData'
import { ICategory } from '@/types/api.types'
import Link from 'next/link'
import { useState } from 'react'
import styles from './CategoryPage.module.css'

export const CategoryPage = () => {
	const { data: categories, isLoading, error } = useCategories()

	const [searchQuery, setSearchQuery] = useState('')
	const [imageErrors, setImageErrors] = useState<Set<number>>(new Set())

	// Фильтрация категорий по поисковому запросу
	const filteredCategories = categories.filter((category: ICategory) =>
		category.name.toLowerCase().includes(searchQuery.toLowerCase())
	)

	const handleImageError = (categoryId: number) => {
		setImageErrors((prev) => new Set(prev).add(categoryId))
	}

	if (isLoading) {
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<h1 className={styles.title}>Категории</h1>
				</div>
				<div className={styles.loadingContainer}>
					<div className={styles.loadingGrid}>
						{Array.from({ length: 8 }).map((_, index) => (
							<div key={index} className={styles.loadingCard}>
								<div className={styles.loadingImage}></div>
								<div className={styles.loadingText}></div>
							</div>
						))}
					</div>
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<h1 className={styles.title}>Категории</h1>
				</div>
				<div className={styles.errorContainer}>
					<div className={styles.errorMessage}>
						<span className={styles.errorIcon}>⚠️</span>
						<p>Не удалось загрузить категории</p>
						<button
							className={styles.retryButton}
							onClick={() => window.location.reload()}
						>
							Попробовать снова
						</button>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className={styles.container}>
			{/* Header */}
			<div className={styles.header}>
				<h1 className={styles.title}>Категории</h1>
				<p className={styles.subtitle}>
					Выберите категорию товаров ({filteredCategories.length})
				</p>
			</div>

			{/* Search */}
			<div className={styles.searchContainer}>
				<div className={styles.searchWrapper}>
					<span className={styles.searchIcon}>🔍</span>
					<input
						type='text'
						placeholder='Поиск категорий...'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className={styles.searchInput}
					/>
					{searchQuery && (
						<button
							className={styles.clearButton}
							onClick={() => setSearchQuery('')}
						>
							✕
						</button>
					)}
				</div>
			</div>

			{/* Categories Grid */}
			<div className={styles.content}>
				{filteredCategories.length === 0 ? (
					<div className={styles.emptyState}>
						<span className={styles.emptyIcon}>
							{searchQuery ? '🔍' : '📂'}
						</span>
						<p className={styles.emptyMessage}>
							{searchQuery ? 'Категории не найдены' : 'Категории отсутствуют'}
						</p>
						{searchQuery && (
							<button
								className={styles.clearSearchButton}
								onClick={() => setSearchQuery('')}
							>
								Очистить поиск
							</button>
						)}
					</div>
				) : (
					<div className={styles.grid}>
						{filteredCategories.map((category: ICategory) => (
							<Link
								key={category.id}
								href={`/categories/${category.slug}`}
								className={styles.categoryCard}
							>
								<div className={styles.imageContainer}>
									{imageErrors.has(category.id) || !category.image_url ? (
										<CategoryPlaceholder />
									) : (
										<img
											src={category.image_url}
											alt={category.name}
											className={styles.categoryImage}
											onError={() => handleImageError(category.id)}
											loading='lazy'
										/>
									)}
									{category.has_child && (
										<div className={styles.childIndicator}>
											<span className={styles.childIcon}>📁</span>
										</div>
									)}
								</div>
								<div className={styles.categoryInfo}>
									<h3 className={styles.categoryName}>{category.name}</h3>
									{category.has_active_child && (
										<span className={styles.activeLabel}>Активные</span>
									)}
								</div>
							</Link>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

const CategoryPlaceholder = () => (
	<div className={styles.placeholder}>
		<svg width='60' height='60' viewBox='0 0 60 60' fill='none'>
			<rect width='60' height='60' rx='8' fill='#E2E8F0' />
			<path
				d='M20 30h20M30 20v20'
				stroke='#A0ADB8'
				strokeWidth='2'
				strokeLinecap='round'
			/>
		</svg>
	</div>
)

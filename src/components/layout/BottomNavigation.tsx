'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './BottomNavigation.module.css'

// SVG иконки в стиле Telegram
const HomeIcon = ({ isActive }: { isActive: boolean }) => (
	<svg
		className={`${styles.icon} ${
			isActive ? styles.iconActive : styles.iconInactive
		}`}
		fill='currentColor'
		viewBox='0 0 24 24'
	>
		<path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' />
	</svg>
)

const CategoriesIcon = ({ isActive }: { isActive: boolean }) => (
	<svg
		className={`${styles.icon} ${
			isActive ? styles.iconActive : styles.iconInactive
		}`}
		fill='currentColor'
		viewBox='0 0 24 24'
	>
		<path d='M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z' />
	</svg>
)

const CartIcon = ({ isActive }: { isActive: boolean }) => (
	<div className={styles.cartBadge}>
		<svg
			className={`${styles.icon} ${
				isActive ? styles.iconActive : styles.iconInactive
			}`}
			fill='currentColor'
			viewBox='0 0 24 24'
		>
			<path d='M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z' />
		</svg>
		<span className={styles.cartBadgeNumber}>2</span>
	</div>
)

const ProfileIcon = ({ isActive }: { isActive: boolean }) => (
	<svg
		className={`${styles.icon} ${
			isActive ? styles.iconActive : styles.iconInactive
		}`}
		fill='currentColor'
		viewBox='0 0 24 24'
	>
		<path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' />
	</svg>
)

const navItems = [
	{ href: '/', icon: HomeIcon, label: 'Главная' },
	{ href: '/categories', icon: CategoriesIcon, label: 'Категории' },
	{ href: '/cart', icon: CartIcon, label: 'Корзина' },
	{ href: '/profile', icon: ProfileIcon, label: 'Профиль' },
]

export const BottomNavigation = () => {
	const pathname = usePathname()

	// Определяем, находимся ли мы в русской локали
	const isRuLocale = pathname.startsWith('/ru')
	const basePrefix = isRuLocale ? '/ru' : ''

	// Получаем текущий путь без префикса локали для сравнения
	const currentPath = isRuLocale ? pathname.replace('/ru', '') || '/' : pathname

	return (
		<div className={styles.navigation}>
			{navItems.map((item) => {
				const isActive = currentPath === item.href
				const fullHref = basePrefix + item.href

				return (
					<Link
						key={item.href}
						href={fullHref}
						className={`${styles.navItem} ${
							isActive ? styles.navItemActive : ''
						}`}
					>
						<item.icon isActive={isActive} />
						<span
							className={`${styles.label} ${
								isActive ? styles.labelActive : styles.labelInactive
							}`}
						>
							{item.label}
						</span>
					</Link>
				)
			})}
		</div>
	)
}

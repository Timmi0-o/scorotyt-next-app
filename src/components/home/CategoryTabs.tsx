'use client'

import { useState } from 'react'
import styles from './CategoryTabs.module.css'

const tabs = [
	{ id: 'popular', label: 'Популярные' },
	{ id: 'rolls', label: 'Роллы' },
	{ id: 'pizza', label: 'Пицца' },
	{ id: 'burgers', label: 'Бургеры' },
]

export function CategoryTabs() {
	const [activeTab, setActiveTab] = useState('popular')

	return (
		<div className={styles.container}>
			<div className={styles.tabsWrapper}>
				{tabs.map((tab) => (
					<button
						key={tab.id}
						onClick={() => setActiveTab(tab.id)}
						className={`${styles.tab} ${
							activeTab === tab.id ? styles.tabActive : styles.tabInactive
						}`}
					>
						{tab.label}
					</button>
				))}
			</div>
		</div>
	)
}

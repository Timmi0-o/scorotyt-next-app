import { homeGet, IHomeData } from '@/actions'
import { AppInitializer } from '@/components/pages/AppInitializer'
import { HomePage } from '@/components/pages/home/HomePage'
import { withErrorHandler } from '@/utils/withErrorHandler'

export default async function Home() {
	const { data } = await withErrorHandler<IHomeData>(() =>
		homeGet({
			filters: {
				city_id: 1,
			},
		})
	)

	console.log('home data', data)

	return (
		<AppInitializer>
			<HomePage data={data as IHomeData} />
		</AppInitializer>
	)
}

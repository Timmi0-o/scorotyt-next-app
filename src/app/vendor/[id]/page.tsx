import VendorScreen from '@/components/screens/vendor/VendorScreen'

interface VendorPageProps {
	params: {
		id: string
	}
}

export default function VendorPage({ params }: VendorPageProps) {
	return <VendorScreen vendorId={params.id} />
}

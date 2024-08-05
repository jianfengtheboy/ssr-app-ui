import { storagePrefix } from '~/config/domain'

const usePermission = () => {
	const permissions = JSON.parse(localStorage.getItem(`${storagePrefix}APPSTORE_ROUTE`) as string)?.permissions || []

	const checkPermission = (value?: string | string[]) => {
		let result = true
		if (!value) {
		} else if (Array.isArray(value)) {
			result = value.every(v => permissions.includes(v))
		} else if (value.includes('||')) {
			result = value.split('||').some((v: string) => permissions.includes(v))
		} else {
			result = permissions.includes(value)
		}
		return result
	}

	return {
		checkPermission,
	}
}

export default usePermission

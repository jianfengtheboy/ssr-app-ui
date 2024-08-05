import { storagePrefix } from '~/config/domain'

export const useAuth = {
	get: (key: string) => {
		const tokenCookie: any = useCookie(`${storagePrefix}APPSTORE_TOKEN`).value
		return useState(key, () => (tokenCookie && tokenCookie.token) || '')
	},
}

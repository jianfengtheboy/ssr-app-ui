import { defineStore } from 'pinia'
import _ from 'lodash'
import { IUser, IMenu } from '~/model/common'
import { storagePrefix } from '~/config/domain'
import { ELang } from '~/config/enum'
import { getCurrentLanguage } from '~/utils/common'
import { filterMenus, getPermissions, getMenuIdUrl } from '~/utils/menu'
import { clearCookie } from '~/utils/storage'
import { onLogin, getUserInfo, getSysMenuNav, logout } from '~/apis/common'

interface IState {
	// token
	token: string
	// 折叠菜单栏
	sideCollapse: boolean
	// 用户信息
	userInfo: IUser
	// 菜单
	menuList: IMenu[]
	// id-url map
	menuIdUrl: Object
	// url-id map
	menuUrlId: Object
	// 权限清单
	permissions: string[]
	// 当前选择的语言
	lang: ELang
	// 最后一个被选中的菜单
	lastActivePath?: string
}

export const useAppStore = defineStore('appStore', {
	state: (): IState => ({
		token: '',
		sideCollapse: false,
		userInfo: {
			id: 0,
			email: '',
			mobile: '',
			userName: '',
			sysMenus: [],
			sysRoles: '',
			createdTime: '',
			companyId: 0,
			defaultPwdFlag: '0',
			defaultServerType: '',
		},
		menuList: [],
		menuIdUrl: {},
		menuUrlId: {},
		permissions: [],
		lang: getCurrentLanguage(),
		lastActivePath: '',
	}),
	persist: [
		{
			key: `${storagePrefix}APPSTORE_TOKEN`,
			storage: persistedState.cookies,
			paths: ['token'],
		},
		{
			key: `${storagePrefix}APPSTORE_LANGUAGE`,
			storage: persistedState.cookies,
			paths: ['lang'],
		},
		{
			key: `${storagePrefix}APPSTORE_SETTINGS`,
			storage: persistedState.localStorage,
			paths: ['sideCollapse'],
		},
		{
			key: `${storagePrefix}APPSTORE_USERINFO`,
			storage: persistedState.localStorage,
			paths: [
				'userInfo.id',
				'userInfo.userName',
				'userInfo.mobile',
				'userInfo.companyId',
				'userInfo.defaultServerType',
			],
		},
		{
			key: `${storagePrefix}APPSTORE_ROUTE`,
			storage: persistedState.localStorage,
			paths: ['lastActivePath', 'menuList', 'menuIdUrl', 'menuUrlId', 'permissions'],
		},
	],
	actions: {
		// 设置最后一个被选中的菜单
		setLastActivePath(path: string) {
			this.lastActivePath = path
		},
		// 设置系统语言
		setLang(currentLang: ELang) {
			this.lang = currentLang
			window.location.reload()
		},
		// 折叠菜单栏
		setSideCollapse(collapse: boolean) {
			this.sideCollapse = collapse
		},
		// 登录
		async login(data) {
			const response: any = await onLogin(data)
			this.token = response
			this.lastActivePath = ''
			// 设置请求头，注意：请使用 await, 否则无效
			await useRequest.setHeader({
				Authorization: this.token,
			})
			await this.getUserInfo()
			const router = useRouter()
			await this.getMenuList()
			router.push('/welcome')
			return
		},
		// 获取用户信息
		async getUserInfo() {
			const response: any = await getUserInfo()
			this.userInfo = response
			return Promise.resolve(this.userInfo)
		},
		// 获取菜单和权限
		async getMenuList(isreload = false) {
			if (this.menuList.length != 0 && isreload == false) return
			const data = await getSysMenuNav()
			if (data.length > 0) {
				const menuList = filterMenus(data)
				const permissions = getPermissions(data)
				this.menuList = menuList
				this.menuIdUrl = getMenuIdUrl(_.cloneDeep(menuList))
				this.menuUrlId = _.invert(this.menuIdUrl)
				this.permissions = permissions
			}
		},
		// 退出
		async logout(isRequest = true, from = '') {
			const router = useRouter()
			if (isRequest) {
				await logout()
			}
			if (from) {
				router.replace({
					path: '/login',
					query: {
						from: from,
					},
				})
			} else {
				router.replace('/login')
			}
			localStorage.clear()
			clearCookie(`${storagePrefix}APPSTORE_TOKEN`)
			await useRequest.setHeader({
				Authorization: '',
			})
			const lang = this.lang
			if (!from) {
				this.$reset()
				this.lang = lang
			}
		},
	},
})

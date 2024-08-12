import _ from 'lodash'
import { IMenu } from '~/model/common'

// 获取菜单
export const filterMenus = (menus: IMenu[]) => {
	return _.cloneDeep(menus).filter((menu: IMenu) => {
		if (['0', '1', '2'].includes(String(menu.type))) {
			if (menu.children) {
				const children = filterMenus(menu.children)
				menu.children = children.length > 0 ? children : undefined
			}
			return true
		} else {
			return false
		}
	})
}

// 获取用户拥有的权限
export const getPermissions = (menus: IMenu[]) =>
	getTreeNodeValue(menus, 'perms').reduce(
		(accumulate: string[], current: string) => accumulate.concat(current.split(',')),
		[]
	)

export const getMenuIdUrl = (list: IMenu[]) => {
	return list.reduce((pre, cur) => {
		if (cur['url']) pre[cur['id']] = `${cur['url']}`
		if (cur.children && cur.children.length > 0) {
			Object.assign(pre, getMenuIdUrl(cur.children))
		}
		return pre
	}, {})
}

export const getMenuNameUrl = (list: IMenu[]) => {
	const appStore = useAppStore()
	let key = appStore.lang == 'zh' ? 'name' : 'nameEn'
	return list.reduce((pre, cur) => {
		if (cur['url']) pre[cur[key]] = `${cur['url']}`
		if (cur.children && cur.children.length > 0) {
			Object.assign(pre, getMenuNameUrl(cur.children))
		}
		return pre
	}, {})
}

/**
 * 获取树的所有节点的某个属性值
 */
export const getTreeNodeValue = (tree: any, filed: string) => {
	return tree
		.map((node: any) => {
			const result: any = []
			node[filed] && result.push(node[filed])
			if (node.children) {
				result.push(...getTreeNodeValue(node.children, filed))
			}
			return result
		})
		.flat()
}

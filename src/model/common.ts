// 用户信息
export interface IUser {
	id: number
	// 邮箱
	email: string
	// 手机号
	mobile: string
	// 用户名
	userName: string
	// 用户菜单
	sysMenus?: []
	// 用户角色
	sysRoles?: []
}

// 菜单
export interface IMenu {
	id: number
	// 名称
	name: string
	nameEn: string
	// 图标
	icon?: string
	// 菜单类型 1：目录 2：菜单 3：按钮
	type?: string
	// 路由
	url?: string
	// 子菜单
	children?: IMenu[]
}

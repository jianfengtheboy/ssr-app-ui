declare namespace Auth {
	// 用户信息
	interface UserInfo {
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
}

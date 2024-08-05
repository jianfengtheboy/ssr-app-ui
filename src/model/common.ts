// 用户信息
export interface IUser {
	id: number
	// 用户名
	userName: string
	// 手机号
	mobile?: string
	// 邮箱
	email?: string
	// 状态 0:禁用 1:正常 2:锁定
	status?: 0 | 1 | 2
	// 公司ID
	companyId?: number
	// 1运营 2应用提供商 3企业 空：应用提供商or企业
	defaultServerType: '' | '1' | '2' | '3'
	// 是否需要强制修改密码 0:不需要，1：需要
	defaultPwdFlag: '0' | '1'
	// 创建时间
	createdTime?: string
	// 创建人
	createdUser?: string
	// 修改时间
	updateTime?: string
	// 修改人
	updateUser?: string
	// 用户菜单
	sysMenus?: []
	// 用户角色
	sysRoles?: ''
	// 公司名称
	companyName?: string
	// 行业类别
	industryType?: string
	// 省份编码
	regionProvince?: string
	// 城市编码
	regionCity?: string
	// 区域编码
	regionDistrict?: string
	// 详细地址
	detailedAddress?: string
	// 公司介绍
	introduce?: string
}

export interface IUserSave {
	id?: number
	// 用户名
	userName: string
	// 手机号
	mobile?: string
	// 邮箱
	email?: string
	// 状态 0:禁用 1:正常 2:锁定
	status?: 0 | 1 | 2
	// 公司ID
	companyId?: number
	// 用户角色
	sysRoles?: ''
	// 公司名称
	companyName?: string
	// 行业类别
	industryType?: string
	// 省份编码
	regionProvince?: string
	// 城市编码
	regionCity?: string
	// 区域编码
	regionDistrict?: string
	// 详细地址
	detailedAddress?: string
	// 公司介绍
	introduce?: string
}

// 菜单
export interface IMenu {
	id: number
	// 名称
	name: string
	// 图标
	icon?: string
	// 菜单类型 1：目录 2：菜单 3：按钮
	type?: '1' | '2' | '3'
	perms?: string
	// 路由
	url?: string
	orderNum?: number
	// 子菜单
	children?: IMenu[]
	parentId?: number
	parentName?: string
}

// 角色
export interface IRole {
	id?: number
	// 角色名称
	name: string
	// 服务类型 1：运营  2：服务提供商 3：商户
	serverType?: '1' | '2' | '3'
	// 所属公司id
	companyId?: number
	// 是否关联用户 1：关联 2：未关联
	relateUserFlag?: string
	// 角色对应的用户数量
	relateUserCount?: number | string
	// 备注
	remarks?: string
	sysMenus: IMenu[]
	sysRoleApps: []
}

export interface IRoleApp {
	// 应用id
	appId: number
	// 应用角色id
	appRoleId: number
}

// 新增、编辑
export interface IRoleSave {
	id?: number
	// 角色名称
	name: string
	// 服务类型 1：运营  2：服务提供商 3：商户
	serverType?: '' | '1' | '2' | '3'
	// 所属公司id
	companyId?: number
	// 备注
	remarks?: string
	// 系统菜单
	sysMenus: IMenu[]
	// 应用角色list
	sysRoleApps: []
}

// 角色列表，用于全量选择
export const apiSysRoleList = data => useHttp({ url: 'sys/roles/list', body: { ...data } })

// 角色分页查询
export const apiSysRolePage = data => useRequest.post('sys/roles/page', data)

// 角色明细查询
export const apiSysRoleInfo = id => useRequest.post(`sys/roles/info/${id}`)

// 删除角色
export const apiSysRoleDelete = id => useRequest.post(`sys/roles/delete/${id}`)

// 新增角色
export const apiSysRoleSave = data => useRequest.post('sys/roles/save', data)

// 编辑角色
export const apiSysRoleUpdate = data => useRequest.post('sys/roles/update', data)

// 获取应用角色
export const apiSysAppRole = data => useRequest.post('merchants/app/role', data)

// 获取菜单，根据企业还是应用提供商获取
export const getSysMenuNavByType = serverType => useRequest.post(`sys/menus/nav/serverType/${serverType}`)

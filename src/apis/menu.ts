// 菜单列表
export const apiSysMenuList = data => useRequest.post('sys/menus/list', data)
// 新增
export const apiSysMenuSave = data => useRequest.post('sys/menus/save', data)
// 编辑
export const apiSysMenuUpdate = data => useRequest.post('sys/menus/update', data)
// 删除
export const apiSysMenuDelete = id => useRequest.post(`sys/menus/delete/${id}`)

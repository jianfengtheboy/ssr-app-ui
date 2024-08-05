// 用户管理列表分页
export const apiSysUserPage = data => useHttp({ url: 'sys/users/page', body: { ...data } })

// 删除用户
export const apiSysUserDelete = id => useRequest.post(`sys/users/delete/${id}`)

// 新增用户
export const apiSysUserSave = data => useRequest.post('sys/users/save', data)

// 编辑用户
export const apiSysUserUpdate = data => useRequest.post('sys/users/update', data)

// 重置密码
export const apiSysUserPwdReset = data => useRequest.post('sys/users/pwd/reset', data)

// 启用
export const apiSysUserEnable = id => useRequest.post(`sys/users/${id}/enable`)

// 禁用
export const apiSysUserDisable = id => useRequest.post(`sys/users/${id}/disable`)

// 通过用户id查询企业相关信息
export const apiSysCustomerInfo = id => useRequest.post(`sys/users/userAndCompany/${id}`)

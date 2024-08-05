/*
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2023-08-29 16:05:02
 * @LastEditTime: 2024-08-05 22:32:58
 * @Description: 基础模块接口
 */
// 获取验证码图片
export const getCatcha = () => useHttp({ url: '/sys/captcha', method: 'GET' })

// 密码加密
export const getUserSalt = data => useHttp({ url: '/sys/users/salt', body: { ...data } })

// 登录
export const onLogin = data => useHttp({ url: '/sys/login', body: { ...data } })

// 获取用户信息
export const getUserInfo = () => useHttp({ url: '/sys/users/info' })

// 退出
export const logout = () => useHttp({ url: '/sys/logout' })

// 获取菜单
export const getSysMenuNav = () => useHttp({ url: 'sys/menus/nav/0' })

// 配置重定向至首页页面
export default defineNuxtRouteMiddleware(async (to, from) => {
	if (to.path === '/') {
		return navigateTo('/login')
	}
	if (to.path === '/login') {
		return
	}
	const auth = await useAuth.get('token')
	if (!auth.value) {
		return navigateTo('/login')
	} else {
		return
	}
})

export default defineNuxtPlugin(nuxtApp => {
	nuxtApp.vueApp.directive('auth', {
		mounted(el, binding) {
			const { checkPermission } = usePermission()
			if (!checkPermission(binding.value)) {
				el.remove()
			}
		},
	})
})

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import MenuItem from './MenuItem.vue'

const appStore = useAppStore()
const route = useRoute()

const { sideCollapse, menuList, menuUrlId, lastActivePath } = storeToRefs(appStore)

const outerPaths: string[] = ['/login', '/welcome']

const activeMenu = computed(() => {
	const { meta, path } = route
	const activePath = meta.activePath as string
	let active = menuUrlId.value[activePath || path]

	if (active || outerPaths.includes(path)) {
		appStore.setLastActivePath(active)
		return active
	}
	if (!active) {
		return lastActivePath?.value
	}
})

const handleSelectMenu = (menuId: string) => {
	const url = appStore.menuIdUrl[menuId]
	if (url) {
		navigateTo(url)
	}
}
</script>

<template>
	<el-menu :default-active="activeMenu" unique-opened :collapse="sideCollapse" @select="handleSelectMenu">
		<MenuItem v-for="menu in menuList" :key="menu.url" :config="menu" />
	</el-menu>
</template>

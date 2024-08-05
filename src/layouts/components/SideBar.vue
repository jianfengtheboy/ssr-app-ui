<script lang="ts" setup>
import MenuList from './MenuList.vue'

const appStore = useAppStore()

const sideCollapse = computed(() => appStore.sideCollapse)

// 折叠菜单栏
const toggleCollapse = () => {
	appStore.setSideCollapse(!sideCollapse.value)
}
</script>

<template>
	<div class="side-bar flex-none bg-white flex flex-col py-3" :class="{ 'side-bar-collapse': sideCollapse }">
		<MenuList />
		<div class="flex items-center justify-center text-info text-xs pt-3 border-t">
			<BaseIcon class="button-hover hover:text-primary cursor-pointer" :size="18" @click="toggleCollapse">
				<IconCustomMenuFold v-if="sideCollapse" />
				<IconCustomMenuUnfold v-else />
			</BaseIcon>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.el-menu {
	border-right: none;
	overflow: auto;
	flex: auto;
}
</style>

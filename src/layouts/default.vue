<script lang="ts" setup>
import HeaderBar from './components/HeaderBar.vue'
import SideBar from './components/SideBar.vue'
</script>

<template>
	<div class="flex-layout flex flex-col">
		<HeaderBar />
		<div class="flex-layout-content flex-auto flex overflow-y-auto overflow-x-hidden">
			<SideBar />
			<div class="flex-layout-page h-full relative box-border overflow-y-auto overflow-x-hidden">
				<slot />
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.flex-layout {
	width: 100vw;
	height: 100vh;
	min-width: 1200px;
	min-height: 600px;

	&-page {
		padding: 20px;
		flex: auto;
	}
}
</style>

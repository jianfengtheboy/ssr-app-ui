<script lang="ts" setup>
import HeaderBar from './components/HeaderBar.vue'
</script>

<template>
	<div class="grail-layout flex flex-col">
		<HeaderBar />
		<div class="flex-layout-page h-full relative box-border overflow-y-auto overflow-x-hidden">
			<slot />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.grail-layout {
	width: 100vw;
	height: 100vh;
	min-width: 1200px;
	min-height: 600px;
}
</style>

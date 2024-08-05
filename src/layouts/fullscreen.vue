<script lang="ts" setup></script>

<template>
	<div class="fullscreen-layout">
		<slot />
	</div>
</template>

<style lang="scss" scoped>
.fullscreen-layout {
	width: 100vw;
	height: 100vh;
	min-width: 1200px;
	min-height: 600px;
}
</style>

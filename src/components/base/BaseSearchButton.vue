<script setup lang="ts">
const emit = defineEmits(['search', 'reset'])

const onSearchAction = () => {
	emit('search')
}
const onResetAction = () => {
	emit('reset')
}

const showAfter = 1000
</script>

<template>
	<div class="mr-3">
		<el-tooltip content="搜索" :show-after="showAfter">
			<el-button type="primary" native-type="submit" @click="onSearchAction" class="search-button">
				<base-icon size="14px">
					<icon-custom-search />
				</base-icon>
			</el-button>
		</el-tooltip>
		<el-tooltip content="重置" :show-after="showAfter">
			<el-button @click="onResetAction" class="search-button search-button-reset">
				<base-icon size="14px">
					<icon-custom-reset />
				</base-icon>
			</el-button>
		</el-tooltip>
	</div>
</template>

<style lang="scss" scoped>
.search-button {
	padding: 14px 12px;
	border-radius: 8px;
	height: 36px;
	width: 40px;

	&-reset {
		border-color: var(--theme);
		color: var(--theme);
	}
}
</style>

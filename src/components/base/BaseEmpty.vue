<script lang="ts" setup>
import empty from '@/assets/images/common/empty.png'

interface IProps {
	visible?: boolean
	iconSize?: number
	message?: string
}

withDefaults(defineProps<IProps>(), {
	iconSize: 120,
	message: '暂无数据',
})
</script>

<template>
	<div v-if="visible" class="empty flex items-center justify-center flex-col h-full box-border">
		<el-image :src="empty" class="empty-pic" />
		<div class="empty-message text-center">
			{{ message }}
			<slot></slot>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.empty {
	&-pic {
		width: 174px;
		height: 120px;
	}

	&-message {
		width: 300px;
		padding: 20px;
		color: var(--black9);
	}
}
</style>

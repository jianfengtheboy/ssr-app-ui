<script lang="ts" setup>
const emit = defineEmits(['update:modelValue'])

interface IProps {
	modelValue: number // 当前所在page
	total: number
	size: number
}

const props = withDefaults(defineProps<IProps>(), {
	modelValue: 1,
	total: 10,
	size: 10,
})

const currentPage = computed({
	get() {
		return props.modelValue
	},
	set(val: number) {
		emit('update:modelValue', val)
	},
})
</script>

<template>
	<el-pagination
		:total="total"
		:page-size="size"
		:current-page="currentPage"
		@current-change="val => (currentPage = val)"
		class="mt-2 flex items-center justify-center mb-2"
		background
		layout="total,prev, pager, next"
	/>
</template>

<style lang="scss" scoped>
.disabled {
	cursor: not-allowed;
	opacity: 0.8;
}

.clickable {
	cursor: pointer;
	color: var(--black3);

	:hover {
		color: var(--theme);
	}
}
</style>

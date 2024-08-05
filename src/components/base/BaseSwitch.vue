<script lang="ts" setup>
/**
 * 用于确定操作后，才会切换值的swtich
 */
import { ref } from 'vue'
interface IProps {
	modelValue?: boolean | string | number
	disabled?: boolean
	text?: string
	activeValue?: boolean | string | number
	inactiveValue?: boolean | string | number
}

const props = withDefaults(defineProps<IProps>(), {
	disabled: false,
})
const emit = defineEmits(['change'])

const loading = ref(false)

const handleChange = async () => {
	if (loading.value || props.disabled) return
	loading.value = true
	emit('change', () => {
		loading.value = false
	})
}
</script>

<template>
	<span>
		<el-switch
			class="ml-2"
			:class="disabled || loading ? 'disable-real' : ''"
			:model-value="modelValue"
			:active-text="text"
			:active-value="activeValue"
			:inactive-value="inactiveValue"
			disabled
			:loading="loading"
			@click="handleChange"
		/>
	</span>
</template>

<style lang="scss" scoped>
:deep(.el-switch) {
	&.is-disabled {
		opacity: 1;
		cursor: pointer;
		.el-switch__core,
		.el-switch__label {
			cursor: pointer;
		}
	}
	&.disable-real {
		opacity: 0.6 !important;
		cursor: not-allowed !important;
		.el-switch__core,
		.el-switch__label {
			cursor: not-allowed !important;
		}
	}
}
</style>

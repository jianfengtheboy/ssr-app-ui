<script lang="ts" setup>
interface IProps {
	type?: Status
	confirmType?: string
	visible?: boolean
	title?: string
	confirmText?: string
	cancelText?: string
	confirmLoading?: boolean
	message?: string
	description?: string
}

withDefaults(defineProps<IProps>(), {
	title: '提示',
	visible: false,
	type: 'warning',
})

const emit = defineEmits(['confirm', 'close'])

const handleConfirm = () => {
	emit('confirm')
}

const handleClose = () => {
	emit('close')
}
</script>

<template>
	<BaseDialog
		:title="title"
		:visible="visible"
		:type="type"
		:confirm-loading="confirmLoading"
		:confirm-text="confirmText"
		:cancel-text="cancelText"
		@confirm="handleConfirm"
		@close="handleClose"
	>
		<div class="flex items-center py-5">
			<BaseIcon v-if="confirmType && confirmType == 'delete'" :size="40" color="#FF2222">
				<IconCustomCircleDelete />
			</BaseIcon>
			<BaseIcon v-else :class="`icon-${type}`" :size="40">
				<IconCustomWarning />
			</BaseIcon>
			<div class="ml-2">
				<div class="text-lg font-bold">{{ message }}</div>
				<div class="mt-1">{{ description }}</div>
			</div>
		</div>
	</BaseDialog>
</template>

<style lang="scss" scoped>
.icon {
	&-primary {
		color: var(--theme);
	}

	&-success {
		color: var(--green);
	}

	&-warning {
		color: var(--orange);
	}

	&-danger {
		color: var(--red);
	}

	&-info {
		color: var(--gray);
	}
}
</style>

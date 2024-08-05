<script lang="ts" setup>
interface IProps {
	title?: string
	direction?: 'rtl' | 'ltr' | 'ttb' | 'btt'
	size?: string
	visible: boolean
	type?: Status
	customClass?: string
	confirmText?: string
	cancelText?: string
	confirmLoading?: boolean
	confirmDisabled?: boolean
	closeOnClickModal?: boolean
	showClose?: boolean
	showFooter?: boolean
	showConfirm?: boolean
	showCancel?: boolean
	destroyOnClose?: boolean
}

withDefaults(defineProps<IProps>(), {
	size: '600px',
	type: 'primary',
	customClass: '',
	closeOnClickModal: false,
	showClose: true,
	showFooter: true,
	showConfirm: true,
	showCancel: true,
	destroyOnClose: true,
})

const emit = defineEmits(['confirm', 'close'])

defineExpose({
	scrollToTop() {
		setTimeout(() => {
			scrollRef.value.scrollTop = scrollRef.value.scrollHeight
		}, 0)
	},
})

const scrollRef = ref()

const handleConfirm = () => {
	emit('confirm')
}

const handleClose = () => {
	emit('close')
}
</script>

<template>
	<el-drawer
		:class="`base-drawer ${customClass}`"
		:model-value="visible"
		:direction="direction"
		:size="size"
		:destroy-on-close="destroyOnClose"
		append-to-body
		:show-close="false"
		:close-on-click-modal="closeOnClickModal"
		@close="handleClose"
	>
		<template #header>
			<div class="base-drawer-header w-full flex items-center">
				<div>
					<slot name="header">
						<span class="title-text font-semibold">{{ title }}</span>
					</slot>
				</div>

				<div v-if="showClose" class="icon-close flex items-center justify-center cursor-pointer" @click="handleClose">
					<BaseIcon :size="18">
						<IconCustomClose />
					</BaseIcon>
				</div>
			</div>
		</template>

		<div class="flex flex-col h-full">
			<div class="base-drawer-body overflow-auto" ref="scrollRef">
				<slot></slot>
			</div>

			<div v-if="showFooter" class="base-drawer-footer flex items-center justify-center bg-white">
				<slot name="footer">
					<el-button v-if="showCancel" @click="handleClose" class="cancel">
						{{ cancelText || '取消' }}
					</el-button>
					<el-button
						v-if="showConfirm"
						:type="type"
						:disabled="confirmDisabled"
						:loading="confirmLoading"
						@click="handleConfirm"
					>
						{{ confirmText || '确认' }}
					</el-button>
				</slot>
			</div>
		</div>
	</el-drawer>
</template>

<style lang="scss" scoped>
.base-drawer {
	&-header {
		height: 70px;
		padding-left: 30px;
		padding-right: 20px;
		background-color: #f2f8ff;
	}

	&-body {
		padding: 20px;
		flex: auto;
	}

	&-footer {
		height: 80px;
		flex: none;
		z-index: 10;
	}

	.cancel {
		border-color: var(--theme);
		color: var(--theme);
	}

	.title-text {
		font-size: 16px;
		color: var(--black3);
	}

	.icon-close {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		background-color: #d8ecff;
		color: var(--theme);
		margin-left: auto;
		&:hover {
			opacity: 0.8;
		}
	}
}
</style>

<style lang="scss">
.base-drawer {
	.el-drawer__header {
		padding: 0px;
		margin-bottom: 0px;
	}

	.el-drawer__body {
		padding: 0px;
		.el-select,
		.el-input {
			width: 100%;
			.el-input__wrapper {
				width: 100%;
			}
		}
	}

	&-footer {
		.el-button {
			min-width: 80px;
			height: 36px;
		}
	}
}
</style>

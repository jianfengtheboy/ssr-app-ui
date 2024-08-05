<script lang="ts" setup>
interface IProps {
	title?: string
	visible: boolean
	type?: Status
	top?: string
	width?: string
	customClass?: string
	confirmText?: string
	cancelText?: string
	confirmLoading?: boolean
	confirmDisabled?: boolean
	closeOnClickModal?: boolean
	showFooter?: boolean
	showConfirm?: boolean
	showCancel?: boolean
	destroyOnClose?: boolean
	beforeClose?: Function
}

const props = withDefaults(defineProps<IProps>(), {
	type: 'primary',
	width: '600px',
	closeOnClickModal: false,
	showFooter: true,
	showConfirm: true,
	showCancel: true,
	destroyOnClose: true,
})

const emit = defineEmits(['confirm', 'close', 'opened'])

const handleConfirm = () => {
	emit('confirm')
}
const handleClose = () => {
	emit('close')
}
const handleOpened = () => {
	emit('opened')
}
const handleBeforeClose = done => {
	// 关闭弹窗前，判断是否需要阻止
	if (props.beforeClose && props.beforeClose() === false) {
		return
	}
	done()
}
</script>

<template>
	<el-dialog
		:class="`base-dialog ${customClass}`"
		:title="title"
		:model-value="visible"
		:width="width"
		:top="top"
		:destroy-on-close="destroyOnClose"
		append-to-body
		:close-on-click-modal="closeOnClickModal"
		@close="handleClose"
		@opened="handleOpened"
		:before-close="handleBeforeClose"
	>
		<template #header>
			<div v-if="!title">
				<slot name="header"></slot>
			</div>
		</template>

		<slot></slot>

		<template #footer>
			<div v-if="showFooter" class="footer">
				<slot name="footer">
					<slot name="customBtn"></slot>
					<el-button v-if="showCancel" @click="handleClose" class="footer-cancel">
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
		</template>
	</el-dialog>
</template>

<style lang="scss">
.base-dialog {
	border-radius: 10px;
	.el-dialog__header {
		padding: 18px 0;
		text-align: center;
		background-color: #ebf3ff;
		margin-right: 0;
		border-radius: 10px 10px 0 0;
	}

	.el-dialog__title {
		font-size: 16px;
		font-weight: bold;
		color: var(--black3);
	}

	.el-dialog__headerbtn {
		width: 20px;
		height: 20px;
		background-color: #d7e9ff;
		border-radius: 50%;
		top: 20px;
		right: 20px;

		&:hover {
			.el-dialog__close {
				opacity: 0.8;
			}
		}
	}

	.el-dialog__close {
		color: var(--theme);
	}

	.el-dialog__body {
		padding: 20px 30px;
		color: var(--black3);
	}

	.el-dialog__footer {
		padding: 12px 20px;
		border-top: 1px solid #dcdcdc;
		text-align: right;
	}

	.footer {
		.el-button {
			min-width: 80px;
			height: 36px;
		}

		&-cancel {
			border-color: var(--theme) !important;
			color: var(--theme) !important;
		}
	}
}
</style>

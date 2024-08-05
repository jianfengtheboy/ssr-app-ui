<script lang="ts" setup>
interface IProps {
	type?: Status
	// 指定颜色
	color?: string
	// dot的大小，单位为px
	size?: number
	// dot是否为空心
	hollow?: boolean
}

withDefaults(defineProps<IProps>(), {
	type: 'info',
	hollow: false,
})
</script>

<template>
	<div class="base-dot flex items-center">
		<div
			:class="['circle', `circle-${type}`]"
			:style="{
				'background-color': hollow ? '#fff' : color,
				'border-color': color,
				width: size + 'px',
				height: size + 'px',
			}"
		/>
		<div :style="{ color }">
			<slot></slot>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.base-dot {
	.circle {
		flex: none;
		width: 8px;
		height: 8px;
		margin-right: 8px;
		border-radius: 50%;
		border: 1px solid transparent;

		&-primary {
			background-color: var(--theme);
			border-color: var(--theme);
			color: var(--theme);
		}
		&-success {
			background-color: var(--green);
			border-color: var(--green);
			color: var(--green);
		}
		&-info {
			background-color: var(--gray);
			border-color: var(--gray);
			color: var(--gray);
		}
		&-warning {
			background-color: var(--orange);
			border-color: var(--orange);
			color: var(--orange);
		}
		&-danger {
			background-color: var(--red);
			border-color: var(--red);
			color: var(--red);
		}
	}
}
</style>

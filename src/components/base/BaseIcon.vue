<script lang="ts" setup>
import type { CSSProperties } from 'vue'

interface IProps {
	// 图标大小
	size?: string | number
	//  图标颜色
	color?: string
	// 是否旋转
	spin?: boolean
	// 线条的粗细(1.先去掉svg图标代码中自身固定的strokeWidth，2.设置之后需要重启项目才有效果)
	strokeWidth?: string | number
	// 旋转角度
	rotate?: number
	isButton?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
	size: 14,
	strokeWidth: 4,
	isButton: false,
})

const iconStyle = computed<CSSProperties>(() => ({
	fontSize: typeof props.size === 'string' ? props.size : `${props.size}px`,
	color: props.color,
	strokeWidth: props.strokeWidth,
	transform: `rotateZ(${props.rotate}deg)`,
}))

const className = computed(() => {
	const classArr = ['base-icon']
	if (props.isButton) {
		classArr.push('icon-button')
	}
	if (props.spin) {
		classArr.push('spin')
	}
	return classArr.join(' ')
})
</script>

<template>
	<i :class="className" :style="iconStyle">
		<slot></slot>
	</i>
</template>

<style lang="scss">
.base-icon {
	display: inline-flex;
	justify-content: center;
	align-items: center;
	height: 1em;
	width: 1em;
	fill: currentColor;
	stroke: currentColor;

	&.spin {
		animation: spinning 2s cubic-bezier(0, 0, 1, 1) infinite;
	}

	svg {
		height: 1em;
		width: 1em;
	}
}
.icon-button {
	cursor: pointer;
	&:hover {
		color: var(--theme);
	}
}

@keyframes spinning {
	0% {
		transform: rotateZ(0deg);
	}
	100% {
		transform: rotateZ(360deg);
	}
}
</style>

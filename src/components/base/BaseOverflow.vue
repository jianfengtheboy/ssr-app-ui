<script lang="ts" setup>
// 单行 或 多行溢出
import type { ElTooltip } from 'element-plus'
type ElTooltipInstance = InstanceType<typeof ElTooltip>

interface IProps {
	// 要显示的行数
	lineNumber: number
	// 提示内容
	content?: string
	// 是否显示tip
	showTip?: boolean
	// tip显示位置
	placement?:
		| 'top'
		| 'top-start'
		| 'top-end'
		| 'bottom'
		| 'bottom-start'
		| 'bottom-end'
		| 'left'
		| 'left-start'
		| 'left-end'
		| 'right'
		| 'right-start'
		| 'right-end'
	// 自定义类名
	className?: string
}

const prop = withDefaults(defineProps<IProps>(), {
	lineNumber: 1,
	showTip: true,
	placement: 'bottom',
})

let showTooltip = ref(true)

const onMouseEnter = e => {
	if (!prop.showTip) return
	const dom = e.target
	showTooltip.value = !(dom.offsetWidth < dom.scrollWidth || dom.offsetHeight < dom.scrollHeight)
}
</script>

<template>
	<el-tooltip v-bind="$attrs" :disabled="showTooltip" :placement="placement">
		<template #content>
			<span v-if="content">{{ content }}</span>
			<span v-else>
				<slot></slot>
			</span>
		</template>

		<div :class="[lineNumber > 1 ? 'text-ellipsis-multiple' : 'truncate', className]" @mouseenter.stop="onMouseEnter">
			<slot></slot>
		</div>
	</el-tooltip>
</template>

<style lang="scss" scoped>
//多行文本文字超过行数限制后显示省略号
.text-ellipsis-multiple {
	word-break: break-all;
	text-overflow: ellipsis;
	overflow: hidden;
	display: -moz-box;
	display: -webkit-box;
	display: -ms-flexbox;
	-webkit-box-orient: vertical;
	-moz-box-orient: vertical;
	-webkit-line-clamp: v-bind('prop.lineNumber');
}
</style>

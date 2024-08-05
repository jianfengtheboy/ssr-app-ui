<script lang="ts" setup>
import { IEnumResult } from '@/model/enum'

interface IProps {
	enumModel?: IEnumResult
	modelValue?: string | number
	showMode?: 'span' | 'tag' | 'select'
	placeholder?: string
	clearable?: boolean
}
const props = withDefaults(defineProps<IProps>(), {
	showMode: 'span',
	modelValue: '',
})

const emits = defineEmits(['update:modelValue', 'change'])

const selectValue = computed({
	get: () => props.modelValue,
	set: val => {
		emits('update:modelValue', val)
		emits('change', val)
	},
})

const getTagType = () => {
	if (props.modelValue) {
		const status = props.enumModel?.getStatus(props.modelValue)
		if (status === 'primary') return ''
		return status
	}
	return 'success'
}
</script>

<template>
	<span v-if="showMode === 'span'">
		{{ enumModel && enumModel[modelValue] }}
	</span>
	<el-tag v-else-if="showMode === 'tag'" :type="getTagType()">
		{{ enumModel && enumModel[modelValue] }}
	</el-tag>
	<el-select
		v-else-if="showMode === 'select'"
		v-model="selectValue"
		:placeholder="placeholder || '请选择'"
		:clearable="clearable"
	>
		<el-option v-for="item in enumModel?.origin" :key="item.id" :value="item.id" :label="item.name"></el-option>
	</el-select>
</template>

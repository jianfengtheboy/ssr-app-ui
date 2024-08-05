<script lang="ts" setup>
import { reactive, VNodeRef } from 'vue'
import { EnumFormType } from '@/model/form'
import { ISearchConfig, ISearchFromItem } from '@/model/search'
import { isEmpty } from '@/utils/common'
import _ from 'lodash'

interface IProps {
	searchConfig: ISearchConfig
	searchFormRef: VNodeRef
}
const props = withDefaults(defineProps<IProps>(), {})

const querys = reactive({})
defineExpose({
	// 获取查询条件
	getQuerys: () => {
		return querys
	},
	// 设置查询条件
	setQuerys: (params: object, refersh?: boolean) => {
		if (typeof params !== 'object') return
		const items = _.get(props, 'searchConfig.items', [])
		items.forEach((ele: ISearchFromItem) => {
			const { prop, defaultValue } = ele
			querys[prop] = !isEmpty(params[prop]) ? params[prop] : defaultValue || undefined
		})
		if (refersh !== false) emits('handleSearch')
	},
	getSearchCriteria: () => {
		return props.searchConfig.items.map(item => {
			return {
				type: item.comparator,
				key: item.prop,
				value: querys[item.prop],
			}
		})
	},
})
const emits = defineEmits(['handleSearch', 'resetSearch'])

const ElDateMap = {
	[EnumFormType.date]: 'date',
	[EnumFormType.dateRange]: 'daterange',
	[EnumFormType.datetime]: 'datetime',
	[EnumFormType.datetimeRange]: 'datetimerange',
}

const resetSearch = () => {
	initParams()
	emits('resetSearch')
}

const initParams = () => {
	const items = _.get(props, 'searchConfig.items', [])
	items.forEach((ele: ISearchFromItem) => {
		const { defaultValue } = ele
		if (!isEmpty(defaultValue)) {
			querys[ele.prop] = defaultValue
		}
	})
}

// 返回时间选择props
const getDatePickerProp = (item: ISearchFromItem) => {
	const props = {
		type: ElDateMap[item.mode],
		'range-separator': item.rangeSeparator || '-',
		'start-placeholder': item.startPlaceholder || '开始日期',
		'end-placeholder': item.endPlaceholder || '结束日期',
		placeholder: item.placeholder || '请选择',
		'value-format': 'YYYY-MM-DD HH:mm:ss',
	}
	if (item.defaultTime) {
		props['default-time'] = item.defaultTime
	}
	return props
}

// 修改查询条件之后，是否触发查询
const handleChangeSearch = (item: ISearchFromItem) => {
	const { refersh } = item
	if (refersh) emits('handleSearch')
}

const getPlaceholder = (item: ISearchFromItem) => {
	return item.placeholder || ''
}

const getLabel = (item: ISearchFromItem) => {
	return item.label || ''
}

onMounted(() => {
	initParams()
})
</script>

<template>
	<el-form class="search-con" :inline="true" :model="querys" :ref="props.searchFormRef" @submit.prevent>
		<el-form-item v-for="(item, index) in searchConfig.items" :key="index" :label="getLabel(item)" :prop="item.prop">
			<el-input
				v-if="item.mode === EnumFormType.input"
				v-model.trim="querys[item.prop]"
				:placeholder="getPlaceholder(item)"
				:maxlength="item.maxlength || 100"
				:clearable="item.clearable === false ? false : true"
			/>
			<el-select
				v-else-if="item.mode === EnumFormType.select"
				v-model="querys[item.prop]"
				:placeholder="getPlaceholder(item)"
				:loading="item.loading"
				@change="() => handleChangeSearch(item)"
				:clearable="item.clearable === false ? false : true"
			>
				<el-option v-for="(select, key) in item.selectModel" :key="key" :label="select.label" :value="select.value" />
			</el-select>
			<el-date-picker
				v-else-if="
					[EnumFormType.date, EnumFormType.dateRange, EnumFormType.datetime, EnumFormType.datetimeRange].includes(
						item.mode
					)
				"
				v-bind="getDatePickerProp(item)"
				v-model="querys[item.prop]"
				value-format="YYYY-MM-DD HH:mm:ss"
				:default-time="[new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)]"
				@change="() => handleChangeSearch(item)"
			/>
			<el-cascader
				v-else-if="item.mode === EnumFormType.cascader"
				v-model="querys[item.prop]"
				:options="item.options"
				:props="item.props"
				:placeholder="getPlaceholder(item)"
				:clearable="item.clearable === false ? false : true"
				@change="() => handleChangeSearch(item)"
			>
				<template #="{ data }">
					<BaseOverflow className="cascader-node">{{ data.name }}</BaseOverflow>
				</template>
			</el-cascader>
			<el-tree-select
				v-else-if="item.mode === EnumFormType.treeSelect"
				v-model="querys[item.prop]"
				:data="item.selectModel"
				:render-after-expand="false"
				:check-strictly="item.checkModel"
				clearable
			/>
			<BaseEnum
				v-else-if="item.mode === EnumFormType.enum"
				v-model="querys[item.prop]"
				:enum-model="item.enumModel"
				:show-mode="'select'"
				:placeholder="getPlaceholder(item)"
				:clearable="item.clearable === false ? false : true"
				@change="() => handleChangeSearch(item)"
			/>
		</el-form-item>
		<el-form-item>
			<BaseSearchButton @search="emits('handleSearch')" @reset="resetSearch" v-if="searchConfig.items.length > 0" />
			<slot name="oper"></slot>
		</el-form-item>
	</el-form>
</template>

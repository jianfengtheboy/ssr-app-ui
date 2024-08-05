<script lang="ts" setup>
import { ITableConfig, IColumnConfig } from '@/model/table'
import { ElTable } from 'element-plus'

onMounted(() => {
	getOthersHeight()
})

interface IProps {
	// 配置相关
	tableConfig: ITableConfig
	// 是否显示选择框
	showCheckBox?: boolean
	// 是否显示序号
	showIndex?: boolean
	// 自定义类名
	rowClassName?: Function
	// 是否动态设置高度
	autoHeight?: boolean
	// 数据相关
	data: Array<any>
	loading: boolean
	// 分页相关
	total: number
	page: number
	selectableFn?: ((row: any, index: number) => boolean) | undefined
	rowKey?: string | ((row: any) => string) | undefined
	treeProps?: object
	showPagination?: boolean
}
const props = withDefaults(defineProps<IProps>(), {
	loading: false,
	showCheckBox: false,
	showIndex: false,
	showPagination: true,
})

const emit = defineEmits(['current-change', 'selection-change', 'row-click', 'select', 'select-all', 'sort-change'])

const renderTableColumn = computed(() => {
	return props.tableConfig.items
		.filter(item => {
			if (typeof item.visible === 'function') {
				return item.visible()
			}
			return true
		})
		.sort((a, b) => {
			return (a.sort || 0) - (b.sort || 0)
		})
})

const renderTableFiled = (row: Object, config: IColumnConfig) => {
	const { formatter, prop } = config
	const initValue = row[prop]
	if (!formatter) return initValue

	if (initValue != undefined) {
		if (formatter === '%') {
			return (initValue / 100).toFixed(2)
		}
		if (formatter === '0.0') {
			return (initValue / 100).toFixed(1)
		}
		if (typeof formatter === 'function') {
			return formatter(initValue)
		}
	}
}

const handleSelectionChange = val => {
	emit('selection-change', val)
}

// 手动选中、取消选中
const handleSelect = (selection, row) => {
	emit('select', {
		selection,
		row,
	})
}

// 手动全选、取消全选
const handleSelectAll = selection => {
	emit('select-all', selection)
}

const rowClassNameFn = ({ row, rowIndex }) => {
	if (typeof props.rowClassName === 'function') return props.rowClassName(row)
	return ''
}
const handleRowClick = row => {
	emit('row-click', row)
}
const handleSortChange = row => {
	emit('sort-change', row)
}

const currentPage = computed({
	get() {
		return props.page
	},
	set(val: number) {
		emit('current-change', val)
	},
})

enum EnumColumnRenderMode {
	enum,
	default,
}
const getCloumnRenderMode = (row: IColumnConfig) => {
	if (row.enumModel) {
		return EnumColumnRenderMode.enum
	}
	return EnumColumnRenderMode.default
}

const getColumnWidth = (row: IColumnConfig) => {
	if (row.width) return row.width
	if (row.label.includes('时间') || row.label.includes('日期')) return '190px'
	return 'auto'
}

const othersHeight = ref(0) // 页面其他元素高度总和
const tableHeight = computed(() => {
	return 'calc(100% - ' + othersHeight.value + 'px)'
})
const getOthersHeight = () => {
	nextTick(() => {
		let element: any = document.getElementById('mainTable')
		let brotherNode = element?.parentNode?.children || []
		for (let index = 0; index < brotherNode.length; index++) {
			if (brotherNode[index] != element) {
				othersHeight.value = othersHeight.value + brotherNode[index].offsetHeight
				othersHeight.value = othersHeight.value + getElementMargin(brotherNode[index], 'margin')
			}
		}
	})
}
// 获取元素margin高度
const getElementMargin = (element, attr) => {
	let curMargin
	if (element.currentStyle) {
		curMargin = element.currentStyle[attr].replaceAll('px', '').split(' ')
	} else {
		curMargin = document?.defaultView?.getComputedStyle(element, null)[attr].replaceAll('px', '').split(' ')
	}
	if (curMargin.length == 1) {
		curMargin = Number(curMargin) * 2
	} else if (curMargin.length == 2) {
		curMargin = Number(curMargin[0]) * 2
	} else if (curMargin.length == 3 || curMargin.length == 4) {
		curMargin = Number(curMargin[0]) + Number(curMargin[2])
	}
	return curMargin
}

const tableRef = ref<InstanceType<typeof ElTable>>()
const getTableRef = () => {
	return tableRef.value
}

defineExpose({
	getTableRef,
})
</script>

<template>
	<el-table
		id="mainTable"
		ref="tableRef"
		:data="data"
		v-loading="loading"
		@selection-change="handleSelectionChange"
		@select-all="handleSelectAll"
		@select="handleSelect"
		:row-key="rowKey"
		:row-class-name="rowClassNameFn"
		:class="{ 'table-box': autoHeight }"
		@row-click="handleRowClick"
		@sort-change="handleSortChange"
		:tree-props="treeProps"
	>
		<el-table-column type="selection" width="50" :selectable="selectableFn" v-if="showCheckBox" />
		<el-table-column type="index" label="序号" width="55" v-if="showIndex" />
		<template v-for="item in renderTableColumn" v-show="item.visible ? item.visible() : true">
			<slot :name="`table-${item.prop}`">
				<el-table-column
					:prop="item.prop"
					:label="item.label"
					:sortable="item.sortable === 'custom' ? 'custom' : item.sortable === true ? true : false"
					:width="getColumnWidth(item)"
					:show-overflow-tooltip="tableConfig.isSingleLine"
				>
					<template #default="scope">
						<BaseEnum
							v-if="getCloumnRenderMode(item) === EnumColumnRenderMode.enum"
							:model-value="scope.row[item.prop]"
							:enum-model="item.enumModel"
							:show-mode="item.enumShowMode"
						/>
						<template v-else>
							{{ renderTableFiled(scope.row, item) }}
						</template>
					</template>
				</el-table-column>
			</slot>
		</template>
		<slot name="handle"></slot>
		<template #empty>
			<slot name="empty"></slot>
		</template>
	</el-table>
	<BasePagination
		v-if="total > 0 && showPagination"
		v-model="currentPage"
		:total="total"
		:size="tableConfig.size || 10"
	/>
</template>

<style lang="scss" scoped>
.table-box {
	height: v-bind(tableHeight);
}
</style>

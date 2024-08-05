<script lang="ts" setup>
import _ from 'lodash'
import { EnumFormType } from '~/model/form'
import { ISearchConfig } from '~/model/search'
import { ITableConfig } from '~/model/table'
import message from '~/utils/message'
import { apiDictionaryPage, apiDictionaryDelete } from '~/apis/dictionary'
import MainSearchForm from '~/components/business/MainSearchForm.vue'
import MainTable from '~/components/business/MainTable.vue'
import dialogDictionary from './components/dialogDictionary.vue'

const searchDatas = useDictData()
// 设置页面SEO相关信息
useHead({
	title: '数据字典',
})

definePageMeta({
	title: '数据字典',
	titleEn: 'Dictionary',
})

/***********************************/
/* 查询相关 */
/***********************************/
const searchForm = ref()
const searchConfig = computed<ISearchConfig>(() => {
	return {
		items: [
			{
				label: '类型名称',
				placeholder: '请选择类型名称',
				prop: 'type',
				comparator: 'equals',
				mode: EnumFormType.select,
				loading: searchDatas.dictTypeLoading.value,
				selectModel: searchDatas.dictTypeList.value,
			},
		],
	}
})

const search = useSearch({
	size: 10,
	loadListApi: apiDictionaryPage,
	getQuerys: () => {
		return [
			...searchForm.value?.getSearchCriteria(),
			{
				key: 'parentId',
				type: 'specified',
				value: false,
			},
		]
	},
})

/***********************************/
/* 表格相关 */
/***********************************/
const tableConfig = ref<ITableConfig>({
	size: 10,
	isSingleLine: true,
	items: [
		{ prop: 'typeName', label: '类型名称' },
		{ prop: 'type', label: '类型' },
		{ prop: 'value', label: '数据值' },
		{ prop: 'label', label: '标签名' },
		{ prop: 'remarks', label: '描述' },
		{ prop: 'createdTime', label: '创建时间' },
		{ prop: 'updateTime', label: '修改时间' },
	],
})

/***********************************/
/* 操作相关 */
/***********************************/
const operRef = ref()
const record = ref()
const title = ref('')
const isSub = ref<boolean>(false)
const operType = ref<Operation>('add')
// 新增
const onAddAction = () => {
	operType.value = 'add'
	title.value = '新增数据'
	isSub.value = false
	operRef.value.open()
}

// 新增子类
const onAddSubTypeAction = row => {
	operType.value = 'add'
	title.value = '新增子类'
	isSub.value = true
	record.value = _.cloneDeep(row)
	operRef.value.open()
}

// 编辑
const onEditAction = row => {
	operType.value = 'edit'
	title.value = row.parentId ? '编辑子类' : '编辑数据'
	isSub.value = row.parentId ? true : false
	record.value = _.cloneDeep(row)
	operRef.value.open()
}

// 删除
const onDeleteAction = useConfirm({
	title: '删除',
	message: '请确认是否删除？',
	type: 'primary',
	description: '',
	confirmType: 'delete',
	onConfirm: async (row: any) => {
		try {
			search.tableData.value.splice(row.index, 1, { ...row, loadingDel: true })
			await apiDictionaryDelete(row.id)
			message.success('操作成功')
			// 查询当前页
			search.loadData()
			searchDatas.fetchDictTypeList()
		} catch (err) {
			console.error(err)
		} finally {
			search.tableData.value.splice(row.index, 1, { ...row, loadingDel: false })
		}
	},
})

// 操作完之后的刷新
const handleRefersh = () => {
	if (operType.value == 'add') {
		search.resetSearch()
	}
	if (operType.value == 'edit') {
		search.loadData()
	}
	if (!isSub.value) {
		searchDatas.fetchDictTypeList()
	}
}

onMounted(() => {
	searchDatas.fetchDictTypeList()
	search.handleSearch()
})
</script>

<template>
	<div class="page-content">
		<MainSearchForm
			ref="searchForm"
			:search-config="searchConfig"
			:search-form-ref="search.formRef"
			@handle-search="search.handleSearch"
			@reset-search="search.resetSearch"
		>
			<template #oper>
				<el-button type="primary" @click="onAddAction" v-auth="`sys:dict:save`">新增数据</el-button>
			</template>
		</MainSearchForm>

		<MainTable
			:tableConfig="tableConfig"
			:data="search.tableData.value"
			:loading="search.loading.value"
			:total="search.total.value"
			:page="search.page.value"
			@current-change="search.handleCurrentChange"
			rowKey="id"
			:treeProps="{ children: 'children', hasChildren: 'hasChildren' }"
		>
			<template #empty>
				<BaseEmpty :visible="search.total.value == 0 && !search.loading.value" class="pt-10" />
			</template>
			<template #handle>
				<el-table-column label="操作" width="200px">
					<template #default="scope">
						<el-button link type="primary" @click="onEditAction(scope.row)" v-auth="`sys:dict:update`">
							编辑
						</el-button>
						<el-button
							link
							type="primary"
							@click="onDeleteAction({ ...scope.row, index: scope.$index })"
							:loading="scope.row.loadingDel"
							v-auth="`sys:dict:delete`"
						>
							删除
						</el-button>
						<el-button link type="primary" @click="onAddSubTypeAction(scope.row)" v-auth="`sys:dict:save`">
							新增子类
						</el-button>
					</template>
				</el-table-column>
			</template>
		</MainTable>
	</div>

	<dialogDictionary
		ref="operRef"
		:record="record"
		:operType="operType"
		:title="title"
		:isSub="isSub"
		@refersh="handleRefersh"
	/>
</template>

<style lang="scss" scoped></style>

<script lang="ts" setup>
import _ from 'lodash'
import { EnumFormType } from '~/model/form'
import { ISearchConfig } from '~/model/search'
import { ITableConfig } from '~/model/table'
import message from '~/utils/message'
import { apiSysRolePage, apiSysRoleDelete } from '~/apis/role'
import MainSearchForm from '~/components/business/MainSearchForm.vue'
import MainTable from '~/components/business/MainTable.vue'
import dialogRole from './components/dialogRole.vue'

// 设置页面SEO相关信息
useHead({
	title: '角色管理',
})

definePageMeta({
	title: '角色管理',
	titleEn: 'Role',
})

const userInfo = computed(() => useAppStore().userInfo)
/***********************************/
/* 查询相关 */
/***********************************/
const searchForm = ref()
const searchConfig = ref<ISearchConfig>({
	items: [
		{
			label: '角色名称',
			prop: 'name',
			comparator: 'contains',
			mode: EnumFormType.input,
		},
	],
})
const search = useSearch({
	size: 10,
	loadListApi: apiSysRolePage,
	getQuerys: () => {
		return [
			...searchForm.value?.getSearchCriteria(),
			{
				key: 'companyId',
				type: 'equals',
				value: userInfo.value.companyId,
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
		{ prop: 'name', label: '角色名称' },
		{ prop: 'relateUserCount', label: '关联用户数' },
		{ prop: 'createdTime', label: '创建时间' },
		{ prop: 'remarks', label: '备注' },
	],
})

/***********************************/
/* 操作相关 */
/***********************************/
const operRef = ref()
const record = ref() // 编辑的数据
const operType = ref<Operation>('add')
// 编辑角色
const handleEdit = row => {
	record.value = _.cloneDeep(row)
	operType.value = 'edit'
	operRef.value.open()
}

// 新增角色
const handleAdd = () => {
	operType.value = 'add'
	operRef.value.open()
}

// 删除角色
const handleDel = useConfirm({
	title: '删除',
	message: '请确认是否删除？',
	description: '',
	type: 'primary',
	confirmType: 'delete',
	onConfirm: async (row: any) => {
		try {
			search.tableData.value.splice(row.index, 1, { ...row, loadingDel: true })
			await apiSysRoleDelete(row.id)
			message.success('操作成功')
			// 查询当前页
			search.loadData()
		} catch (err) {
			console.error(err)
		} finally {
			search.tableData.value.splice(row.index, 1, { ...row, loadingDel: false })
		}
	},
})

// 操作完之后的刷新
const handleRefersh = () => {
	if (operType.value === 'add') {
		search.resetSearch()
	}
	if (operType.value === 'edit') {
		search.loadData()
	}
}

onMounted(() => {
	search.handleSearch()
})
</script>

<template>
	<div class="page-content">
		<MainSearchForm
			ref="searchForm"
			:search-form-ref="search.formRef"
			:search-config="searchConfig"
			@handle-search="search.handleSearch"
			@reset-search="search.resetSearch"
		>
			<template #oper>
				<el-button type="primary" @click="handleAdd" v-auth="`sys:roles:save`">新增角色</el-button>
			</template>
		</MainSearchForm>

		<MainTable
			:tableConfig="tableConfig"
			:data="search.tableData.value"
			:loading="search.loading.value"
			:total="search.total.value"
			:page="search.page.value"
			@current-change="search.handleCurrentChange"
		>
			<template #empty>
				<BaseEmpty :visible="search.total.value == 0 && !search.loading.value" class="pt-10" />
			</template>
			<template #handle>
				<el-table-column label="操作" width="150px">
					<template #default="scope">
						<el-button link type="primary" @click="handleEdit(scope.row)" v-auth="`sys:roles:update`">编辑</el-button>
						<el-button
							link
							class="ml-2"
							type="primary"
							@click="handleDel({ ...scope.row, index: scope.$index })"
							v-auth="`sys:roles:delete`"
							:loading="scope.row.loadingDel"
						>
							删除
						</el-button>
					</template>
				</el-table-column>
			</template>
		</MainTable>
	</div>

	<dialogRole ref="operRef" :record="record" :operType="operType" @refersh="handleRefersh" />
</template>

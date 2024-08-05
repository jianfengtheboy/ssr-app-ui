<script lang="ts" setup>
import { EnumFormType } from '~/model/form'
import { ISearchConfig } from '~/model/search'
import { ITableConfig } from '~/model/table'
import { apiSysLogList } from '~/apis/log'
import MainSearchForm from '~/components/business/MainSearchForm.vue'
import MainTable from '~/components/business/MainTable.vue'

// 设置页面SEO相关信息
useHead({
	title: '系统日志',
})

definePageMeta({
	title: '系统日志',
	titleEn: 'Log',
})

const userInfo = useAppStore().userInfo

/***********************************/
/* 查询相关 */
/***********************************/
const searchForm = ref()
const searchConfig = computed<ISearchConfig>(() => {
	return {
		items: [
			{
				label: '用户名称',
				placeholder: '请输入用户名称',
				prop: 'userName',
				comparator: 'contains',
				mode: EnumFormType.input,
			},
			{
				label: '用户操作',
				placeholder: '请输入用户操作',
				prop: 'operation',
				comparator: 'contains',
				mode: EnumFormType.input,
			},
			{
				label: '时间段',
				prop: 'createdTime',
				comparator: 'than',
				mode: EnumFormType.datetimeRange,
				rangeSeparator: '至',
				defaultTime: [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)],
			},
		],
	}
})

const search = useSearch({
	size: 10,
	loadListApi: apiSysLogList,
	getQuerys: () => {
		return [
			...searchForm.value?.getSearchCriteria(),
			{
				key: 'companyId',
				type: 'equals',
				value: userInfo.companyId,
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
		{ prop: 'userName', label: '用户名称' },
		{ prop: 'operation', label: '用户操作' },
		{ prop: 'method', label: '请求方法' },
		{ prop: 'params', label: '请求参数' },
		{ prop: 'time', label: '执行时长(ms)', width: '120px' },
		{ prop: 'createdTime', label: '执行时间' },
		{ prop: 'result', label: '请求结果' },
	],
})

onMounted(() => {
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
		/>

		<MainTable
			:tableConfig="tableConfig"
			:data="search.tableData.value"
			:loading="search.loading.value"
			:total="search.total.value"
			:page="search.page.value"
			@current-change="search.handleCurrentChange"
		>
			<template #table-params>
				<el-table-column label="请求参数">
					<template #default="scope">
						<el-popover placement="right" :width="400" trigger="click">
							<div class="content">
								<pre>{{ scope.row.params }}</pre>
							</div>
							<template #reference>
								<div class="truncate el-link inline-block max-w-full el-link--primary is-underline">
									{{ scope.row.params }}
								</div>
							</template>
						</el-popover>
					</template>
				</el-table-column>
			</template>
			<template #table-result>
				<el-table-column label="请求结果">
					<template #default="scope">
						<el-popover placement="top" :width="350" trigger="click">
							<div class="content">
								<pre>{{ scope.row.result }}</pre>
							</div>
							<template #reference>
								<div class="truncate el-link inline-block max-w-full el-link--primary is-underline">
									{{ scope.row.result }}
								</div>
							</template>
						</el-popover>
					</template>
				</el-table-column>
			</template>
			<template #empty>
				<BaseEmpty :visible="search.total.value == 0 && !search.loading.value" class="pt-10" />
			</template>
		</MainTable>
	</div>
</template>

<style lang="scss" scoped>
.content {
	max-height: 60vh;
	margin-right: -12px;
	padding-right: 12px;
	overflow-x: hidden;
	overflow-y: auto;
}
</style>

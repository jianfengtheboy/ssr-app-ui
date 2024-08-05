<script lang="ts" setup>
import _ from 'lodash'
import { EnumFormType } from '~/model/form'
import { ISearchConfig } from '~/model/search'
import { ITableConfig } from '~/model/table'
import { apiSysUserPage, apiSysUserDelete, apiSysUserPwdReset, apiSysUserDisable, apiSysUserEnable } from '~/apis/users'
import { EnumUserState } from '~/config/enum'
import message from '~/utils/message'
import MainSearchForm from '~/components/business/MainSearchForm.vue'
import MainTable from '~/components/business/MainTable.vue'
import dialogUser from './components/dialogUser.vue'

// 设置页面SEO相关信息
useHead({
	title: '用户管理',
})

definePageMeta({
	title: '用户管理',
	titleEn: 'User',
})

const userInfo = computed(() => useAppStore().userInfo)
const permissions = computed(() => useAppStore().permissions)

const userDisabled = [1, userInfo.value.id]

/***********************************/
/* 查询相关 */
/***********************************/
const searchForm = ref()
const searchConfig = computed<ISearchConfig>(() => {
	return {
		items: [
			{
				label: '用户名',
				placeholder: '请输入用户名',
				prop: 'userName',
				comparator: 'contains',
				mode: EnumFormType.input,
				maxlength: 32,
			},
			{
				label: '状态',
				placeholder: '请选择状态',
				prop: 'status',
				comparator: 'equals',
				mode: EnumFormType.enum,
				enumModel: EnumUserState,
			},
			{
				label: '手机号',
				placeholder: '请输入手机号',
				prop: 'mobile',
				comparator: 'contains',
				mode: EnumFormType.input,
				maxlength: 11,
			},
		],
	}
})

const search = useSearch({
	size: 10,
	loadListApi: apiSysUserPage,
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
		{ prop: 'userName', label: '用户名' },
		{ prop: 'email', label: '邮箱' },
		{ prop: 'mobile', label: '手机号' },
		{ prop: 'sysRoles', label: '角色' },
		{ prop: 'createdTime', label: '创建时间' },
		{ prop: 'status', label: '状态' },
	],
})

/***********************************/
/* 操作相关 */
/***********************************/
const operRef = ref()
const record = ref() // 编辑的数据
const operType = ref<Operation>('add')
// 编辑用户
const handleEdit = row => {
	const params = {
		...row,
		sysRoles: row.sysRoles ? row.sysRoles[0].id : '',
	}
	record.value = _.cloneDeep(params)
	operType.value = 'edit'
	operRef.value.open()
}

// 新增用户
const handleAdd = () => {
	operType.value = 'add'
	operRef.value.open()
}

// 删除用户
const handleDel = (row, index) => {
	useConfirm({
		title: '删除',
		message: '请确认是否删除？',
		description: '',
		type: 'primary',
		confirmType: 'delete',
		onConfirm: async () => {
			try {
				search.tableData.value.splice(index, 1, { ...row, loadingDel: true })
				await apiSysUserDelete(row.id)
				message.success('操作成功')
				// 查询当前页
				search.loadData()
			} catch (error) {
				console.log(error)
			} finally {
				search.tableData.value.splice(index, 1, { ...row, loadingDel: false })
			}
		},
	})(row)
}

// 重置密码
const onResetPwdAction = useConfirm({
	title: '提示',
	message: '请确认是否重置密码？',
	description: '',
	type: 'warning',
	onConfirm: async (row: any) => {
		try {
			await apiSysUserPwdReset({ id: row.id })
			message.success('操作成功，密码重置为12345678')
			// 查询当前页
			search.loadData()
		} catch (error) {
			console.log(error)
		}
	},
})

// 启用、禁用
const handleChange = async (row, done) => {
	useConfirm({
		title: '提示',
		message: `请确认是否${row.status == 1 ? '禁用' : '启用'}？`,
		description: '',
		type: 'primary',
		onConfirm: async () => {
			try {
				row.status == 1 ? await apiSysUserDisable(row.id) : await apiSysUserEnable(row.id)
				message.success('操作成功')
				search.loadData()
				done && done()
			} catch (error) {
				console.log(error)
				done && done()
			}
		},
		onClose: async () => {
			done && done()
		},
	})(row)
}

// 操作完之后的刷新
const handleRefersh = () => {
	if (operType.value === 'add') {
		search.resetSearch()
	}
	if (operType.value === 'edit') {
		search.loadData()
	}
}

// 启用禁用按钮权限处理
const disabledStatus = id => {
	if (userDisabled.includes(id)) return true
	if (permissions.value.includes('sys:users:enable') || permissions.value.includes('sys:users:disable')) return false
	return true
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
				<el-button type="primary" @click="handleAdd" v-auth="`sys:users:save`">新增用户</el-button>
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
			<template #table-mobile>
				<el-table-column label="手机号" show-overflow-tooltip>
					<template #default="scope">
						{{ scope.row.mobile?.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') }}
					</template>
				</el-table-column>
			</template>
			<template #table-sysRoles>
				<el-table-column label="角色" show-overflow-tooltip>
					<template #default="scope">
						{{ scope.row.sysRoles?.map(v => v.name).join(',') }}
					</template>
				</el-table-column>
			</template>
			<template #table-status>
				<el-table-column label="状态">
					<template #default="scope">
						<BaseSwitch
							v-show="scope.row.status != 2"
							:modelValue="scope.row.status"
							:text="scope.row.status == 1 ? '启用' : '禁用'"
							:activeValue="1"
							:inactiveValue="0"
							:disabled="disabledStatus(scope.row.id)"
							@change="done => handleChange(scope.row, done)"
						>
						</BaseSwitch>
						<span v-show="scope.row.status == 2">已锁定</span>
					</template>
				</el-table-column>
			</template>
			<template #handle>
				<el-table-column label="操作" width="200px">
					<template #default="scope">
						<template v-if="!userDisabled.includes(scope.row.id)">
							<el-button link type="primary" @click="onResetPwdAction(scope.row)" v-auth="`sys:users:resetpwd`">
								重置密码
							</el-button>
							<el-button link type="primary" @click="handleEdit(scope.row)" v-auth="`sys:users:update`">
								编辑
							</el-button>
							<el-button
								link
								type="primary"
								@click="handleDel(scope.row, scope.$index)"
								:loading="scope.row.loadingDel"
								v-auth="`sys:user:delete`"
							>
								删除
							</el-button>
						</template>
					</template>
				</el-table-column>
			</template>
			<template #empty>
				<BaseEmpty :visible="search.total.value == 0 && !search.loading.value" class="pt-10" />
			</template>
		</MainTable>
	</div>

	<!-- 新增、编辑 -->
	<dialogUser ref="operRef" :record="record" :operType="operType" @refersh="handleRefersh" />
</template>

<style lang="scss" scoped></style>

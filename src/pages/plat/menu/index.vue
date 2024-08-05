<script lang="ts" setup>
import _ from 'lodash'
import { EnumMenuType } from '~/config/enum'
import { IMenu } from '~/model/common'
import message from '~/utils/message'
import { apiSysMenuList, apiSysMenuDelete } from '~/apis/menu'
import dialogMenu from './components/dialogMenu.vue'

// 设置页面SEO相关信息
useHead({
	title: '菜单管理',
})

definePageMeta({
	title: '菜单管理',
	titleEn: 'Menu',
})

const tableData = ref<IMenu[]>([])
const loading = ref<boolean>(false)

const loop = (menus: IMenu[]) => {
	menus.forEach(item => {
		if (item.children) {
			item.children.forEach(child => {
				child.parentId = item.id
				child.parentName = item.name
			})
			loop(item.children)
		}
	})
}

const loadData = async () => {
	try {
		loading.value = true
		const { body = [] } = (await apiSysMenuList({})) as any
		loop(body)
		tableData.value = body
	} catch (error) {
	} finally {
		loading.value = false
	}
}

/***********************************/
/* 操作相关 */
/***********************************/
const operRef = ref()
const record = ref() // 编辑的数据
const operType = ref<Operation>('add')
// 编辑
const handleEdit = row => {
	record.value = _.cloneDeep(row)
	operType.value = 'edit'
	operRef.value.open()
}

// 新增
const handleAdd = () => {
	operType.value = 'add'
	operRef.value.open()
}

// 删除
const handleDel = useConfirm({
	title: '删除',
	message: '请确认是否删除？',
	description: '',
	type: 'primary',
	confirmType: 'delete',
	onConfirm: async (row: any) => {
		try {
			await apiSysMenuDelete(row.id)
			message.success('操作成功')
			// 查询当前页
			loadData()
		} catch (err) {
			console.error(err)
		} finally {
		}
	},
})

// 操作完之后的刷新
const handleRefersh = () => {
	loadData()
}

onMounted(() => {
	loadData()
})
</script>

<template>
	<div class="page-content">
		<div class="mb-5">
			<el-button type="primary" @click="handleAdd" v-auth="`sys:menus:save`">新增</el-button>
		</div>

		<el-table :data="tableData" v-loading="loading" row-key="id">
			<el-table-column prop="id" label="ID"></el-table-column>
			<el-table-column prop="name" label="名称"></el-table-column>
			<el-table-column prop="icon" label="图标"></el-table-column>
			<el-table-column prop="type" label="类型">
				<template #default="scope">
					<BaseEnum v-model="scope.row.type" :enumModel="EnumMenuType" :show-mode="'tag'" />
				</template>
			</el-table-column>
			<el-table-column prop="orderNum" label="排序号"></el-table-column>
			<el-table-column prop="url" label="菜单URL"></el-table-column>
			<el-table-column prop="perms" label="授权标识"></el-table-column>
			<el-table-column label="操作" width="120px">
				<template #default="scope">
					<el-link type="primary" :underline="false" @click="handleEdit(scope.row)" v-auth="`sys:menus:update`">
						编辑
					</el-link>
					<el-link
						type="primary"
						:underline="false"
						@click="handleDel({ ...scope.row, index: scope.$index })"
						class="ml-2"
						:loading="scope.row.loadingDel"
						v-auth="`sys:menus:delete`"
					>
						删除
					</el-link>
				</template>
			</el-table-column>
		</el-table>
	</div>

  <dialogMenu ref="operRef" :record="record" :operType="operType" @refersh="handleRefersh" :menus="tableData" />
</template>

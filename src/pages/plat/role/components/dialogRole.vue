<script lang="ts" setup>
import _ from 'lodash'
import { IMenu, IRole, IRoleSave, IRoleApp } from '~/model/common'
import { getTreeNodeValue } from '~/utils/menu'
import message from '~/utils/message'
import { apiSysAppRole, apiSysRoleSave, apiSysRoleUpdate, getSysMenuNavByType } from '~/apis/role'

const userInfo = computed(() => useAppStore().userInfo)
const oper = useOperation()

defineExpose({
	open() {
		oper.visible.value = true
	},
})

const emits = defineEmits(['refersh'])

interface IProps {
	record?: IRole
	operType: Operation
}
const props = withDefaults(defineProps<IProps>(), {
	operType: 'add',
})

// 初始化表单
const initFromData = (): IRoleSave => {
	return {
		name: '',
		serverType: userInfo.value.defaultServerType,
		sysMenus: [],
		remarks: '',
		sysRoleApps: [],
	}
}
const formData = ref<IRoleSave>(initFromData())

const rules = {
	name: [{ required: true, message: '请输入角色名称', trigger: 'change' }],
	sysMenus: [{ required: true, message: '请选择菜单', trigger: 'change' }],
	sysRoleApps: [{ required: true, message: '请选择应用角色', trigger: 'change' }],
}

const defaultProps = {
	children: 'children',
	label: 'name',
}

// 默认选择的菜单id
let checkedKeys = ref<number[]>([])

const handleOpen = async () => {
	checkedKeys.value = []
	if (props.operType === 'add') {
		handleChangeRole()
		formData.value = initFromData()
	} else if (props.operType === 'edit') {
		formData.value = {
			...formData.value,
			...(props.record || {}),
		}
		// 菜单列表复显
		await loadRolesMenusData(formData.value.serverType)
		checkedKeys.value = getTreeNodeValue(formData.value.sysMenus, 'id')
		// 应用/应用角色复显
		formData.value.sysRoleApps = props.record?.sysRoleApps?.map((v: IRoleApp) => {
			return v.appRoleId ? [v.appId, v.appRoleId] : [v.appId]
		}) as any
	}
}

onMounted(async () => {
	await fetchAppRole()
})

const handleChangeRole = () => {
	sysMenus.value = []
	checkedKeys.value = []
	loadRolesMenusData(userInfo.value.defaultServerType)
}

const getMyApp = useAppData({
	size: 1000,
	criteria: {
		companyId: {
			equals: userInfo.value.companyId,
		},
	},
})

const roleAppsOptions = ref([])
// 获取应用/应用角色
const fetchAppRole = async () => {
	await getMyApp.fetchMyApp()
	const response: any = await apiSysAppRole({
		appIds: getMyApp.myAppList.value.map(v => v.id),
	})
	roleAppsOptions.value = (response.body || []).map(app => ({
		id: app.appId,
		name: app.appName,
		children: app.roleList.map(v => ({
			id: v.id,
			name: v.roleName,
			children: [],
		})),
	}))
}

// 应用级联选择器配置
const roleAppsProps = ref({
	multiple: true,
	value: 'id',
	children: 'children',
	label: 'name',
})

const submitLoading = ref(false)
const handlSubmit = async () => {
	//点击编辑、不勾选角色、保存后拿不到全部节点，这里再获取一遍
	formData.value.sysMenus = treeRef.value!.getCheckedNodes()
	try {
		await oper.formRef.value?.validate()
		submitLoading.value = true
		let params: any = _.cloneDeep({
			...formData.value,
			companyId: userInfo.value.companyId,
		})
		for (const key in params.sysMenus) {
			delete params.sysMenus[key].children
		}
		params.sysRoleApps = params.sysRoleApps.map(v => ({
			appId: v[0],
			appRoleId: v[1] || '',
		}))
		props.operType === 'add' ? await apiSysRoleSave(params) : await apiSysRoleUpdate(params)
		submitLoading.value = false
		oper.visible.value = false
		emits('refersh')
		message.success('操作成功')
	} catch (err) {
		submitLoading.value = false
	}
}

const sysMenus = ref<IMenu[]>([])
/****** 获取参数的方法 ******/
const loadingTree = ref(false)
const loadRolesMenusData = async type => {
	try {
		loadingTree.value = true
		let response: any = await getSysMenuNavByType(type)
		loadingTree.value = false
		sysMenus.value = response.body || []
	} catch (err) {
		console.log(err)
	}
}

let getCheckedMenus = (menus: IMenu[]) => {
	let ids: number[] = []
	menus.forEach((m: IMenu) => {
		ids.push(m.id)
		if (m.children && m.children.length) {
			ids.push(...getCheckedMenus(m.children))
		}
	})
	return ids
}

const treeRef = ref()
const setCheck = (menus: IMenu[], isCheck: boolean) => {
	menus.forEach(item => {
		treeRef.value!.setChecked(item.id, isCheck)
		if (item.children) {
			setCheck(item.children, isCheck)
		}
	})
}

const loopTree = (id: number, menus: IMenu[], isCheck: boolean, parentId?: number) => {
	const flag = menus.some(item => {
		if (item.id == id) {
			// 向下勾选
			if (item.children) {
				setCheck(item.children, isCheck)
			}
			// 向上勾选
			return true
		} else if (item.children) {
			return loopTree(id, item.children, isCheck, item.id)
		}
		return false
	})
	return false
}

const treeCheck = (value1, value2) => {
	if (
		treeRef
			.value!.getCheckedNodes()
			.map(item => item.id)
			.includes(value1.id)
	) {
		loopTree(value1.id, sysMenus.value, true)
	} else {
		loopTree(value1.id, sysMenus.value, false)
	}

	formData.value.sysMenus = treeRef.value!.getCheckedNodes()
}
</script>

<template>
	<BaseDrawer
		:title="`${operType == 'edit' ? '编辑角色' : '新增角色'}`"
		:visible="oper.visible.value"
		@close="oper.handleCancel"
		@closed="oper.handleClosed"
		@confirm="handlSubmit"
		@open="handleOpen"
		:confirmLoading="submitLoading"
	>
		<el-form class="form-con" :model="formData" :rules="rules" :ref="oper.formRef" label-position="top" @submit.prevent>
			<el-form-item label="角色名称" prop="name">
				<el-input v-model.trim="formData.name" maxlength="32" placeholder="请输入角色名称" />
			</el-form-item>
			<el-form-item label="菜单列表" prop="sysMenus" v-loading="loadingTree">
				<el-tree
					ref="treeRef"
					class="w-full"
					:data="sysMenus"
					:default-checked-keys="checkedKeys"
					show-checkbox
					node-key="id"
					:default-expand-all="true"
					@check="treeCheck"
					:props="defaultProps"
					empty-text="暂无数据"
					:check-strictly="true"
				/>
			</el-form-item>
			<el-form-item label="应用" prop="sysRoleApps">
				<el-cascader
					size="default"
					placeholder="请选择应用/应用角色"
					v-model="formData.sysRoleApps"
					class="w-full"
					:options="roleAppsOptions"
					:props="roleAppsProps"
				/>
			</el-form-item>
			<el-form-item label="备注" prop="remarks" class="flex-p100">
				<el-input
					v-model="formData.remarks"
					type="textarea"
					:rows="5"
					show-word-limit
					maxlength="100"
					placeholder="请输入备注"
				/>
			</el-form-item>
		</el-form>
	</BaseDrawer>
</template>

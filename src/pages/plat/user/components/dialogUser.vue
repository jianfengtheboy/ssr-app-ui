<script lang="ts" setup>
import _ from 'lodash'
import { IUser, IUserSave } from '~/model/common'
import { regEmail, regPhone } from '~/config/regexp'
import { apiSysRoleList } from '~/apis/role'
import { apiSysCustomerInfo, apiSysUserSave, apiSysUserUpdate } from '~/apis/users'
import message from '~/utils/message'

const userInfo = computed(() => useAppStore().userInfo)
const oper = useOperation()
// 获取行业类别
const industryTypeDatas = useDictData({ type: 'industryType' })

defineExpose({
	open() {
		oper.visible.value = true
	},
})

const emits = defineEmits(['refersh'])

interface IProps {
	record?: IUser
	operType: Operation
}

const props = withDefaults(defineProps<IProps>(), {
	operType: 'add',
})

// 初始化表单
const initFromData = (): IUserSave => {
	return {
		id: 0,
		userName: '',
		email: '',
		mobile: '',
		sysRoles: '',
	}
}

const formData = ref<IUserSave>(initFromData())
const rules = computed(() => {
	return {
		userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
		mobile: [
			{ required: true, message: '请输入手机号', trigger: 'blur' },
			{ pattern: regPhone, message: '手机号格式不正确' },
		],
		email: [
			{ required: true, message: '请输入邮箱', trigger: 'blur' },
			{ pattern: regEmail, message: '邮箱格式不正确' },
		],
		sysRoles: [{ required: true, message: '请选择角色', trigger: 'change' }],
	}
})

// 获取用户信息
const fetchUserInfo = async () => {
	try {
		const response = await apiSysCustomerInfo(props.record?.id)
		return Promise.resolve(response)
	} catch (error) {
		console.log(error)
		return Promise.reject()
	}
}

// 打开弹框
const handleOpen = async () => {
	formData.value = initFromData()
	await getRoleData()
	if (props.operType === 'edit') {
		const data = await fetchUserInfo()
		formData.value = {
			...formData.value,
			...(props.record || {}),
			...data,
		}
	}
}

// 提交
const submitLoading = ref(false)
const areaConfigRef = ref()
const handlSubmit = async () => {
	try {
		const validateRes = await Promise.all([oper.formRef.value?.validate()])

		if (validateRes.includes(false)) return
		submitLoading.value = true
		let params: any = _.cloneDeep({
			...formData.value,
			status: 1,
			companyId: userInfo.value.companyId || '',
		})
		delete params.defaultServerType
		params.sysRoles = [{ id: params.sysRoles }]
		if (props.operType === 'add') {
			delete params.id
			await apiSysUserSave(params)
		} else {
			await apiSysUserUpdate(params)
		}
		oper.visible.value = false
		message.success('操作成功')
		emits('refersh')
	} catch (err) {
		console.log(err)
	} finally {
		submitLoading.value = false
	}
}

// 获取角色
const apiRoleData = ref<any[]>([])
const getRoleData = async () => {
	try {
		const response = await apiSysRoleList({
			companyId: {
				equals: userInfo.value.companyId,
			},
			serverType: {
				equals: userInfo.value.defaultServerType,
			},
		})
		apiRoleData.value = response || []
	} catch (error) {
		console.log(error)
	}
}
</script>

<template>
	<BaseDrawer
		:title="`${operType == 'edit' ? '编辑用户' : '新增用户'}`"
		:visible="oper.visible.value"
		@close="oper.handleCancel"
		@closed="oper.handleClosed"
		@confirm="handlSubmit"
		@open="handleOpen"
		:confirmLoading="submitLoading"
	>
		<el-form
			class="form-con"
			:model="formData"
			:rules="rules"
			:ref="oper.formRef"
			label-position="top"
			:validate-on-rule-change="false"
		>
			<el-form-item label="用户名" prop="userName">
				<el-input v-model.trim="formData.userName" maxlength="32" placeholder="请输入用户名" />
			</el-form-item>
			<el-form-item label="手机号" prop="mobile">
				<el-input v-model.trim="formData.mobile" maxlength="11" placeholder="请输入手机号" />
			</el-form-item>
			<el-form-item label="邮箱" prop="email">
				<el-input v-model.trim="formData.email" maxlength="128" placeholder="请输入邮箱" />
			</el-form-item>
			<el-form-item label="角色" prop="sysRoles">
				<el-select placeholder="请选择角色" v-model="formData.sysRoles" class="w-full">
					<el-option v-for="item in apiRoleData" :key="item.id" :value="item.id" :label="item.name" />
				</el-select>
			</el-form-item>
		</el-form>
	</BaseDrawer>
</template>

<script lang="ts" setup>
import _ from 'lodash'
import { IMenu } from '~/model/common'
import { EnumMenuType } from '~/config/enum'
import message from '~/utils/message'
import { apiSysMenuSave, apiSysMenuUpdate } from '~/apis/menu'

const oper = useOperation()

defineExpose({
	open() {
		oper.visible.value = true
	},
})

const emits = defineEmits(['refersh'])

interface IProps {
	record?: IMenu
	menus?: IMenu[]
	operType: Operation
}
const props = withDefaults(defineProps<IProps>(), {
	operType: 'add',
})

// 初始化表单
const initFromData = (): IMenu => {
	return {
		id: 0,
		name: '',
		url: '',
		perms: '',
		type: '1',
		icon: '',
		orderNum: undefined,
		parentId: undefined,
		parentName: '',
	}
}
const formData = ref<IMenu>(initFromData())

const rules = {
	name: [{ required: true, message: '请输入名称' }],
	url: [{ required: true, message: '请输入菜单URL' }],
	perms: [{ required: true, message: '请输入授权标识' }],
	orderNum: [{ required: true, message: '请输入排序号' }],
}

const submitLoading = ref(false)

const handleOpen = () => {
	formData.value = initFromData()
	if (props.operType === 'edit') {
		formData.value = {
			...formData.value,
			...(props.record || {}),
			parentId: props.record.parentId,
			parentName: props.record.parentName,
		}
	}
}

const defaultProps = {
	children: 'children',
	label: 'name',
}

// 选择目录
const onCheckMenu = (node: IMenu) => {
	const { id, name } = node || {}
	formData.value.parentId = id
	formData.value.parentName = name
}

const handlSubmit = async () => {
	try {
		await oper.formRef.value?.validate()
		submitLoading.value = true
		let params: any = {
			..._.cloneDeep(formData.value),
			serverType: 1,
		}
		if (props.operType === 'add') {
			delete params.id
			await apiSysMenuSave(params)
		} else {
			await apiSysMenuUpdate(params)
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
</script>

<template>
	<BaseDrawer
		:title="`${operType == 'edit' ? '编辑菜单' : '新增菜单'}`"
		:visible="oper.visible.value"
		@close="oper.handleCancel"
		@closed="oper.handleClosed"
		@confirm="handlSubmit"
		@open="handleOpen"
		:confirmLoading="submitLoading"
	>
		<el-form class="form-con" :model="formData" :rules="rules" :ref="oper.formRef" label-position="top">
			<el-form-item label="类型" prop="type">
				<BaseEnum v-model="formData.type" :enumModel="EnumMenuType" :showMode="'select'" />
			</el-form-item>
			<el-form-item label="名称" prop="name">
				<el-input v-model.trim="formData.name" maxlength="30" placeholder="请输入名称"></el-input>
			</el-form-item>
			<el-form-item label="上级目录" prop="parentId">
				<el-tree-select
					v-model.trim="formData.parentId"
					:data="menus || []"
					placeholder="请选择上级目录"
					node-key="id"
					:default-expand-all="true"
					:expand-on-click-node="false"
					:check-on-click-node="true"
					:props="defaultProps"
					empty-text="暂无数据"
					:check-strictly="true"
					filterable
					@node-click="onCheckMenu"
				/>
			</el-form-item>
			<template v-if="formData.type == '2'">
				<el-form-item label="菜单URL" prop="url">
					<el-input v-model.trim="formData.url" maxlength="30" placeholder="请输入菜单URL"></el-input>
				</el-form-item>
				<el-form-item label="授权标识" prop="perms">
					<el-input v-model.trim="formData.perms" maxlength="64" placeholder="请输入授权标识"></el-input>
				</el-form-item>
			</template>
			<el-form-item label="排序号" prop="orderNum" v-if="formData.type != '3'">
				<el-input-number
					:controls="false"
					class="text-left"
					v-model="formData.orderNum"
					placeholder="请输入排序号"
					:max="999999999"
				/>
			</el-form-item>
			<el-form-item label="图标" prop="icon">
				<el-input v-model.trim="formData.icon" maxlength="30" placeholder="请输入图标"></el-input>
			</el-form-item>
		</el-form>
	</BaseDrawer>
</template>

<style lang="scss" scoped>
:deep(.el-input-number) {
	.el-input__inner {
		text-align: left;
	}
}
</style>

<script lang="ts" setup>
import { IDictionaryBase } from '~/model/dictionary'

const oper = useOperation()

defineExpose({
	open() {
		oper.visible.value = true
	},
})

const emits = defineEmits(['refersh'])

interface IProps {
	record?: IDictionaryBase
	operType: Operation
	title: string
	isSub: boolean
}
const props = withDefaults(defineProps<IProps>(), {
	operType: 'add',
	isSub: false,
})

// 初始化表单
const initFromData = (): IDictionaryBase => {
	return {
		type: '',
		typeName: '',
		value: '',
		label: '',
		remarks: '',
	}
}

const rules = computed(() => {
	return {
		type: [{ required: true, message: `请输入${!props.isSub ? '' : '子'}类型`, trigger: 'change' }],
		typeName: [{ required: true, message: `请输入${!props.isSub ? '' : '子'}类型名称`, trigger: 'change' }],
		value: [{ required: true, message: '请输入数据值', trigger: 'change' }],
		label: [{ required: true, message: '请输入标签', trigger: 'change' }],
	}
})

const formData = ref<IDictionaryBase>(initFromData())

// 打开弹框
const handleOpen = async () => {
	formData.value = initFromData()
	if (props.operType === 'edit') {
		formData.value = {
			...formData.value,
			...(props.record || {}),
		}
	}
	if (props.operType === 'add' && props.isSub) {
		formData.value.parentId = props.record.id
	}
}

// 提交表单
const submitLoading = ref(false)
const handlSubmit = async () => {
	try {
		await oper.formRef.value?.validate()
		submitLoading.value = true
		let params: IDictionaryBase = window.$_.cloneDeep(formData.value)
		props.operType === 'add'
			? await window.$apis.dictionary.apiDictionarySave(params)
			: await window.$apis.dictionary.apiDictionaryUpdate(params)
		submitLoading.value = false
		oper.visible.value = false
		emits('refersh')
		window.$message.success('操作成功')
	} catch (err) {
		submitLoading.value = false
	}
}
</script>

<template>
	<BaseDrawer
		:title="title"
		:visible="oper.visible.value"
		@close="oper.handleCancel"
		@closed="oper.handleClosed"
		@confirm="handlSubmit"
		@open="handleOpen"
		:confirmLoading="submitLoading"
	>
		<el-form class="form-con" :model="formData" :rules="rules" :ref="oper.formRef" label-position="top" @submit.prevent>
			<el-form-item :label="`${!props.isSub ? '' : '子'}类型`" prop="type">
				<el-input v-model.trim="formData.type" maxlength="32" :placeholder="`请输入${!props.isSub ? '' : '子'}类型`" />
			</el-form-item>
			<el-form-item :label="`${!props.isSub ? '' : '子'}类型名称`" prop="typeName">
				<el-input
					v-model.trim="formData.typeName"
					maxlength="32"
					:placeholder="`请输入${!props.isSub ? '' : '子'}类型名称`"
				/>
			</el-form-item>
			<el-form-item label="数据值" prop="value">
				<el-input v-model.trim="formData.value" maxlength="32" placeholder="请输入数据值" />
			</el-form-item>
			<el-form-item label="标签名" prop="label">
				<el-input v-model.trim="formData.label" maxlength="32" placeholder="请输入标签名" />
			</el-form-item>
			<el-form-item label="描述" prop="description">
				<el-input
					v-model.trim="formData.remarks"
					type="textarea"
					placeholder="请输入描述"
					show-word-limit
					maxlength="255"
					rows="5"
				/>
			</el-form-item>
		</el-form>
	</BaseDrawer>
</template>

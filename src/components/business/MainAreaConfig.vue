<script lang="ts" setup>
import { apiAreaList } from '~/apis/common'

const oper = useOperation()

interface IProps {
	operType: Operation
}
const props = withDefaults(defineProps<IProps>(), {
	operType: 'add',
})

interface IArea {
	// 区域id
	id: string
	// 名称
	name: string
	// 父区域id
	parentId: string
	// 区域级别 1：省 2：市 3：区
	levelType: '1' | '2' | '3'
}

interface IAreaForm {
	// 省
	province: string
	// 市
	city: string
	// 区
	area: string
}

const initFromData = (): IAreaForm => {
	return {
		province: '',
		city: '',
		area: '',
	}
}

const formData = ref<IAreaForm>(initFromData())

const rules = computed(() => {
	return {
		province: [{ required: true, message: '请选择省', trigger: 'change' }],
		city: [{ required: true, message: '请选择市', trigger: 'change' }],
		area: [{ required: true, message: '请选择区', trigger: 'change' }],
	}
})

// 省下拉框内容
const provinceList = ref<IArea[]>([])
// 城市下拉框内容
const cityList = ref<IArea[]>([])
// 区下拉框内容
const areaList = ref<IArea[]>([])

const emits = defineEmits(['update'])

// 监听选择省份
watch(
	() => formData.value.province,
	async (val, oldVal) => {
		if (!['', null, undefined].includes(val)) {
			cityList.value = []
			areaList.value = []
			const params = {
				parentId: {
					equals: val,
				},
				levelType: {
					equals: '2',
				},
			}
			cityList.value = (await fetchAreaInfo(params)) as IArea[]
		} else {
			cityList.value = []
			areaList.value = []
		}
		if (oldVal && val !== oldVal) {
			formData.value.city = ''
			formData.value.area = ''
		}
	}
)

// 监听选择城市
watch(
	() => formData.value.city,
	async (val, oldVal) => {
		if (!['', null, undefined].includes(val)) {
			areaList.value = []
			const params = {
				parentId: {
					equals: val,
				},
				levelType: {
					equals: '3',
				},
			}
			areaList.value = (await fetchAreaInfo(params)) as IArea[]
		} else {
			areaList.value = []
		}
		if (oldVal && val !== oldVal) {
			formData.value.area = ''
		}
	}
)

// 监听选择区域
watch(
	() => formData.value.area,
	val => {
		if (!['', null, undefined].includes(val)) {
			emits('update', {
				province: formData.value.province,
				city: formData.value.city,
				area: val,
			})
		}
	}
)

// 表单验证
const validateForm = async () => {
	let flag = false
	await oper.formRef.value?.validate(valid => {
		flag = valid
	})
	return flag
}

// 获取数据
const fetchAreaInfo = async params => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await apiAreaList(params)
			resolve(response || [])
		} catch (error) {
			reject(error)
		}
	})
}

onMounted(async () => {
	// 获取省数据
	const params = {
		levelType: {
			equals: '1',
		},
	}
	provinceList.value = (await fetchAreaInfo(params)) as IArea[]
})

defineExpose({ validateForm, formData })
</script>

<template>
	<el-form
		class="area-config flex items-center justify-start"
		:model="formData"
		:rules="rules"
		:ref="oper.formRef"
		@submit.prevent
	>
		<el-form-item prop="province" class="mr-2">
			<el-select v-model="formData.province" placeholder="省" clearable>
				<el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item.id" />
			</el-select>
		</el-form-item>
		<el-form-item prop="city" class="mr-2">
			<el-select v-model="formData.city" placeholder="市" clearable>
				<el-option v-for="item in cityList" :key="item.id" :label="item.name" :value="item.id" />
			</el-select>
		</el-form-item>
		<el-form-item prop="area">
			<el-select v-model="formData.area" placeholder="区" clearable>
				<el-option v-for="item in areaList" :key="item.id" :label="item.name" :value="item.id" />
			</el-select>
		</el-form-item>
	</el-form>
</template>

import { ref } from 'vue'
import { IDictionary } from '~/model/dictionary'
import { apiDictionaryList, apiDictionaryTypeList } from '~/apis/dictionary'

interface IDict {
	type: string
}

const useDictData = (options?: IDict) => {
	// 获取数据字典数据
	const dictLoading = ref<boolean>(false)
	const dictData = ref<Array<IDictionary>>([])
	const fetchDictDatas = async () => {
		try {
			dictLoading.value = true
			const params = {
				type: {
					equals: options?.type,
				},
			}
			const response: any = await apiDictionaryList(params)
			dictData.value = response.body || []
		} catch (error) {
			console.log(error)
		} finally {
			dictLoading.value = false
		}
	}

	// 获取数据字典类型列表
	const dictTypeLoading = ref<boolean>(false)
	const dictTypeList = ref<Array<Pick<IDictionary, 'value' | 'label'>>>([])
	const fetchDictTypeList = async () => {
		try {
			dictTypeLoading.value = true
			const response: any = await apiDictionaryTypeList()
			dictTypeList.value = (response.body || []).map(v => ({
				label: v.typeName,
				value: v.type,
			}))
		} catch (error) {
			console.log(error)
		} finally {
			dictTypeLoading.value = false
		}
	}

	return {
		dictLoading,
		dictData,
		fetchDictDatas,
		dictTypeLoading,
		dictTypeList,
		fetchDictTypeList,
	}
}

export default useDictData

import { ref } from 'vue'
import { IQuery, ISearchHook } from '~/model/search'
import type { ElForm } from 'element-plus'
import { isEmpty } from '~/utils/common'

type ElFormInstance = InstanceType<typeof ElForm>

/**
 * 通用搜索
 * 模式一：loadListFn 外部传加载方法
 * 模式二：loadListApi + loadListApi 仅需传api和获取参数方法
 * @param options
 * @returns
 */
const useSearch = <T>(options: ISearchHook) => {
	const { loadListFn, loadListApi, getQuerys, sort = 'createdTime,desc', queryCallBack } = options
	let loadListApiCP = loadListApi // 便于外部动态改变api
	let loadListSortCp = sort
	const page = ref<number>(1)
	const total = ref<number>(0)
	const size = ref<number>(options.size || 10)
	const loading = ref<boolean>(false)
	const formRef = ref<ElFormInstance>()
	const tableData = ref<Array<T>>([])

	const loadData = () => {
		loading.value = true
		if (loadListApiCP) {
			loadList()
		} else {
			loadListFn && loadListFn()
		}
	}

	const handleSearch = () => {
		page.value = 1
		loadData()
	}

	const resetSearch = () => {
		page.value = 1
		loading.value = true
		formRef.value && formRef.value.resetFields()
		loadData()
	}

	const loadList = async () => {
		try {
			if (!loadListApiCP || !getQuerys) return

			const querys: Array<IQuery> = getQuerys()
			const params = getParams(querys)

			let response: any = await loadListApiCP(params)
			const { totalElements, content = [], number } = response.body || response
			tableData.value = content
			total.value = totalElements
			page.value = number
			queryCallBack && queryCallBack(content)
		} catch (err) {
			console.log(err)
		} finally {
			loading.value = false
		}
	}

	const getParams = (querys: IQuery[]) => {
		const params = {
			page: {
				number: page.value,
				size: size.value,
				sort: Array.isArray(loadListSortCp) ? [...loadListSortCp] : [loadListSortCp],
			},
			criteria: {},
		}
		if (querys && querys.length > 0) {
			querys.forEach((item: IQuery) => {
				if (item.type === 'than') {
					if (Array.isArray(item.value) && item.value.length === 2) {
						const [start, end] = item.value
						params.criteria[item.key] = {
							greaterThanOrEqual: start || '',
							lessThanOrEqual: end || '',
						}
					}
				} else if (item.type === 'in') {
					if (Array.isArray(item.value) && item.value.length > 0) {
						params.criteria[item.key] = {
							in: item.value,
						}
					}
				} else if (!isEmpty(item.value)) {
					params.criteria[item.key] = {
						[item.type]: item.value,
					}
				}
			})
		}

		return params
	}

	const handleCurrentChange = (val: number) => {
		page.value = val
		loadData()
	}

	const handleChangeSize = (val: number) => {
		size.value = val
		handleSearch()
	}

	// 用于外部动态改变api
	const setLoadListApi = (fn: Function) => {
		loadListApiCP = fn
	}

	// 用于外部动态改变sort
	const setLoadListSort = (sort: string | Array<string>) => {
		loadListSortCp = sort
	}

	return {
		page,
		size,
		loading,
		handleSearch,
		resetSearch,
		handleCurrentChange,
		total,
		formRef,
		tableData,
		loadData,
		handleChangeSize,
		setLoadListApi,
		setLoadListSort,
		getParams,
	}
}

export default useSearch

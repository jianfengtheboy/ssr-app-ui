import { IEnumResult } from '@/model/enum'
import { EnumFormType } from '@/model/form'

// 查询条件基本结构，与服务端保持一致
export interface IQuery {
	type: SearchComparator
	key: string
	value: string | number | Array<string | number | object | Array<object>>
}

// 获取查询条件
export interface IGetQuerys {
	(): Array<IQuery>
}

// 查询form表单配置
export interface ISearchHook {
	size?: number
	// 加载数据方法，二选一
	loadListFn?: Function
	loadListApi?: Function
	getQuerys?: IGetQuerys
	// 排序条件
	sort?: string | Array<string>
	// 查询后的回调，用于特殊场景需要对数据二次加工
	queryCallBack?: Function
}

// 日期时间区间选择器
interface ISearchDateTimeRage {
	rangeSeparator?: string
	startPlaceholder?: string
	endPlaceholder?: string
	defaultTime?: Date[]
}

// 级联选择器
interface ISearchCascader {
	options?: Array<any>
	props?: object
}

export interface ISearchFromItem extends ISearchDateTimeRage, ISearchCascader {
	label: string
	prop: string
	comparator: SearchComparator
	mode: EnumFormType
	selectModel?: Array<any>
	enumModel?: IEnumResult
	checkModel?: any
	clearable?: boolean
	placeholder?: string
	maxlength?: number
	modelValue?: string | number
	defaultValue?: any // 默认值
	refersh?: boolean // 切换后是否立刻触发刷新
	loading?: boolean
	isAble?: boolean // 下拉框是否可选
	hiddenEnums?: string[] // 下拉框隐藏的项
}

export interface ISearchConfig {
	items: ISearchFromItem[]
}

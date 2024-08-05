// 数据字典
export interface IDictionaryBase {
	id?: number
	// 类型
	type: string
	// 类型名称
	typeName: string
	// 数据值
	value: string
	// 标签名
	label: string
	// 描述
	remarks?: string
	// 父id
	parentId?: number
}

export interface IDictionary {
	id?: number
	// 类型
	type: string
	// 类型名称
	typeName: string
	// 数据值
	value: string
	// 标签名
	label: string
	// 描述
	remarks?: string
	// 父id
	parentId?: string
	// 子类
	children?: IDictionaryBase[]
}

declare global {
	// 情景
	type Status = 'primary' | 'success' | 'warning' | 'danger' | 'info'
	// 弹窗操作类型
	type Operation = 'add' | 'edit' | 'detail' | 'delete'
	// 搜索条件类型
	type SearchComparator = 'equals' | 'contains' | 'than' | 'in' | 'notEquals' | 'and' | 'or'
}

export {}

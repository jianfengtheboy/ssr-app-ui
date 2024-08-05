// 字典项查询
export const apiDictionaryList = data => useRequest.post('sys/dict/list', data)

// 字典分页查询
export const apiDictionaryPage = data => useHttp({ url: 'sys/dict/page', body: { ...data } })

// 删除
export const apiDictionaryDelete = id => useRequest.post(`sys/dict/delete/${id}`)

// 新增
export const apiDictionarySave = data => useRequest.post('sys/dict/save', data)

// 编辑
export const apiDictionaryUpdate = data => useRequest.post('sys/dict/update', data)

// 字典类型列表
export const apiDictionaryTypeList = () => useRequest.post('sys/dict/typeList')

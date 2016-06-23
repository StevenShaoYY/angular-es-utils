/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-05-11
 */

import 'angular-resource';

import injector from '../injector';

let apiPrefix = '';

export function setApiPrefix(prefix) {
	apiPrefix = prefix;
}

export let defaultHttpConfigs = {
	headers: {},
	interceptors: []
};

export default (url, cache, params, additionalActions = {}, additionalHttpConfigs = {}) => {

	const requestConfigs = {...defaultHttpConfigs, ...additionalHttpConfigs};

	// 将默认配置复制到新添加的action里
	Object.keys(additionalActions).forEach(action => {
		additionalActions[action] = {...requestConfigs, ...additionalActions[action]};
	});

	// 默认cache为defaultRestCache
	// 自定义配置(配合$http interceptor)
	const DEFAULT_ACTIONS = {
		// 查询，结果为对象
		'get': {method: 'GET', cache, ...requestConfigs},
		// 查询，结果为数组
		'query': {method: 'GET', isArray: true, cache, ...requestConfigs},
		// 保存(新增)
		'save': {method: 'POST', cache, ...requestConfigs},
		// 修改(全量)
		'update': {method: 'PUT', cache, ...requestConfigs},
		// 修改(部分)
		'patch': {method: 'PATCH', cache, ...requestConfigs},
		// 逻辑删除
		'remove': {method: 'DELETE', cache, ...requestConfigs},
		// 物理删除
		'delete': {method: 'DELETE', cache, ...requestConfigs}
	};

	return injector.get('$resource')(apiPrefix + url, params, {...DEFAULT_ACTIONS, ...additionalActions});
};

/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-01-11
 */

// 需要过滤的构造函数的属性
const propBlacklist = ['name', 'prototype', 'length'];
/**
 * angular依赖注入器
 */
export default (...dependencies) => (target, name, descriptor) => {

	if (descriptor) {
		throw new Error('can not use Inject decorator with a non-constructor!');
	}

	const OriginalConstructor = target;

	class Constructor {

		constructor(...args) {

			let instance = new OriginalConstructor(...args);
			// 存在通过 fn.apply(instance, locals) 的方式调用的情况,所以需要把apply过来的实例的属性复制一遍
			Object.assign(instance, this);

			// 将注入的服务已下滑线开头(私有属性)的命名规则绑定到实例上
			dependencies.forEach((dependency, i) => instance[`_${dependency}`] = args[i]);

			return instance;
		}
	}

	// 因为通过static class property语法定义的静态方法是不可枚举的,所以这里不能用Object.keys API来筛选.
	Object.getOwnPropertyNames(target).forEach(prop => {
		if (propBlacklist.indexOf(prop) === -1) {
			Constructor[prop] = target[prop];
		}
	});
	Constructor.$inject = dependencies;

	return Constructor;
};

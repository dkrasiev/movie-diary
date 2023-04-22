export function LogMethod(level = 'LOG') {
	return function <Proto extends object, Args extends unknown[], Return>(
		target: Proto,
		key: string,
		descriptor: TypedPropertyDescriptor<(...args: Args) => Return>
	) {
		const originalMethod = descriptor.value;

		if (typeof originalMethod === 'function') {
			descriptor.value = function (...args: Args) {
				console.log(
					`${level}: invoke ${target.constructor.name}.${key} with args [${args.join(', ')}]`
				);
				return originalMethod.call(this, ...args);
			};
		}
	};
}

export default LogMethod('LOG');

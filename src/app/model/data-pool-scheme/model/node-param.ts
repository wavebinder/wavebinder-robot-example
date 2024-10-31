export class NodeParam {
	name: string | null;
	path: string;
	nodeValue: any;
	valueIsArray: boolean;
	children: NodeParam[] | null;

	constructor(path: string, name: string | null, value: any, dataPool: any) {
		this.name = name;
		this.path = path;
		let b = typeof dataPool === 'object' && dataPool !== null;
		this.valueIsArray = Array.isArray(dataPool)
		this.nodeValue = b ? null : value;
		this.children = b ?
			this.convertDataPool(dataPool, path.length > 0 ? path + '.' : path) : null;
	}

	convertDataPool(dataPool: any, dynamicPath: string) {
		let array = []
		if (!Array.isArray(dataPool)) {
			for (const [key, value] of Object.entries(dataPool)) {
				let path = dynamicPath + key;
				let n = new NodeParam(path, key, value, value);
				array.push(n)
			}
		} else {
			for (let i = 0; i < dataPool.length; i++) {
				let path = dynamicPath + i;
				let value = dataPool[i];
				let n = new NodeParam(path, null, value, value);
				array.push(n)
			}
		}
		return array;
	}
}



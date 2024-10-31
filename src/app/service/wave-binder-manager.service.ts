import {Injectable} from '@angular/core';
import {WaveBinder} from "../../../../wave-binder/wvb/lib/wave-binder";
import {MultiNode} from "../../../../wave-binder/wvb/lib/wvb/node";


@Injectable({
	providedIn: 'root'
})
export class WaveBinderManagerService {
	public waveBinder: WaveBinder;

	constructor() {
		let map = new Map<string, any>;
		map.set("RETRIEVE_DATA",
			{
				"target": "http://ec2-3-22-175-32.us-east-2.compute.amazonaws.com/country",
				"secure": false,
				"authorization": null,
				"headers": {}
			})
		this.waveBinder = new WaveBinder('qqWxQROwzc',PROTO_NODES, map, [
			{
				"name": "getMoveList",
				"arguments": "",
				"body": "return[1,2,4,3]"
			},
			{
				name: 'paperino',
				arguments: 'a,b,c',
				body: 'return a+b+c;'
			},
			{
				name: 'getComplexObj',
				arguments: '',
				body: 'return {name: \'Theo\', surname: \'James\', age: 30}'
			}]);
		this.waveBinder.tangleNodes()
	}

	setValue(value: any, name: string) {
		this.waveBinder.getNodeByName(name).next(value)
	}

	getNode(name: string) {
		return this.waveBinder.getNodeByName(name)
	}

	getChoices(name: string) {
		return (this.getNode(name) as MultiNode).choices;
	}

	getNodeValue(name: string) {
		return this.getNode(name).getNodeValue()
	}

	getDataPool(){
		return this.waveBinder.getDataPool()
	}

}

const PROTO_NODES: any[] = [
	{
		"name": "speedList",
		"type": "LIST",
		"path": "/speedList",
		"la": {
			"type": "USER_SELECTION"
		},
		"dep": [],
		"proto": {
			"name": "travelSpeed",
			"type": "SINGLE",
			"path": "/travelSpeed",
			"la": {
				"type": "USER_SELECTION"
			},
			"dep": []
		}
	},
	{
		"name": "actions",
		"type": "SINGLE",
		"path": "/actions",
		"la": {
			"type": "GET",
			"addr": "/actions/{speed}",
			"serviceName": "RETRIEVE_DATA",
		},
		"dep": [
			{
				"nodeName": "travelSpeed",
				"parameterName": "speed",
				"isOptional": false,
				"onUpdate": true,
				"type": "PATH_VARIABLE"
			}
		]
	},
	{
		"name": "faceExpression",
		"type": "SINGLE",
		"path": "/faceExpression",
		"la": {
			"type": "GET",
			"addr": "/faceExpression/{speed}",
			"serviceName": "RETRIEVE_DATA",
		},
		"dep": [
			{
				"nodeName": "travelSpeed",
				"parameterName": "speed",
				"isOptional": false,
				"onUpdate": true,
				"type": "PATH_VARIABLE"
			}
		]
	},
	{
		"name": "countryList",
		"type": "LIST",
		"path": "/countryList",
		"la": {
			"type": "USER_SELECTION"
		},
		"dep": [],
		"defaultValue": 1,
		"proto": {
			"name": "countryObj",
			"type": "MULTI",
			"path": "/region",
			"la": {
				"type": "GET",
				"addr": "/countryList",
				"serviceName": "RETRIEVE_DATA"
			},
			"dep": []
		}
	},
	{
		"name": "distances",
		"type": "LIST",
		"path": "/distances",
		"la": {
			"type": "USER_SELECTION",
		},
		"dep": [],
		"proto": {
			"name": "distanceElement",
			"type": "SINGLE",
			"path": "/distanceElement",
			"la": {
				"type": "POST",
				"addr": "/distanceElement",
				"serviceName": "RETRIEVE_DATA",
				"bodyType": "JSON_OBJECT"
			},
			"dep": [
				{
					"nodeName": "countryObj",
					"parameterName": "departure",
					"isOptional": false,
					"onUpdate": true,
					"type": "BODY",
					"namingResolvingRule": {
						"type": "SAME_INDEX",
						"fatherNodeName": "distances"
					}
				},
				{
					"nodeName": "countryObj",
					"parameterName": "arriving",
					"isOptional": false,
					"onUpdate": true,
					"type": "BODY",
					"namingResolvingRule": {
						"type": "ALMOST_SAME_INDEX",
						"value": 1,
						"fatherNodeName": "distances"
					},

				}
			]
		}
	},
	{
		"name": "timeList",
		"type": "LIST",
		"path": "/timeList",
		"la": {
			"type": "USER_SELECTION",
		},
		"dep": [],
		"proto": {
			"name": "timeElement",
			"type": "SINGLE",
			"path": "/timeElement",
			"la": {
				"type": "POST",
				"addr": "/time",
				"serviceName": "RETRIEVE_DATA",
				"bodyType": "JSON_OBJECT"
			},
			"dep": [
				{
					"nodeName": "distanceElement",
					"parameterName": "distance",
					"isOptional": false,
					"onUpdate": true,
					"type": "BODY",
					"namingResolvingRule": {
						"type": "SAME_INDEX",
						"fatherNodeName": "timeList"
					}
				},
				{
					"nodeName": "travelSpeed",
					"parameterName": "speed",
					"isOptional": false,
					"onUpdate": true,
					"type": "BODY",
					"namingResolvingRule": {
						"type": "SAME_INDEX",
						"fatherNodeName": "timeList"
					}
				}
			]
		}
	},
	{
		"name": "complexObject",
		"type": "COMPLEX",
		"path": "/complexObject",
		"la": {
			"type": "CUSTOM_FUNCTION",
			"functionName": "getComplexObj"
		},
		"protos": [
			{
				"name": "name",
				"type": "SINGLE",
				"path": "/name",
				"la": {
					"type": "USER_SELECTION"
				},
				"dep": []
			},
			{
				"name": "surname",
				"type": "SINGLE",
				"path": "/surname",
				"la": {
					"type": "USER_SELECTION"
				},
				"dep": []
			},
			{
				"name": "age",
				"type": "SINGLE",
				"path": "/age",
				"la": {
					"type": "USER_SELECTION"
				},
				"dep": []
			}
		],
		"dep": []
	},
	{
		"name": "pippos",
		"type": "SINGLE",
		"path": "/pippo",
		"la": {
			"type": "POST",
			"addr": "/callWithComplexObject",
			"serviceName": "RETRIEVE_DATA"
		},
		"dep": [{
			"nodeName": "complexObject",
			"parameterName": "departure",
			"isOptional": false,
			"onUpdate": true,
			"type": "BODY",
		},]
	},
	{
		"name": "pluto",
		"type": "SINGLE",
		"path": "/pluto",
		"la": {
			"type": "POST",
			"addr": "/callWithComplexObject",
			"serviceName": "RETRIEVE_DATA"
		},
		"dep": [{
			"nodeName": "name",
			"parameterName": "departure",
			"isOptional": false,
			"onUpdate": true,
			"type": "REQUEST_PARAMETER",
		},]
	},
	{
		"name": "fatherList",
		"type": "LIST",
		"path": "/fatherList",
		"la": {
			"type": "USER_SELECTION",
		},
		"defaultValue": 3,
		"dep": [],
		"proto": {
			"name": "listInsideTheList",
			"type": "LIST",
			"path": "/listInsideTheList",
			"la": {
				"type": "USER_SELECTION",
			},
			"defaultValue": 3,
			"dep": [],
			"proto": {
				"name": "elementOfListInsideTheList",
				"type": "COMPLEX",
				"path": "/elementOfListInsideTheList",
				"la": {
					"type": "USER_SELECTION",
				},
				"protos": [
					{
						"name": "pippo",
						"type": "SINGLE",
						"path": "/pippo",
						"la": {
							"type": "USER_SELECTION"
						},
						"dep": []
					},
					{
						"name": "pluto",
						"type": "SINGLE",
						"path": "/pluto",
						"la": {
							"type": "USER_SELECTION"
						},
						"dep": []
					}
				],
				"dep": []
			}
		}
	},
	{
		"name": "averageSpeed",
		"type": "SINGLE",
		"path": "/averageSpeed",
		"la": {
			"type": "POST",
			"addr": "/average/speed",
			"serviceName": "RETRIEVE_DATA",
		},
		"dep": [
			{
				"nodeName": "speedList",
				"parameterName": "speedList",
				"isOptional": false,
				"onUpdate": true,
				"type": "BODY"
			}
		]
	},
	{
		"name": "totalTime",
		"type": "SINGLE",
		"path": "/totalTime",
		"la": {
			"type": "POST",
			"addr": "/total/time",
			"serviceName": "RETRIEVE_DATA",
		},
		"dep": [
			{
				"nodeName": "timeList",
				"parameterName": "timeList",
				"isOptional": false,
				"onUpdate": true,
				"type": "BODY"
			}
		]
	},
	{
		"name": "totalDistance",
		"type": "SINGLE",
		"path": "/totalDistance",
		"la": {
			"type": "POST",
			"addr": "/total/distance",
			"serviceName": "RETRIEVE_DATA",
		},
		"dep": [
			{
				"nodeName": "distances",
				"parameterName": "distances",
				"isOptional": false,
				"onUpdate": true,
				"type": "BODY"
			}
		]
	},
	{
		"name": "robotBehaviourList",
		"type": "LIST",
		"path": "/robotBehaviourList",
		"la": {
			"type": "USER_SELECTION"
		},
		"dep": [],
		"defaultValue": 1,
		"proto": {
			"name": "robotBehaviour",
			"type": "COMPLEX",
			"path": "/robotBehaviour",
			"la": {
				"type": "USER_SELECTION"
			},
			"dep": [],
			"protos": [{
				"name": "actions",
				"type": "SINGLE",
				"path": "/actions",
				"la": {
					"type": "GET",
					"addr": "/actions/{speed}",
					"serviceName": "RETRIEVE_DATA"
				},
				"dep": [
					{
						"nodeName": "travelSpeed",
						"parameterName": "speed",
						"isOptional": false,
						"onUpdate": true,
						"type": "PATH_VARIABLE",
						"namingResolvingRule": {
							"type": "SAME_INDEX",
							"fatherNodeName": "robotBehaviourList"
						}
					}
				]
			},
				{
					"name": "faceExpression",
					"type": "SINGLE",
					"path": "/faceExpression",
					"la": {
						"type": "GET",
						"addr": "/faceExpression/{speed}",
						"serviceName": "RETRIEVE_DATA"
					},
					"dep": [
						{
							"nodeName": "travelSpeed",
							"parameterName": "speed",
							"isOptional": false,
							"onUpdate": true,
							"type": "PATH_VARIABLE",
							"namingResolvingRule": {
								"type": "SAME_INDEX",
								"fatherNodeName": "robotBehaviourList"
							}
						}
					]
				}]
		}
	},
	{
		"name": "tryFunctionLa",
		"type": "SINGLE",
		"path": "/tryFunctionLa",
		"la": {
			"type": "CUSTOM_FUNCTION",
			"functionName": "paperino"
		},
		"dep": [
			{
				"nodeName": "name",
				"parameterName": "a",
				"isOptional": false,
				"onUpdate": true,
			},
			{
				"nodeName": "surname",
				"parameterName": "b",
				"isOptional": false,
				"onUpdate": true,
			},
			{
				"nodeName": "age",
				"parameterName": "c",
				"isOptional": false,
				"onUpdate": true
			}]
	}
];


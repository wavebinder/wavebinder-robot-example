import {Component} from '@angular/core';
import {WaveBinderManagerService} from "../../../service/wave-binder-manager.service";
import {ListNode} from "../../../../../../wave-binder/wvb/lib/wvb/node";
import {AppModule} from "../../../app.module";
import {NumberWithGroupingPipe} from "../../../../number-with-grouping.pipe";

@Component({
	selector: 'app-travel-details-list',
	standalone: true,
	imports: [AppModule, NumberWithGroupingPipe],
	templateUrl: './travel-details-list.component.html',
	styleUrl: './travel-details-list.component.css'
})
export class TravelDetailsListComponent {
	constructor(protected wb: WaveBinderManagerService) {
	}

	getDistanceNode() {
		return this.wb.getNode('distances') as ListNode
	}

	getTimeNode() {
		return this.wb.getNode('timeList') as ListNode
	}


	setSpeed(speed: any, $index: number) {
		this.getSpeedListNode().children[$index].next(speed)
	}

	getSpeedListNode() {
		return this.wb.getNode('speedList') as ListNode;
	}

	retrieveRoute(element: any) {
		let from = element?.from ?? ''
		let to = element?.to ?? ''
		return from + ' - ' + to;
	}

	protected readonly console = console;

	getTimeValue($index: number, s: string) {
		let timeNode = this.getTimeNode().getNodeValue();
		if (!timeNode) return null
		let timeNodeElement = timeNode[$index];
		return timeNodeElement ? timeNodeElement[s] : null;
	}
}

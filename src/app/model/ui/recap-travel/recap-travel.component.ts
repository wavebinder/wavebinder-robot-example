import {Component} from '@angular/core';
import {WaveBinderManagerService} from "../../../service/wave-binder-manager.service";
import {AppModule} from "../../../app.module";
import {NumberWithGroupingPipe} from "../../../../number-with-grouping.pipe";

@Component({
	selector: 'app-recap-travel',
	standalone: true,
	imports: [AppModule, NumberWithGroupingPipe],
	templateUrl: './recap-travel.component.html',
	styleUrl: './recap-travel.component.css'
})
export class RecapTravelComponent {
	constructor(protected wbService: WaveBinderManagerService) {
	}

	getTotalTimeValue(key: string) {
		let nodeValue = this.wbService.getNodeValue('totalTime');
		return nodeValue?nodeValue[key]:null;
	}

	getAverageSpeed() {
		 return this.wbService.getNodeValue('averageSpeed')
	}

	getTotalDistance() {
		return this.wbService.getNodeValue('totalDistance')	}
}

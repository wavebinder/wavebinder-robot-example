import {Component, ViewEncapsulation} from '@angular/core';
import {ManageRobotService} from "../../../robot/manage-robot.service";
import {WaveBinderManagerService} from "../../../service/wave-binder-manager.service";
import {AppModule} from "../../../app.module";
import {NumberWithGroupingPipe} from "../../../../number-with-grouping.pipe";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSlider, MatSliderThumb} from "@angular/material/slider";

@Component({
	selector: 'app-travel-details',
	standalone: true,
	imports: [AppModule, NumberWithGroupingPipe, ReactiveFormsModule, MatSlider, MatSliderThumb],
	templateUrl: './travel-details.component.html',
	styleUrl: './travel-details.component.scss',
	encapsulation: ViewEncapsulation.None,
})
export class TravelDetailsComponent {
	travelTime: any = {hours: null, minutes: null, seconds: null}

	public constructor(protected engServ: ManageRobotService,
					   protected wbService: WaveBinderManagerService) {
	}


	updateTravelTime(element: any, param: string) {
		if (element > 59 && param != 'hours')
			this.writeCorrectTime(element, param);
		else this.travelTime[param] = element;
		this.wbService.setValue(this.travelTime, 'travelTime')
	}

	writeCorrectTime(element: any, param: string) {
		let nextParam = param == 'minutes' ? 'hours' : 'minutes'
		this.travelTime[param] = element % 60;
		this.travelTime[nextParam] += (element - this.travelTime[param]) / 60;
		if (this.travelTime[nextParam] > 59 && nextParam == 'minutes') this.writeCorrectTime(this.travelTime[nextParam], nextParam)
	}

	setSpeed(speed: any) {
		this.wbService.setValue(speed, 'travelSpeed')
	}

}




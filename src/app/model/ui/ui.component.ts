import {Component, ViewEncapsulation} from '@angular/core';
import {CountrySelectionComponent} from "./country-selection/country-selection.component";
import {TravelDetailsComponent} from "./travel-details/travel-details.component";
import {AppModule} from "../../app.module";
import {ManageRobotService} from "../../robot/manage-robot.service";
import {WaveBinderManagerService} from "../../service/wave-binder-manager.service";
import {NgOptimizedImage} from "@angular/common";
import {DomSanitizer} from "@angular/platform-browser";
import {SelectionListComponent} from "./selection-list/selection-list.component";
import {TravelDetailsListComponent} from "./travel-details-list/travel-details-list.component";
import {RecapTravelComponent} from "./recap-travel/recap-travel.component";


@Component({
	selector: 'app-ui',
	standalone: true,
	encapsulation: ViewEncapsulation.None,
	templateUrl: './ui.component.html',
	styleUrl: './ui.component.scss',
	imports: [
		AppModule,
		CountrySelectionComponent,
		TravelDetailsComponent,
		NgOptimizedImage,
		SelectionListComponent,
		TravelDetailsListComponent,
		RecapTravelComponent
	]
})
export class UiComponent {
	image: any

	public constructor(protected engServ: ManageRobotService,
					   protected wbService: WaveBinderManagerService,
					   private _sanitizer: DomSanitizer) {
	}


	async uploadConfiguration(event: any) {
		const reader = new FileReader();
		const file = event.target.files[0];
		reader.readAsDataURL(file);
		reader.onload = () => {
			this.image = this._sanitizer.bypassSecurityTrustResourceUrl(`data:image/image/jpg;base64,${reader.result}`);
		};

	}

}

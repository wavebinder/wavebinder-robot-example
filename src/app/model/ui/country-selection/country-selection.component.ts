import {Component, Input, ViewEncapsulation} from '@angular/core';
import {WaveBinderManagerService} from "../../../service/wave-binder-manager.service";
import {AppModule} from "../../../app.module";


@Component({
	selector: 'app-country-selection',
	standalone: true,
	imports: [AppModule],
	templateUrl: './country-selection.component.html',
	styleUrl: './country-selection.component.scss',
	encapsulation: ViewEncapsulation.None,
})
export class CountrySelectionComponent {
	@Input('whichCountry') whichCountry!: string;

	public constructor(protected wbService: WaveBinderManagerService) {
	}


	getCoordinatesValues(name: string, type: string) {
		let value = this.wbService.getNodeValue(name);
		return value ? value[type] : null;
	}
}

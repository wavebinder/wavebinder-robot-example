import {ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ManageRobotService} from './manage-robot.service';
import {AppModule} from "../app.module";


@Component({
	selector: 'app-robot',
	standalone: true,
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [AppModule],
	templateUrl: './robot.component.html'
})
export class RobotComponent implements OnInit {

	@ViewChild('rendererCanvas', {static: true})
	public rendererCanvas: ElementRef<HTMLCanvasElement> | any;

	public constructor(private engServ: ManageRobotService) {
	}

	public ngOnInit(): void {
		this.engServ.createScene(this.rendererCanvas);
		this.engServ.animate();
	}
}


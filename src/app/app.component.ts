import {AfterViewInit, Component} from '@angular/core';
import {AppModule} from "./app.module";
import {UiComponent} from "./model/ui/ui.component";
import {RobotComponent} from "./robot/robot.component";
import {ManageRobotService} from "./robot/manage-robot.service";
import {WaveBinderManagerService} from "./service/wave-binder-manager.service";
import {ComplexNode, ListNode} from "../../../wave-binder/wvb/lib/wvb/node";
import {Subscription} from "rxjs";

@Component({
	selector: 'app-root',
	imports: [AppModule, UiComponent, RobotComponent],
	standalone: true,
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {

	public constructor(private engServ: ManageRobotService,
					   private wbService: WaveBinderManagerService) {
	}

	countrySelectionSubscription: Subscription[] = [];
	robotBehaviourSubscription: Subscription[] = [];
	robotBehaviourLength: number = 0;

	ngAfterViewInit(): void {
		let countryList: ListNode = this.wbService.getNode('countryList') as ListNode;
		countryList.subscribe(value => {
			this.countrySelectionSubscription.forEach(subscription => subscription.unsubscribe());
			this.countrySelectionSubscription = []
			countryList.children.forEach((child, index) => child.subscribe(v => index == 0 ? this.engServ.executeEmotes('Wave') : this.engServ.executeEmotes('ThumbsUp')))
		});

		let robotBehaviour: ListNode = this.wbService.getNode('robotBehaviourList') as ListNode;
		robotBehaviour.subscribe(value => {
				if (this.robotBehaviourLength != value) {
					this.robotBehaviourSubscription.forEach(subscription => subscription.unsubscribe());
					this.countrySelectionSubscription = []
					robotBehaviour.children.forEach(child => {
						(child as ComplexNode).fields.forEach(field => {
							this.robotBehaviourSubscription.push(field.subscribe(value => {
								if (!field.node.name.includes('actions'))
									this.engServ.setFaceExpression(value)
								else if (value != null) {
									this.engServ.setState(value.action)
									this.engServ.executeEmotes(value.emotes)
								}
							}))
						})
					});
				}
				this.robotBehaviourLength = value;
			}
		)
	}

	protected readonly JSON = JSON;
}

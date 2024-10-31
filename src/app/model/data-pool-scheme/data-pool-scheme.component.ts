import {Component, Input, OnInit} from '@angular/core';
import {NodeParam} from "./model/node-param";
import {CommonModule} from "@angular/common";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatTree} from "@angular/material/tree";

@Component({
	selector: 'app-data-pool-scheme',
	templateUrl: './data-pool-scheme.component.html',
	imports: [CommonModule, MatFormField, FormsModule, MatFormFieldModule, MatInput, MatTree],
	standalone: true,
	styleUrl: './data-pool-schema.component.css'
})

export class DataPoolSchemeComponent{

	@Input() nodePoint!: NodeParam;


}

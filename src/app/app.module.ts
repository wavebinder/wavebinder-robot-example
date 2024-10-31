import {MatDialogModule} from '@angular/material/dialog';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule, MatExpansionPanel, MatExpansionPanelTitle} from '@angular/material/expansion';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSortModule} from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {HttpClientModule, provideHttpClient} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatCard, MatCardModule} from "@angular/material/card";
import {CommonModule} from "@angular/common";
import {MatFormField, MatFormFieldModule, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatOption, MatSelect, MatSelectModule} from "@angular/material/select";
import {provideAnimations} from "@angular/platform-browser/animations";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatTab, MatTabBody, MatTabGroup} from "@angular/material/tabs";
import {NumberWithGroupingPipe} from '../number-with-grouping.pipe';
import {MatSlider, MatSliderModule, MatSliderThumb} from "@angular/material/slider";

@NgModule({
	imports: [
		HttpClientModule,
		CommonModule,
		MatDialogModule,
		MatButtonModule,
		MatToolbarModule,
		MatIconModule,
		MatMenuModule,
		MatExpansionModule,
		MatProgressBarModule,
		FormsModule,
		MatTooltipModule,
		MatSortModule,
		MatCheckboxModule,
		MatListModule,
		MatGridListModule,
		MatSnackBarModule,
		MatCardModule,
		MatSelectModule,
		MatFormField,
		MatInput,
		MatLabel,
		MatOption,
		MatSelect,
		MatIcon,
		MatSuffix,
		MatCard,
		MatTabGroup,
		MatTab,
		MatTabBody,
		MatInputModule,
		MatButton,
		MatExpansionPanel,
		MatExpansionPanelTitle,
		ReactiveFormsModule,
		MatSliderModule,
		MatSlider,
		MatSliderThumb
	],
	exports: [HttpClientModule,
		CommonModule,
		MatDialogModule,
		MatButtonModule,
		MatIconModule,
		MatMenuModule,
		MatExpansionModule,
		MatProgressBarModule,
		FormsModule,
		MatTooltipModule,
		MatSortModule,
		MatCheckboxModule,
		MatListModule,
		MatGridListModule,
		MatSnackBarModule,
		MatFormFieldModule,
		MatSelectModule,
		MatToolbarModule,
		MatCardModule,
		MatFormField,
		MatOption,
		MatSelect,
		MatIcon,
		MatSuffix,
		MatLabel,
		MatCard,
		MatInput,
		MatTabGroup,
		MatTab,
		MatTabBody,
		MatInputModule,
		MatButton,
		MatExpansionPanel,
		MatExpansionPanelTitle,
		ReactiveFormsModule,
		MatSliderModule,
		MatSlider,
		MatSliderThumb],
	providers: [provideHttpClient(), provideAnimations(), NumberWithGroupingPipe]
})
export class AppModule {
}

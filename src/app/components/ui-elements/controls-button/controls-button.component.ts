import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-controls-button',
  host: {
    '[class]': 'buttonStyles',
    '[class.controls-button-selected]': 'selected'
  },
  templateUrl: './controls-button.component.html',
  styleUrls: ['./controls-button.component.css']
})
export class ControlsButtonComponent {

  @Input() selected: boolean = false;

  @Input() hasSwitch: boolean = false;
  @Input() switchOn: boolean = false;

  @Input() icon: string = '';
  @Input() icon2: string = '';

  @Input() text: string = '';
  @Input() textBefore: string = '';
  @Input() textAfter: string = '';

  @Input() labelText: string = '';

  @Input() buttonStyles: string = '';
  @Input() iconStyles: string = '';
  @Input() textStyles: string = '';
  @Input() textBeforeStyles: string = '';
  @Input() textAfterStyles: string = '';
  @Input() labelStyles: string = '';

}

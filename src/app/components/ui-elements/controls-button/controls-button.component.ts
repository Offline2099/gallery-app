import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-controls-button',
  host: {
    '[class]': 'buttonClasses',
    '[class.controls-button-selected]': 'selected'
  },
  templateUrl: './controls-button.component.html',
  styleUrls: ['./controls-button.component.css']
})
export class ControlsButtonComponent {

  @Input() selected?: boolean = false;

  @Input() hasSwitch?: boolean = false;
  @Input() switchOn?: boolean = false;

  @Input() icon?: string;
  @Input() icon2?: string;
  @Input() text?: string;
  @Input() textBefore?: string;
  @Input() textAfter?: string;
  @Input() labelText?: string;

  @Input() buttonClasses?: string;
  @Input() iconClasses?: string;
  @Input() textClasses?: string;
  @Input() textBeforeClasses?: string;
  @Input() textAfterClasses?: string;
  @Input() labelClasses?: string;

}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-controls-button',
  host: {
    '[class]' : 'buttonClasses',
    '[class.controls-button-selected]': 'selected'
  },
  templateUrl: './controls-button.component.html',
  styleUrls: ['./controls-button.component.css']
})
export class ControlsButtonComponent implements OnInit {

  @Input() selected?: boolean = false;

  @Input() hasSwitch?: boolean = false;
  @Input() switchOn?: boolean = false;

  @Input() iconFile?: string = '';
  @Input() iconFile2?: string = '';
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

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-controls-button',
  host: {
    'class': 'controls-button',
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
  @Input() text?: string;
  @Input() labelText?: string;

  @Input() iconClasses?: string;
  @Input() textClasses?: string;
  @Input() labelClasses?: string;

  constructor() { }

  ngOnInit(): void {
  }

}

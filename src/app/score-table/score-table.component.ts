import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-score-table',
  templateUrl: './score-table.component.html',
  styleUrl: './score-table.component.css',
})
export class ScoreTableComponent {
  @Input() scoreData!: { first: number; second: number }[] | undefined;
}

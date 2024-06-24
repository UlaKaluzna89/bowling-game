import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { clear, increment } from '../store/counter.actions';
import { first, max, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent implements OnInit {
  formGroup = this.createFormGroup();
  score$!: Observable<number>;

  numberMask = {
    mask: Number,
    min: 0,
    max: 10,
  };

  validator!: number;

  get frames(): FormArray {
    return this.formGroup.get('frames') as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<{ counter: AppState }>,
    private readonly snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.score$ = this.store.pipe(select((state) => state.counter.score));
    this.formGroup.valueChanges.subscribe(() => {
      const first =
        this.formGroup?.controls?.first?.value != null && true
          ? this.formGroup?.controls?.first?.value
          : 0;
      this.validator = 10 - first;

      this.formGroup.controls.second.setValidators(
        Validators.max(this.validator),
      );
    });
  }

  isFirstControlValueGreaterThanNine() {
    return (
      this.formGroup?.controls?.first?.value != null &&
      true &&
      this.formGroup?.controls?.first?.value > 9
    );
  }

  clear(): void {
    this.store.dispatch(clear());
    this.formGroup.patchValue({ first: 0, second: 0, frames: [] });
  }

  canAdd(): boolean {
    return this.frames?.length >= 10;
  }

  addRow(): void {
    const first =
      this.formGroup?.controls?.first?.value != null && true
        ? this.formGroup?.controls?.first?.value
        : 0;
    const second =
      this.formGroup?.controls?.second?.value != null && true
        ? this.formGroup?.controls?.second?.value
        : 0;
    const score = first + second;
    this.store.dispatch(increment({ score }));

    const newFormControl: FormControl = this.formBuilder.control({
      first: first,
      second: second,
    });
    this.frames?.push(newFormControl);

    if (this.canAdd()) {
      const message: string = 'Można wybrać rzucić tylko 10 razy';
      this.showSnackBar(message);
      return;
    }
    this.formGroup.controls.first.setValue(0);
    this.formGroup.controls.second.setValue(0);
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
    });
  }

  private createFormGroup() {
    return this.formBuilder.group({
      first: [0, [Validators.required, Validators.max(10)]],
      second: [0],
      frames: this.formBuilder.array([]),
    });
  }
}

import { createAction, props } from '@ngrx/store';

export const increment = createAction(
  '[Game] Add',
  props<{ score: number }>(),
);

export const clear = createAction('[Game] Clear');

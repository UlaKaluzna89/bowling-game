import { createReducer, on } from '@ngrx/store';
import { clear, increment } from './counter.actions';

export interface State {
  score: number;
}

export const initialState: State = {
  score: 0,
};

export const counterReducer = createReducer<State>(
  initialState,
  on(increment, (state, { score }) => ({
    ...state,
    score: state?.score + score,
  })),
  on(clear, (state) => ({ ...state, score: 0 })),
);

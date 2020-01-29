import { createStore, combineReducers, Reducer, AnyAction, ReducersMapObject } from "redux";
import { GenericReducerType } from "./createReducer";

export type ReducerType<R> = {
    store: {
        [className: string]: GenericReducerType<any>
    },
    reducer: R
}

export default function createStoreLibrary<S, T extends Reducer<any>>(store: Reducer<S>, reducer: T) {
    return createStore(combineReducers({ reducer, store }))
}
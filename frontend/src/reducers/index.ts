import { combineReducers } from 'redux'
import { GenericReducerType, getData, isFetching, getError, isInvalidate } from '../utils/createReducer';
import { PlantType } from '../models/plant';
import plant from './plantReducer'
export type ReducerType = {
    plant: GenericReducerType<PlantType>
}

export default combineReducers<ReducerType>({ plant: plant })

export const getPlants = (state: ReducerType, queryString: string = '') => getData(state.plant, queryString)
export const isFetchingPlants = (state: ReducerType, queryString: string = '') => isFetching(state.plant, queryString)
export const getErrorPlants = (state: ReducerType, queryString: string = '') => getError(state.plant, queryString)
export const isInvalidPlants = (state: ReducerType, queryString: string = '') => isInvalidate(state.plant, queryString)
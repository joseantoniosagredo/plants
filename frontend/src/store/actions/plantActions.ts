import { createAction, ActionUnion } from "../../utils/typesUtil";
import { PlantType } from "../models/plant";
import HttpError from "../../utils/HttpError";
import { Dispatch } from "redux";
import { ReducerType, isFetchingPlants, isInvalidPlants } from "../reducers";
import { ResponseType } from "../../utils/redux/createReducer";

const uri = '/api/rest/plant/'

const FETCH_PLANT = 'FETCH_PLANTS'
const FETCH_BY_ID_PLANT = 'FETCH_BY_ID_PLANTS'
const RECEIVE_BY_ID_PLANT = 'RECEIVE_BY_ID_PLANTS'
const RECEIVE_PLANT = 'RECEIVE_PLANTS'
const ERROR_PLANT = 'ERROR_PLANTS'
const INVALIDATE_PLANT = 'INVALIDATE_PLANT'
const actionObject = {
    fetchPlants: (querystring: string) => createAction(FETCH_PLANT, { querystring }),
    invalidatePlants: (querystring: string) => createAction(INVALIDATE_PLANT, { querystring }),
    receivePlants: (querystring: string, data: PlantType[]) => createAction(RECEIVE_PLANT, { data, querystring }),
    errorPlants: (querystring: string, error: HttpError) => createAction(ERROR_PLANT, { error, querystring }),
    fechById: (id: PlantType['_id']) => createAction(FETCH_BY_ID_PLANT, { id }),
    receivePlantById: (id: PlantType['_id'], data: PlantType) => createAction(RECEIVE_BY_ID_PLANT, { id, data }),
}

export type Actions = ActionUnion<typeof actionObject>

function fetchPlant(querystring: string, callback?: (error: HttpError | null, data?: PlantType[]) => void) {
    return (dispatch: Dispatch<Actions>) => {
        const xhttp = new XMLHttpRequest()
        xhttp.open('GET', uri)
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    const response: ResponseType<PlantType> = JSON.parse(this.responseText)
                    const data = response.results
                    if (callback) callback(null, data)
                    dispatch(actionObject.receivePlants(querystring, data))
                } else if (this.status === 502) {
                    dispatch(actionObject.invalidatePlants(querystring))
                } else {
                    const error = new HttpError(this.responseText, this.status)
                    if (callback) callback(error)
                    dispatch(actionObject.errorPlants(querystring, error))

                }
            }
        }
        dispatch(actionObject.fetchPlants(querystring))
        xhttp.send()
    }
}
/*function post<T>(plant: T, callback?: (error: HttpError | null, data?: T) => void) {
    return (dispatch: Dispatch<Actions>) => {
        const xhttp = new XMLHttpRequest()
        xhttp.open('POST', uri)
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    const response: T = JSON.parse(this.responseText)
                    if (callback) callback(null, response)
                    dispatch
                } else if (this.status === 201) {
                    if (callback) callback(null)
                } else {
                    const error = new HttpError(this.responseText, this.status)
                    if (callback) callback(error)
                }
            }
        }
        xhttp.send(JSON.stringify(plant))
    }
}
function put<E, T>(id: string, plant: Partial<T>, callback?: (error: HttpError | null, data?: T) => void) {
    return (dispatch: Dispatch<Actions>) => {
        const xhttp = new XMLHttpRequest()
        xhttp.open('PUT', uri + id)
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    const response: T = JSON.parse(this.responseText)
                    if (callback) callback(null, response)
                    actionObject.receivePlantById(id, response)
                } else if (this.status === 201) {
                    if (callback) callback(null)
                } else {
                    const error = new HttpError(this.responseText, this.status)
                    if (callback) callback(error)
                }
            }
        }
        xhttp.send(JSON.stringify(plant))
    }
}*/

export function invalidatePlant(querystring: string = '') {
    return (dispatch: Dispatch<any>) => {
        return dispatch(actionObject.invalidatePlants(querystring))
    }
}
export function fetchPlantIfNeeded(querystring: string = '', callback?: (error: HttpError | null, data?: PlantType[]) => void): any {
    return (dispatch: Dispatch<any>, getState: () => ReducerType) => {
        const state = getState()
        if (!isFetchingPlants(state, querystring) || isInvalidPlants(state, querystring))
            return dispatch(fetchPlant(querystring, callback))
    }
}
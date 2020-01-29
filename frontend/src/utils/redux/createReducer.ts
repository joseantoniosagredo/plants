import HttpError from "../HttpError";
import { createAction, ActionUnion } from "../typesUtil";
import { Dispatch } from "redux";


type RequestContainerType<T> = {
    [queryString: string]: RequestType<T>
}
type defaultPagination<T> = {
    total_pages: number
    page: number
    count: number,
    result: []
}
export type ResponseType<T> = {
    total_pages: number
    page: number
    count: number
    sort: string
    results: T[]
}

export type GenericReducerType<T extends { _id: string }> = {
    objects: RequestContainerType<T>,
    requests: RequestContainerType<string[]>
}
type RequestType<T> = {
    isFetching: boolean,
    result?: T,
    error?: HttpError | null,
    invalidate: boolean
}
export function getData<T extends { _id: string }>(state: GenericReducerType<T>, queryString: string = ''): T[] {
    const request = state.requests[queryString]
    if (request && request.result) return request.result.map(id => state.objects[id].result!) //TODO: improve typescript
    return []
}
export function isFetching<T extends { _id: string }>(state: GenericReducerType<T>, queryString: string = ''): boolean {
    const request = state.requests[queryString]
    if (request) return request.isFetching
    return false
}
export function isInvalidate<T extends { _id: string }>(state: GenericReducerType<T>, queryString: string = ''): boolean {
    const request = state.requests[queryString]
    if (request) return request.invalidate
    return false
}
export function getError<T extends { _id: string }>(state: GenericReducerType<T>, queryString: string = ''): HttpError | null {
    const request = state.requests[queryString]
    if (request && request.error) return request.error
    return null
}

type Values = string | number
const FETCH = 'FETCH'
const FETCH_BY_ID = 'FETCH_BY_ID'
const RECEIVE_BY_ID = 'RECEIVE_BY_ID'
const RECEIVE = 'RECEIVE'
const ERROR = 'ERROR'

export default function createReducer<T extends { _id: string }>({name,uri,id}: {
    name: string,
    uri: string,
    id: { [K in keyof T]: T[K] extends Values ? T[K] : never }[keyof T]
}) {
    const actionObject = {
        fetch: (queryString: string = '') => createAction(FETCH, { queryString, name }),
        fetchById: (id: string) => createAction(FETCH_BY_ID, { id, name }),
        receiveBYId: (id: string, data: T) => createAction(RECEIVE_BY_ID, { id, name, data }),
        receive: (queryString: string = '', data: T[]) => createAction(RECEIVE, { queryString, name, data }),
        error: (queryString: string = '', error: HttpError) => createAction(ERROR, { queryString, error, name }),
    }

    function setRequest(state: GenericReducerType<T>, queryString: string, callback: () => RequestType<string[]>) {
        return {
            ...state,
            requests: {
                [queryString]: {
                    ...state.requests[queryString],
                    ...callback()
                }
            }
        }
    }
    type Action = ActionUnion<typeof actionObject>
    function post(data: T, callback?: (error: HttpError | null, data?: T) => void) {
        return (dispatch: Dispatch<Action>) => {
            const xhttp = new XMLHttpRequest()
            xhttp.open('POST', uri)
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        const response: T = JSON.parse(this.responseText)
                        if (callback) callback(null, response)
                        dispatch(actionObject.receiveBYId(response['_id'],response))
                    } else if (this.status === 201) {
                        if (callback) callback(null)
                    } else {
                        const error = new HttpError(this.responseText, this.status)
                        if (callback) callback(error)
                    }
                }
            }
            xhttp.send(JSON.stringify(data))
        }
    }
    function put(id: string, data: Partial<T>, callback?: (error: HttpError | null, data?: T) => void) {
        return (dispatch: Dispatch<Action>) => {
            const xhttp = new XMLHttpRequest()
            xhttp.open('PUT', uri + id)
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        const response: T = JSON.parse(this.responseText)
                        if (callback) callback(null, response)
                        actionObject.receiveBYId(id, response)
                    } else if (this.status === 201) {
                        if (callback) callback(null)
                    } else {
                        const error = new HttpError(this.responseText, this.status)
                        if (callback) callback(error)
                    }
                }
            }
            xhttp.send(JSON.stringify(data))
        }
    }
    
    
    function reducer(state: GenericReducerType<T> = { objects: {}, requests: {} }, action: Action): GenericReducerType<T> {
        if (action.name !== name)
            return state
        switch (action.type) {
            case FETCH:
                return setRequest(state, action.queryString, () => ({
                    isFetching: true,
                    invalidate: false,
                }))
            case RECEIVE:
                const objects = action.data.reduce<{ [key: string]: RequestType<T> }>((object, d: T) => ({
                    ...object,
                    [d._id]: {
                        isFetching: false,
                        result: d,
                        invalidate: false
                    }
                }), state.objects)
                return {
                    ...state,
                    objects,
                    requests: {
                        [action.queryString]: {
                            ...state.requests[action.queryString],
                            isFetching: false,
                            error: null,
                            result: action.data.map((d: T) => d._id)
                        }
                    }
                }
            case ERROR:
                return setRequest(state, action.queryString, () => ({
                    isFetching: false,
                    invalidate: true,
                    error: action.error
                }))
            case FETCH_BY_ID:
                return {
                    ...state,
                    objects: {
                        ...state.objects,
                        [action.id]: {
                            isFetching: true,
                            invalidate: false,
                        }
                    }
                }
            case RECEIVE_BY_ID:
                return {
                    ...state,
                    objects: {
                        ...state.objects,
                        [action.id]: {
                            isFetching: true,
                            invalidate: false,
                            result: action.data
                        }
                    }
                }

            default:
                return state
        }
    }
}
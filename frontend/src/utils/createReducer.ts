import HttpError from "./HttpError";


type RequestContainerType<T> = {
    [queryString: string]: RequestType<T>
}
type defaultPagination<T> = {
    total_pages: number
    page: number
    count: number,
    result:[]
}
export type ResponseType<T> = {
    total_pages: number
    page: number
    count: number
    sort: string
    results: T[]
}

export type GenericReducerType<T extends { _id: string } > = {
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

////////////////////////////////////////////////////////////
/*
interface FetchAction {
    type: string,
    queryString: string
}
interface ReceiveAction<T> extends FetchAction {
    data: T[]
}
interface ErrorAction extends FetchAction {
    error: HttpError
}
interface FetchByIdAction<T> {
    type: string
    id: T
}
type Values = string | number
function createReducer<T>(options: {
    name: string,
    id: { [K in keyof T]: T[K] extends Values ? T[K] : never }[keyof T]
}) {
    const FETCH = 'FETCH_' + options.name
    const FETCH_BY_ID = 'FETCH_BY_ID_' + options.name
    const RECEIVE_BY_ID = 'RECEIVE_BY_ID_' + options.name
    const RECEIVE = 'RECEIVE_' + options.name
    const ERROR = 'ERROR_' + options.name
    function actionIsFetch(action: Action): action is FetchAction {
        if (action.type === FETCH) return true
        return false
    }
    function actionIsFetchById(action: Action): action is FetchByIdAction<typeof options.id> {
        if (action.type === FETCH) return true
        return false
    }
    function actionIsReceive(action: Action): action is ReceiveAction<T> {
        if (action.type === RECEIVE) return true
        return false
    }
    function actionIsError(action: Action): action is ErrorAction {
        if (action.type === ERROR) return true
        return false
    }
    const actionObject = {
        fetch: (queryString: string = '') => createAction(FETCH, { queryString }),
        fetchById: (id: number) => createAction(FETCH_BY_ID, { id, queryString: '' }),
        receive: (queryString: string = '', data: T[]) => createAction(RECEIVE, { queryString, data }),
        error: (queryString: string = '', error: HttpError) => createAction(ERROR, { queryString, error }),
    }

    function setRequest(state: GenericReducerType<T>, queryString: string, data: Partial<RequestType<T>>) {
        return {
            ...state,
            requests: {
                [queryString]: {
                    ...state.requests[queryString],
                    isFetching: true
                }
            }
        }
    }

    type Action = FetchAction | ReceiveAction<T> | ErrorAction | FetchByIdAction<typeof options.id>
    /*return function (state: GenericReducerType<T> = { objects: {}, requests: {} }, action: any): GenericReducerType<T> {
        switch (action.type) {
            case FETCH:
                return setRequest(state, action.queryString, {
                    ...state.requests[action.queryString],
                    isFetching: true
                })
            case RECEIVE:
                return {
                    ...state,
                    objects: {
                        ...state.objects,
                        ...action.data.map((d: T) => ({ [d[options.id]]: d }))
                    },
                    requests: {
                        [action.queryString]: {
                            ...state.requests[action.queryString],
                            isFetching: false,
                            error: null,
                            result: action.data.map((d: T) => d[options.id])
                        }
                    }
                }
        }
            default:
        return state
    }
}
}*/
import { createAction } from "../../utils/typesUtil";
import { PlantType } from "../models/plant";
import HttpError from "../../utils/HttpError";
import { GenericReducerType } from "../../utils/redux/createReducer";
import { Actions } from "../actions/plantActions";

export default function (state: GenericReducerType<PlantType> = { objects: {}, requests: {} }, actions: Actions): GenericReducerType<PlantType> {
    switch (actions.type) {
        case 'FETCH_PLANTS':
            return {
                ...state,
                requests: {
                    [actions.querystring]: {
                        ...state.requests[actions.querystring],
                        invalidate: false,
                        isFetching: true,

                    }
                }
            }
        case 'RECEIVE_PLANTS':
            const objects = { ...state.objects }
            actions.data.forEach(d => objects[d._id] = {
                isFetching: false,
                invalidate: false,
                result: d
            })
            return {
                ...state,
                objects: objects,
                requests: {
                    ...state.requests,
                    [actions.querystring]: {
                        ...state.requests[actions.querystring],
                        result: actions.data.map(d => d._id)
                    }
                }
            }
        case 'ERROR_PLANTS':
            return {
                ...state,
                requests: {
                    [actions.querystring]: {
                        ...state.requests[actions.querystring],
                        invalidate: false,
                        isFetching: true,

                    }
                }
            }
        case 'INVALIDATE_PLANT':
            return {
                ...state,
                requests: {
                    [actions.querystring]: {
                        ...state.requests[actions.querystring],
                        invalidate: true,
                    }
                }
            }
        default:
            return state
    }
}
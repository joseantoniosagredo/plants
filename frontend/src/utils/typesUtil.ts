type Action<T extends string, P={}> = { type: T } & P
export function createAction<T extends string>(type: T): Action<T>
export function createAction<T extends string, P={}>(type: T, payload: P): Action<T, P>
export function createAction<T extends string, P>(type: T, payload?: P) {
    return payload !== undefined ? { type, ...payload } : { type }
}
export type ActionUnion<A extends { [a: string]: (...arg: any[]) => void }> = ReturnType<A[keyof A]>
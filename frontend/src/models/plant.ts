import { RegisterType } from "./register";

export type PlantType = {
    _id: string,
    name: string,
    species?: string,
    mainPicture?: string,
    lastRegister?: RegisterType
}
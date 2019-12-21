import { Document, Schema, model, Types } from 'mongoose'
import { ModelsNames } from './enums';

type PlantType = {
    name: string,
    species?: string,
    mainPicture?: Types.ObjectId
} & Document

const schema = new Schema<PlantType>({
    name: { type: String, required: true },
    species: { type: String },
    mainPicture: { type: Types.ObjectId }
})

export default model<PlantType>(ModelsNames.PLANT, schema)
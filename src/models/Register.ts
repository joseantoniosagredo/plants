import { Document, Schema, model, Types } from 'mongoose'
import { ModelsNames } from './enums';

type RegisterType = {
    date: Date,
    plant: Types.ObjectId,
    picture?: Types.ObjectId,
    watered: boolean,
    paided: boolean
} & Document

const schema = new Schema({
    date: { type: String, required: true },
    plant: { type: Types.ObjectId, required: true, ref: ModelsNames.PLANT },
    picture: { type: Types.ObjectId },
    watered: { type: Boolean, required: true },
    paided: { type: Boolean, required: true }
})

export default model<RegisterType>(ModelsNames.REGISTER, schema)
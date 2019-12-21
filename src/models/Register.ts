import { Document, Schema, model, Types } from 'mongoose'
import { ModelsNames } from './enums';

type RegisterType = {

} & Document

const schema = new Schema({
    date: { type: String, required: true },
    plant: { type: Types.ObjectId, required: true, ref:ModelsNames.PLANT },
    picture: { type: Types.ObjectId }
})

export default model<RegisterType>(ModelsNames.REGISTER, schema)
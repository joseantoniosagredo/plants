import { Document, Schema, model } from 'mongoose'
import { ModelsNames } from './enums';

type UserType = {

} & Document

const schema = new Schema({

})

export default model<UserType>(ModelsNames.USER, schema)
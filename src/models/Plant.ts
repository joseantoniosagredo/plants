import { Document, Schema, model } from 'mongoose'
import { ModelsNames } from './enums';

type PlantType = {

} & Document

const schema = new Schema({
    
})

export default model<PlantType>(ModelsNames.PLANT, schema)
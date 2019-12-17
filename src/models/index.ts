import * as mongooose from 'mongoose'

mongooose.connect('mongodb://localhost:27017/plants')

export { default as User } from './User';
export { default as Plant } from './Plant';


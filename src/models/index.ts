import * as mongooose from 'mongoose'

mongooose.connect('mongodb://mongo:27017/plants')

export { default as User } from './User';
export { default as Plant } from './Plant';


import { ApiRouter } from 'mongoose-restapi-ui'
import { User, Plant } from '../models';

const route = ApiRouter()
route.setGlobalRoute('/api/rest')
route.setModel('/user', User)
route.setModel('/plant', Plant)
export default route
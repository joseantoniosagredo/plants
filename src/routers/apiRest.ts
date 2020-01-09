import { ApiRouter } from 'mongoose-restapi-ui'
import { User, Plant, Register } from '../models';
const route = ApiRouter()

route.setGlobalRoute('/api/rest')
route.setModel('/user', User)
route.setModel('/plant', Plant)
route.setModel('/register', Register)

export default route
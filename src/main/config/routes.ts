import { type Express, Router } from 'express'
import routes from '../routes'

const router = Router()

export default (app: Express): void => {
  app.use('/api', router)
  routes.forEach(route => { route(router) })
}

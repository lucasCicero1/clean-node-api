import type { Router, RequestHandler } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddSurveyController } from '../factories/controllers/survey/add-survey/add-survey-controller-factory'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { makeLoadSurveysController } from '../factories/controllers/survey/load-surveys/load-surveys-controller-factory'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin')) as any
  const auth = adaptMiddleware(makeAuthMiddleware('auth')) as any
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()) as RequestHandler)
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()) as RequestHandler)
}

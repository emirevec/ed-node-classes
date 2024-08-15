import express from 'express'
import { CommonRoutesConfig } from '../common/routes/common.routes.config'
import UsersController from '../controllers/users/users.controller'
import UsersMiddlewares from '../middlewares/users/users.middlewares'

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application){
    super(app, 'UsersRoutes')
  }

  configureRoutes(): express.Application {
    this.app
    .route(`/users`)
    .get(UsersController.listUsers)
    .post(
      UsersMiddlewares.validateRequireUserBodyFields,
      UsersMiddlewares.validateSameEmailDoesntExist,
      UsersController.creatUser
    )
    this.app.param(`userId`, UsersMiddlewares.extractUserId)
    this.app
    .route(`/users/:userId`)
    .all(UsersMiddlewares.validateUserExists)
    .get(UsersController.getUserById)
    .delete(UsersController.removeUser)
    this.app.put(`users/:userId`,[
      UsersMiddlewares.validateRequireUserBodyFields,
      UsersMiddlewares.validateSameEmailBelongToSameUser,
      UsersController.putUser
    ])
    this.app.patch(`users/:userId`, [
      UsersMiddlewares.vaidatePatchEmail,
      UsersController.patchUser
    ])
    return this.app
  }
}

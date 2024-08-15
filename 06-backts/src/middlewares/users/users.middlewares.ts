import express from 'express'
import debug from 'debug'
import UsersService from '../../services/users/users.service'

const log: debug.IDebugger = debug('app:users-controller')

class UsersMiddleware {
  async validateRequireUserBodyFields(req: express.Request, res: express.Response, next: express.NextFunction){
    if(req.body && req.body.email && req.body.password){
      next()
    } else {
      res.status(400).send({error: 'Missing required fields email and password'})
    }
  }

  async validateSameEmailDoesntExist(req: express.Request, res: express.Response, next: express.NextFunction){
    const user = await UsersService.readById(req.body.email)
    if(user){
      res.status(400).send({error:'User emaill already exists'})
    } else {
      next()
    }
  }

  async validateSameEmailBelongToSameUser(req: express.Request, res: express.Response, next: express.NextFunction){
    const user = await UsersService.readById(req.body.email)
    if(user && user.id ===req.params.userId){
      next()
    } else {
      res.status(400).send({error: 'Invalid email'})
    }
  }

  vaidatePatchEmail = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if(req.body.email){
      log('Validating email', req.body.email)
      this.validateSameEmailBelongToSameUser(req, res, next)
    } else {
      next()
    }
  }

  async validateUserExists(req: express.Request, res: express.Response, next: express.NextFunction){
    const user = await UsersService.readById(req.params.userId)
    if(user){
      next()
    } else {
      res.status(400).send({error: `User ${req.params.userId} not found`})
    }
  }

  async extractUserId(req: express.Request, res: express.Response, next: express.NextFunction){
    req.body.id = req.params.userId
    next()
  }
}

export default new UsersMiddleware()

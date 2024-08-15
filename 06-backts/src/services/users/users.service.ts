import UserDao from '../../models/users/dao/user.dao'
import { CRUD } from '../../common/interfaces/crud.interfaces'
import { CreateUserDto } from '../../models/users/dto/create.user.dto'
import { PutUserDto } from '../../models/users/dto/put.user.dto'
import { PatchUserDto } from '../../models/users/dto/patch.user.dto'

class UsersService implements CRUD {
  async create(resource: CreateUserDto){
    return UserDao.addUser(resource)
  }
  
  async list(limit: number, page: number){
    return UserDao.getUsers()
  }

  async readById(id: string){
    return UserDao.getUserById(id)
  }
  
  async putById(id: string, resource: PutUserDto){
    return UserDao.putUserById(id, resource)
  }
  
  async patchById(id: string, resource: PatchUserDto){
    return UserDao.patchUserById(id, resource)
  }

  async deleteById(id: string){
    return UserDao.removeUserById(id)
  }
}

export default new UsersService()
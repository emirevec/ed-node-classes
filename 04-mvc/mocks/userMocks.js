const userModelDataMock = {
  name: 'Jonny Doe',
  email: 'jonny@mail.com',
  password: 'pass1234'
}

const userDatabaseMock = {
  name: 'Jonny Doe',
  email: 'jonny@mail.com',
  password: 'pass1234hashed',
  date: 'date',
  _id: 'user01_id'
}

const userListDatabaseMock = [
  {
    name: 'first name',
    email: 'user01@mail.com',
    password: 'pass1234hashed',
    date: 'date',
    _id: 'user01_id'
  },
  {
    name: 'first name',
    email: 'user02@mail.com',
    password: 'pass1234hashed',
    date: 'date',
    _id: 'user02_id'
  }]

export {
  userModelDataMock,
  userDatabaseMock,
  userListDatabaseMock
}
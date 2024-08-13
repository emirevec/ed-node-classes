import { PutUserDto } from './put.user.dto.ts'

export interface PatchUserDto extends Partial<PutUserDto> {}
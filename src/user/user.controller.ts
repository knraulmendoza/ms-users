import { Controller } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserMsg } from 'src/common/constants';
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @MessagePattern(UserMsg.CREATE)
  create(@Payload() userDto: UserDto) {
    return this.userService.create(userDto);
  }

  @MessagePattern(UserMsg.FIND_ALL)
  findAll() {
    return this.userService.findAll();
  }

  @MessagePattern(UserMsg.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.userService.findOne(id);
  }

  @MessagePattern(UserMsg.UPDATE)
  update(@Payload() payload: any) {
    return this.userService.update(payload.id, payload.userDto);
  }

  @MessagePattern(UserMsg.DELETE)
  delete(@Payload() id: string) {
    return this.userService.delete(id);
  }
}

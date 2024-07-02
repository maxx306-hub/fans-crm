import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(@InjectModel(User) private userRepository: typeof User){ }

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto)
    return user

  }

  findOne(id: number) {
    const user = this.userRepository.findOne({where: {
      id
    }})
    return user;
  }
}

import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { REPOSITORIES } from '../const/repositories';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { LoginDto } from './dto/login.dto';
import { BcryptAdapter } from '../../config/adapters/bcrypt.adapter';
import { UserCreateDto } from './dto/user.create.dto';
import { ResponseMessageInterface } from '../../common/interface/response-message.interface';
import { isUndefined } from '@nestjs/common/utils/shared.utils';


@Injectable()
export class AuthService {
  protected readonly logger = new Logger('AuthService');

  constructor(
    @Inject(REPOSITORIES.user)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly bcrypt: BcryptAdapter,
  ) {
  }

  async login(user: LoginDto): Promise<string> {

    const userFound = await this.userRepository.findOne({
      where: { userName: user.userName },
      loadEagerRelations: true,
    });

    if (!userFound) throw new HttpException({
      message: 'Incorrect credentials',
      status: false,
    }, HttpStatus.BAD_REQUEST);

    const isValidPass = this.bcrypt.compare(user.password, userFound.password);

    if (!isValidPass) throw new HttpException({
      message: 'Incorrect credentials',
      status: false,
    }, HttpStatus.BAD_REQUEST);

    return this.jwtService.sign({
      id: userFound.id,
      userName: userFound.userName,
      gym: userFound?.gym,
      branch: userFound?.branch,
    });

  }

  async register(user: UserCreateDto): Promise<ResponseMessageInterface> {
    try {

      const userExists = await this.userRepository.findOne({ where: { userName: user.userName } });

      if (userExists) throw new HttpException({ message: 'INVALID USER, USERNAME ALREDY EXISTS' }, HttpStatus.BAD_REQUEST);

      const userEntity = this.userRepository.create(user);
      userEntity.password = this.bcrypt.hash(userEntity.password);

      if (user?.gym && user?.gym !== 0) userEntity.roles = ['gym_admin'];

      if (user?.branch && user?.branch !== 0) userEntity.roles = ['branch_admin'];

      if (user?.gym && user?.branch) {
        throw new HttpException({ message: 'BAD REQUEST' }, HttpStatus.BAD_REQUEST);
      }

      if (!user?.gym && !user?.branch) userEntity.roles = ['super_admin'];

      await this.userRepository.save(userEntity);
      return { message: 'USER CREATED', status: true };

      // todo: validar que un usuario gym admin solo puede crear usuarios para sus branches
    } catch (e) {

      if (e.status === 400) {
        throw new HttpException({ message: e.message, status: false }, HttpStatus.BAD_REQUEST);
      }

      this.logger.error(e);
      throw new HttpException({ message: 'INTERNAL SERVER ERROR', status: false }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }


  generateQrToken(userId: string): string {
    const payload = {
      id: userId,
      // exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 31,
    };
    return this.jwtService.sign(payload);
  }

  validateQrToken(token: string): any {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      throw new Error('Invalid token');
    }
  }
}

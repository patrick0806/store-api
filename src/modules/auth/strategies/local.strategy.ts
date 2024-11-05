import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Customer } from '@shared/entities/customer.entity';
import { User } from '@shared/entities/user.entity';
import { CustomerRepository } from '@shared/repositories/customer.repository';
import { UserRepository } from '@shared/repositories/user.repository';
import { compareHash } from '@shared/utils/hash.util';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private customerRepository: CustomerRepository, private userRepository: UserRepository) {
    super();
  }

  async validate(email: string, password: string): Promise<Customer | User> {
    const customer = await this.customerRepository.findByEmail(email);
    if (customer) {
      await this.validatePassword(password, customer.password);
      return customer;
    }
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      await this.validatePassword(password, user.password);
      return user;
    }

    throw new NotFoundException(`Not found user with email: ${email} in database`);
  }

  private async validatePassword(password: string, hash: string) {
    const isValidPassword = await compareHash(password, hash);
    if (!isValidPassword) {
      throw new UnauthorizedException('Email or password are invalid, verify your data and try again');
    }
  }
}

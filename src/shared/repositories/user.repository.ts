import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./base.repository";
import { User } from "@shared/entities/user.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class UserRepository extends BaseRepository<User> {
    private userRepository: Repository<User>
    constructor(datasouce: DataSource) {
        super(datasouce.getRepository(User))
        this.userRepository = datasouce.getRepository(User);
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOneBy({ email });
    }
}
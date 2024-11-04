import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./base.repository";
import { User } from "@shared/entities/user.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class UserRepository extends BaseRepository<User> {
    private userRepository: Repository<User>
    constructor(datasouce: DataSource) {
        super(datasouce)
        this.userRepository = datasouce.getRepository(User);
    }
}
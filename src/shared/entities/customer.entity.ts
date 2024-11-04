import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity('customers')
export class Customer extends BaseEntity {
    @Column({
        name: 'name',
        type: 'varchar',
        length: 60,
        unique: false,
        nullable: false,
    })
    name: string;

    @Column({
        name: 'email',
        type: 'varchar',
        length: 60,
        unique: true,
        nullable: true,
    })
    email: string;

    @Column({
        name: 'password',
        type: 'varchar',
        length: 255,
        unique: false,
        nullable: true,
    })
    password: string;

    @Column({
        name: 'phone_number',
        type: 'varchar',
        length: 24,
        unique: false,
        nullable: true,
    })
    phoneNumber?: string;

    @Column({
        name: 'is_active',
        type: 'boolean',
        default: true
    })
    isActive: boolean;
}
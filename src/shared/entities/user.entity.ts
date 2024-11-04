import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({
    name: 'app_user',
})
export class User extends BaseEntity {
    @Column({
        name: 'name',
        type: 'varchar',
        length: 75,
        nullable: false,
    })
    name: string;

    @Column({
        name: 'email',
        type: 'varchar',
        length: 150,
        nullable: false,
        unique: true,
    })
    email: string;

    @Column({
        name: 'password',
        type: 'varchar',
        length: 150,
        nullable: false,
    })
    password: string;

    @Column({
        name: 'is_active',
        type: 'boolean',
        default: true
    })
    isActive: boolean;
}
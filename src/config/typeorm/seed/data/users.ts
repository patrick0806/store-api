import { User } from "@shared/entities/user.entity";
import { generateHash } from "@shared/utils/hash.util";

export const usersData: User[] = [
    {
        id: 1,
        name: 'Patrick Nicezi',
        email: 'patrickk0806@gmail.com',
        password: generateHash("dev"),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        version: 1
    },
    {
        id: 2,
        name: 'Matheus Tonon',
        email: 'matheustonon@email.com',
        password: generateHash("dev"),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        version: 1
    }
]
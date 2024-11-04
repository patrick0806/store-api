import { hashSync, compare } from 'bcrypt';
const HASH_SALT = 10

export function generateHash(password: string): string {
    return hashSync(password, HASH_SALT);
}

export async function compareHash(
    password: string,
    hashedPassword: string,
): Promise<boolean> {
    return compare(password, hashedPassword);
}
import { hashSync, compare } from 'bcrypt';

export function generateHash(password: string): string {
    return hashSync(password, this.HASH_SALT);
}

export async function compareHash(
    password: string,
    hashedPassword: string,
): Promise<boolean> {
    return compare(password, hashedPassword);
}
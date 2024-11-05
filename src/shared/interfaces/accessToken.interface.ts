export interface IAccessToken {
    id: number,
    name: string,
    email: string,
    role: 'ADMIN' | 'CUSTOMER',
}
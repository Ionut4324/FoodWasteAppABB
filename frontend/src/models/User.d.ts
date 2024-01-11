export interface UserAttributes {
    id: number,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    Products: ProductAttributes[]
}

export interface UserCreationAttributes {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
}
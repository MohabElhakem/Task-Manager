export interface CreateUserBody {
    username: string,
    email: string,
    password: string
}

export interface LoginBody {
    email: string,
    password:string
}

export interface UpdatePasswordBody {
    id : string,
    password: string,
    newPassword: string,
    confirmNewPassword:string
}
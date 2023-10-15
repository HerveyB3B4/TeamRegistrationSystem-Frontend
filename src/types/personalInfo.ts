export interface loginInfo {
    account: string,
    password: string,
}

export interface registerInfo {
    name: string,
    phone: string,
    email: string,
    password: string,
}

export interface userInfo {
    name: string,
    avatar: string,
}

export interface userSubmitInfo {
    name: string,
    phone: string,
    email: string,
    birthday: string,
    address: string,
    motto: string,
}

export interface userCompeleteInfo {
    user_id: number,
    name: string,
    phone: string,
    email: string,
    birthday: string,
    address: string,
    motto: string,
    avatar: string,
}

export interface userMessage {
    information: string,
    time: string,
}

export interface forgotPasswordInfo {
    account: string,
    password: string,
    code: string,
}
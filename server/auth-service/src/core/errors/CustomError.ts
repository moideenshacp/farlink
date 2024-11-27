export class CustomError extends Error{
    status:number
    constructor(status:number,message:string){
        super(message)
        this.status = status
        this.name = this.constructor.name
    }
}

// ========================= User already exist ========================================

export class UserExist extends CustomError{
    constructor(){
        super(400,"User already exists")
    }
}

// ========================= User not found ========================================

export class userNotFound extends CustomError{
    constructor(){
        super(400,"User not found..")
    }
}

// ========================= User already verified ========================================

export class userAlreadyverifed extends CustomError{
    constructor(){
        super(400,"User is already verified..")
    }
}

// ========================= Token error ========================================

export class TokenError extends CustomError{
    constructor(){
        super(400,"Invalid  or expired token")
    }
}

// ========================= Login user not found ========================================

export class LoginUserError extends  CustomError{
    constructor(){
        super(400,"Invalid email or password")
    }
}


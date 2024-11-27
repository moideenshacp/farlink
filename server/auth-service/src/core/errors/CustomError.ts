export class CustomError extends Error{
    status:number
    constructor(status:number,message:string){
        super(message)
        this.status = status
        this.name = this.constructor.name
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
        super(400,"Invalid  or expired token ")
    }
}
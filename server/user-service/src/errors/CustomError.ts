export class CustomError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
  }
}

// ========================= User already exist ========================================

export class UserExist extends CustomError {
  constructor() {
    super(400, "User already exists");
  }
}

// ========================= User not found ========================================

export class userNotFound extends CustomError {
  constructor() {
    super(400, "User not found..");
  }
}

// ========================= User already verified ========================================

export class userAlreadyverifed extends CustomError {
  constructor() {
    super(400, "User is already verified..");
  }
}
//==================================blocked======================================
export class userBlocked extends CustomError {
  constructor(){
    super(400,"Access Restricted..")
  }
}
// ========================= Token error ========================================

export class TokenError extends CustomError {
  constructor() {
    super(400, "Invalid  or expired token");
  }
}

// ========================= Login user not found ========================================

export class LoginUserError extends CustomError {
  constructor() {
    super(400, "Invalid email or password");
  }
}

//=============================== login user not verified =================================
export class LoginUserNotVerified extends CustomError {
  constructor() {
    super(400, "Please verify your Email first...");
  }
}

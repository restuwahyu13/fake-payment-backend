import { IsBase64, IsEmail, IsHexadecimal, isHexadecimal, IsJWT, IsMobilePhone, IsNotEmpty, IsString, IsUUID, Matches } from 'class-validator'

export class UserLoginDTO {
  @IsNotEmpty()
  email: string

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,128}$)/, {
    message: 'Password should contain symbols, uppercase letters, lowercase letters, numbers, and special characters',
  })
  password: string
}

export class UserRegisterDTO {
  @Matches(/^[a-z\s]+$/gi, { message: 'First should contain alpha character' })
  first_name: string

  @Matches(/^[a-z\s]+$/gi, { message: 'Last should contain alpha character' })
  last_name: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsMobilePhone('en-US')
  mobile: string

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,128}$)/, {
    message: 'Password should contain symbols, uppercase letters, lowercase letters, numbers, and special characters',
  })
  password: string
}

export class VerifiedEmailDTO {
  @IsNotEmpty()
  token: string
}

export class ForgotPasswordDTO {
  @IsEmail()
  email: string
}

export class ResendEmailDTO {
  @IsEmail()
  email: string
}

export class ResetPassword {
  @IsNotEmpty()
  token: string

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,128}$)/, {
    message: 'Password should contain symbols, uppercase letters, lowercase letters, numbers, and special characters',
  })
  password: string

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,128}$)/, {
    message: 'Confirm password should contain symbols, uppercase letters, lowercase letters, numbers, and special characters',
  })
  cpassword: string
}

export class ResetPasswordDTO {
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,128}$)/, {
    message: 'Password should contain symbols, uppercase letters, lowercase letters, numbers, and special characters',
  })
  password: string

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,128}$)/, {
    message: 'Confirm password should contain symbols, uppercase letters, lowercase letters, numbers, and special characters',
  })
  cpassword: string
}

export class HealthTokenDTO {
  @IsJWT()
  token: string
}

export class RefreshTokenDTO {
  @IsJWT()
  token: string
}

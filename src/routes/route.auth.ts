import { Inject, Route, Router } from '~/helpers/helper.di'
import { AuthController } from '~/controllers/controller.auth'
import { ForgotPasswordDTO, HealthTokenDTO, RefreshTokenDTO, ResendEmailDTO, ResetPassword, UserLoginDTO, UserRegisterDTO, VerifiedEmailDTO } from '~/dtos/dto.auth'
import { ValidatorMiddleware } from '~/middlewares/middleware.validator'

@Route()
export class AuthRoute {
  private router: Router

  constructor(
    @Inject('AuthController')
    private readonly controller: AuthController,
    @Inject('ValidatorMiddleware')
    private readonly validator: ValidatorMiddleware,
  ) {
    this.router = Router({ strict: true, caseSensitive: true })
  }

  main(): Router {
    this.router.post('/login', [this.validator.use(UserLoginDTO)], this.controller.login())
    this.router.post('/register', [this.validator.use(UserRegisterDTO)], this.controller.register())
    this.router.get('/verify-email/:token', [this.validator.use(VerifiedEmailDTO)], this.controller.verifyEmail())
    this.router.post('/resend-verification', [this.validator.use(ResendEmailDTO)], this.controller.resendEmail())
    this.router.post('/forgot-password', [this.validator.use(ForgotPasswordDTO)], this.controller.forgotPassword())
    this.router.post('/reset-password/:token', [this.validator.use(ResetPassword)], this.controller.resetPassword())
    this.router.post('/health-token', [this.validator.use(HealthTokenDTO)], this.controller.healthToken())
    this.router.post('/refresh-token', [this.validator.use(RefreshTokenDTO)], this.controller.refreshToken())

    return this.router
  }
}

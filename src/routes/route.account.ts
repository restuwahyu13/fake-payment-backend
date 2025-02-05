import { Inject, Route, Router } from '~/helpers/helper.di'
import { AccountController } from '~/controllers/controller.account'
import { AuthMiddleware } from '~/middlewares/middleware.auth'
import { ValidatorMiddleware } from '~/middlewares/middleware.validator'
import { BuyCreditDTO, CloseAccountDTO, Enable2FaDTO, ProfileById, UpdateProfileById } from '~/dtos/dto.account'

@Route()
export class AccountRoute {
  private router: Router

  constructor(
    @Inject('AccountController')
    private readonly controller: AccountController,
    @Inject('ValidatorMiddleware')
    private readonly validator: ValidatorMiddleware,
    @Inject('AuthMiddleware')
    private readonly auth: AuthMiddleware,
  ) {
    this.router = Router({ strict: true, caseSensitive: true })
  }

  main(): Router {
    this.router.get('/profile', [this.auth.use], this.controller.getProfile())
    this.router.put('/profile/:id', [this.auth.use, this.validator.use(ProfileById, UpdateProfileById)], this.controller.updateProfile())
    this.router.post('/2fa', [this.auth.use, this.validator.use(Enable2FaDTO)], this.controller.auth2FA())
    this.router.post('/close', [this.auth.use, this.validator.use(CloseAccountDTO)], this.controller.closeAccount())
    this.router.get('/notifications', [this.auth.use], this.controller.getAllNotificationSetting())
    this.router.put('/notifications/:id', [this.auth.use], this.controller.updateNotificationSetting())
    this.router.get('/device-history', [this.auth.use], this.controller.getAllDeviceHistory())
    this.router.get('/balance-overview', [this.auth.use], this.controller.getBalanceOverview())
    this.router.get('/credits', [this.auth.use], this.controller.getCredits())
    this.router.post('/credits', [this.auth.use, this.validator.use(BuyCreditDTO)], this.controller.buyCredits())

    return this.router
  }
}

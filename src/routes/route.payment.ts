import { Inject, Route, Router } from '~/helpers/helper.di'
import { PaymentController } from '~/controllers/controller.payment'
import { AuthMiddleware } from '~/middlewares/middleware.auth'
import { ValidatorMiddleware } from '~/middlewares/middleware.validator'
import { PaymentACHDTO, PaymentPeionioDTO, PaymentUSDCDTO } from '~/dtos/dto.payment'

@Route()
export class PaymentRoute {
  private router: Router

  constructor(
    @Inject('PaymentController')
    private readonly controller: PaymentController,
    @Inject('ValidatorMiddleware')
    private readonly validator: ValidatorMiddleware,
    @Inject('AuthMiddleware')
    private readonly auth: AuthMiddleware,
  ) {
    this.router = Router({ strict: true, caseSensitive: true })
  }

  main(): Router {
    this.router.post('/peionio', [this.auth.use, this.validator.use(PaymentPeionioDTO)], this.controller.sendPeionio())
    this.router.post('/usdc', [this.auth.use, this.validator.use(PaymentUSDCDTO)], this.controller.sendUSDC())
    this.router.post('/ach', [this.auth.use, this.validator.use(PaymentACHDTO)], this.controller.sendACH())

    return this.router
  }
}

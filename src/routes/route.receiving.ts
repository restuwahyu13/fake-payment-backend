import { Inject, Route, Router } from '~/helpers/helper.di'
import { ReceivingController } from '~/controllers/controller.receiving'
import { AuthMiddleware } from '~/middlewares/middleware.auth'
import { ValidatorMiddleware } from '~/middlewares/middleware.validator'
import { CreateReceivingUsdDTO, ReceivingIdDTO } from '~/dtos/dto.receiving'

@Route()
export class ReceivingRoute {
  private router: Router

  constructor(
    @Inject('ReceivingController')
    private readonly controller: ReceivingController,
    @Inject('ValidatorMiddleware')
    private readonly validator: ValidatorMiddleware,
    @Inject('AuthMiddleware')
    private readonly auth: AuthMiddleware,
  ) {
    this.router = Router({ strict: true, caseSensitive: true })
  }

  main(): Router {
    this.router.post('/', [this.auth.use, this.validator.use(CreateReceivingUsdDTO)], this.controller.createUSDAccount())
    this.router.get('/', [this.auth.use], this.controller.getAllUSDAccount())
    this.router.get('/:id', [this.auth.use, this.validator.use(ReceivingIdDTO)], this.controller.getUSDAccountById())
    this.router.delete('/:id', [this.auth.use, this.validator.use(ReceivingIdDTO)], this.controller.deleteUSDAccountById())

    return this.router
  }
}

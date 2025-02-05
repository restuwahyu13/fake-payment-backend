import { Inject, Route, Router } from '~/helpers/helper.di'
import { TransactionController } from '~/controllers/controller.transaction'
import { AuthMiddleware } from '~/middlewares/middleware.auth'
import { ValidatorMiddleware } from '~/middlewares/middleware.validator'
import { CreateTransactionDTO } from '~/dtos/dto.transaction'

@Route()
export class TransactionRoute {
  private router: Router

  constructor(
    @Inject('TransactionController')
    private readonly controller: TransactionController,
    @Inject('ValidatorMiddleware')
    private readonly validator: ValidatorMiddleware,
    @Inject('AuthMiddleware')
    private readonly auth: AuthMiddleware,
  ) {
    this.router = Router({ strict: true, caseSensitive: true })
  }

  main(): Router {
    this.router.post('/', [this.auth.use, this.validator.use(CreateTransactionDTO)], this.controller.createTransaction())
    this.router.get('/', [this.auth.use], this.controller.getAllTransaction())

    return this.router
  }
}

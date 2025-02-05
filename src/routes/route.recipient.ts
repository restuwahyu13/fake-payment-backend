import { Inject, Route, Router } from '~/helpers/helper.di'
import { RecipientController } from '~/controllers/controller.recipient'
import { AuthMiddleware } from '~/middlewares/middleware.auth'
import { ValidatorMiddleware } from '~/middlewares/middleware.validator'
import { CreateRecipientAchDTO, CreateRecipientPeionioDTO, CreateRecipientUsdcDTO, RecipientIdDTO, UpdateRecipientById } from '~/dtos/dto.recipient'

@Route()
export class RecipientRoute {
  private router: Router

  constructor(
    @Inject('RecipientController')
    private readonly controller: RecipientController,
    @Inject('ValidatorMiddleware')
    private readonly validator: ValidatorMiddleware,
    @Inject('AuthMiddleware')
    private readonly auth: AuthMiddleware,
  ) {
    this.router = Router({ strict: true, caseSensitive: true })
  }

  main(): Router {
    this.router.post('/peionio', [this.auth.use, this.validator.use(CreateRecipientPeionioDTO)], this.controller.createdPeionioRecipient())
    this.router.get('/peionio', [this.auth.use], this.controller.getAllPeionioRecipient())
    this.router.get('/peionio/:id', [this.auth.use, this.validator.use(RecipientIdDTO)], this.controller.getPeioinoRecipientById())
    this.router.put('/peionio/:id', [this.auth.use, this.validator.use(RecipientIdDTO, UpdateRecipientById)], this.controller.updatedPeionioRecipient())
    this.router.delete('/peionio/:id', [this.auth.use, this.validator.use(RecipientIdDTO)], this.controller.deletedPeionioRecipientById())

    this.router.post('/usdc', [this.auth.use, this.validator.use(CreateRecipientUsdcDTO)], this.controller.createdUSDCRecipient())
    this.router.get('/usdc', [this.auth.use], this.controller.getAllUSDCRecipient())
    this.router.get('/usdc/:id', [this.auth.use, this.validator.use(RecipientIdDTO)], this.controller.getUSDCRecipientById())
    this.router.put('/usdc/:id', [this.auth.use, this.validator.use(RecipientIdDTO, UpdateRecipientById)], this.controller.updatedUSDCRecipient())
    this.router.delete('/usdc/:id', [this.auth.use, this.validator.use(RecipientIdDTO)], this.controller.deletedUSDCRecipientById())

    this.router.post('/ach', [this.auth.use, this.validator.use(CreateRecipientAchDTO)], this.controller.createdACHRecipient())
    this.router.get('/ach', [this.auth.use], this.controller.getAllACHRecipient())
    this.router.get('/ach/:id', [this.auth.use, this.validator.use(RecipientIdDTO)], this.controller.getACHRecipientById())
    this.router.put('/ach/:id', [this.auth.use, this.validator.use(RecipientIdDTO, UpdateRecipientById)], this.controller.updatedACHRecipient())
    this.router.delete('/ach/:id', [this.auth.use, this.validator.use(RecipientIdDTO)], this.controller.deletedACHRecipientById())

    return this.router
  }
}

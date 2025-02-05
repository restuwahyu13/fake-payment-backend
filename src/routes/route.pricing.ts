import { Inject, Route, Router } from '~/helpers/helper.di'
import { PricingController } from '~/controllers/controller.pricing'
import { AuthMiddleware } from '~/middlewares/middleware.auth'
import { ValidatorMiddleware } from '~/middlewares/middleware.validator'
import { CreatePricingDTO, PricingByIdDTO, UpdatePricingDTO } from '~/dtos/dto.pricing'

@Route()
export class PricingRoute {
  private router: Router

  constructor(
    @Inject('PricingController')
    private readonly controller: PricingController,
    @Inject('ValidatorMiddleware')
    private readonly validator: ValidatorMiddleware,
    @Inject('AuthMiddleware')
    private readonly auth: AuthMiddleware,
  ) {
    this.router = Router({ strict: true, caseSensitive: true })
  }

  main(): Router {
    this.router.post('/', [this.auth.use, this.validator.use(CreatePricingDTO)], this.controller.createPricing())
    this.router.get('/', [this.auth.use], this.controller.getAllPricing())
    this.router.get('/:id', [this.auth.use, this.validator.use(PricingByIdDTO)], this.controller.getPricingById())
    this.router.put('/:id', [this.auth.use, this.validator.use(PricingByIdDTO, UpdatePricingDTO)], this.controller.updatePricingById())
    this.router.delete('/:id', [this.auth.use, this.validator.use(PricingByIdDTO)], this.controller.deletePricingById())

    return this.router
  }
}

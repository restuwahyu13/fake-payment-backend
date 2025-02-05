import { DependencyContainer } from 'tsyringe'
import { Injectable, Module } from '~/helpers/helper.di'

import { AccountService } from '~/services/service.account'
import { AccountController } from '~/controllers/controller.account'
import { AccountRoute } from '~/routes/route.account'
import { AuthService } from '~/services/service.auth'
import { AuthController } from '~/controllers/controller.auth'
import { AuthRoute } from '~/routes/route.auth'
import { PaymentService } from '~/services/service.payment'
import { PaymentController } from '~/controllers/controller.payment'
import { PaymentRoute } from '~/routes/route.payment'
import { PricingService } from '~/services/service.pricing'
import { PricingController } from '~/controllers/controller.pricing'
import { PricingRoute } from '~/routes/route.pricing'
import { ReceivingService } from '~/services/service.receiving'
import { ReceivingController } from '~/controllers/controller.receiving'
import { ReceivingRoute } from '~/routes/route.receiving'
import { RecipientService } from '~/services/service.recipient'
import { RecipientController } from '~/controllers/controller.recipient'
import { RecipientRoute } from '~/routes/route.recipient'
import { TransactionService } from '~/services/service.transaction'
import { TransactionController } from '~/controllers/controller.transaction'
import { TransactionRoute } from '~/routes/route.transaction'
@Module([
  { token: 'AccountService', useClass: AccountService },
  { token: 'AccountController', useClass: AccountController },
  {
    token: 'AccountRoute',
    useFactory(dc: DependencyContainer) {
      return dc.resolve(AccountRoute).main()
    },
  },

  { token: 'AuthService', useClass: AuthService },
  { token: 'AuthController', useClass: AuthController },
  {
    token: 'AuthRoute',
    useFactory(dc: DependencyContainer) {
      return dc.resolve(AuthRoute).main()
    },
  },

  { token: 'PaymentService', useClass: PaymentService },
  { token: 'PaymentController', useClass: PaymentController },
  {
    token: 'PaymentRoute',
    useFactory(dc: DependencyContainer) {
      return dc.resolve(PaymentRoute).main()
    },
  },

  { token: 'PricingService', useClass: PricingService },
  { token: 'PricingController', useClass: PricingController },
  {
    token: 'PricingRoute',
    useFactory(dc: DependencyContainer) {
      return dc.resolve(PricingRoute).main()
    },
  },

  { token: 'ReceivingService', useClass: ReceivingService },
  { token: 'ReceivingController', useClass: ReceivingController },
  {
    token: 'ReceivingRoute',
    useFactory(dc: DependencyContainer) {
      return dc.resolve(ReceivingRoute).main()
    },
  },

  { token: 'RecipientService', useClass: RecipientService },
  { token: 'RecipientController', useClass: RecipientController },
  {
    token: 'RecipientRoute',
    useFactory(dc: DependencyContainer) {
      return dc.resolve(RecipientRoute).main()
    },
  },

  { token: 'TransactionService', useClass: TransactionService },
  { token: 'TransactionController', useClass: TransactionController },
  {
    token: 'TransactionRoute',
    useFactory(dc: DependencyContainer) {
      return dc.resolve(TransactionRoute).main()
    },
  },
])
@Injectable()
export class RouteModule {
  constructor() {}
}

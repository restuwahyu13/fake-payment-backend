import 'express-async-errors'
import 'reflect-metadata'
import { OutgoingMessage } from 'node:http'
import express, { Express, Request, Response, Router } from 'express'
import { StatusCodes as status } from 'http-status-codes'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import zlib from 'zlib'
import hpp from 'hpp'
import { DataSource } from 'typeorm'
import consola from 'consola'

import { AppModule } from '~/module.app'
import { Container, Injectable } from '~/helpers/helper.di'
import { Environment } from '~/configs/config.env'
import { apiResponse } from '~/helpers/helper.apiResponse'
import { GracefulShutdown } from '~/helpers/helper.gracefulShutdown'

@Injectable()
class App {
  private app: Express
  private server: GracefulShutdown
  private version: string

  constructor() {
    this.app = express()
    this.server = new GracefulShutdown()
    this.version = '/api/user/v1'
    //this version = "/api/admin/v1"; this will be used for admin api
  }

  private async connection(): Promise<void> {
    try {
      const datasource: DataSource = Container.resolve('Connection')
      const bootstrap: DataSource = await datasource.initialize()

      Container.registerInstance('Connection', bootstrap)
      Container.registerInstance('EntityManager', bootstrap.manager)
    } catch (e) {
      throw apiResponse(e)
    }
  }

  private config(): void {
    this.app.enable('trust proxy')
    this.app.disable('x-powered-by')
    Container.resolve<AppModule>(AppModule)
  }

  private middleware(): void {
    this.app.use(bodyParser.json({ limit: '3mb' }))
    this.app.use(bodyParser.raw({ inflate: true, limit: '3mb', type: 'application/json' }))
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(helmet({ contentSecurityPolicy: false }))
    this.app.use(hpp({ checkBody: true, checkQuery: true }))
    this.app.use(
      cors({
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
        allowedHeaders: ['Accept', 'Authorization', 'Content-Type'],
        credentials: true,
      }),
    )
    this.app.use(
      compression({
        strategy: zlib.constants.Z_RLE,
        level: zlib.constants.Z_BEST_COMPRESSION,
        memLevel: zlib.constants.Z_BEST_COMPRESSION,
      }),
    )
    if (!['production', 'staging'].includes(Environment.NODE_ENV)) {
      this.app.use(morgan('dev'))
    }
  }

  private route(): void {
    this.app.use(`${this.version}/account`, Container.resolve<Router>('AccountRoute'))
    this.app.use(`${this.version}/auth`, Container.resolve<Router>('AuthRoute'))
    this.app.use(`${this.version}/payment`, Container.resolve<Router>('PaymentRoute'))
    this.app.use(`${this.version}/pricing`, Container.resolve<Router>('PricingRoute'))
    this.app.use(`${this.version}/receiving-accounts`, Container.resolve<Router>('ReceivingRoute'))
    this.app.use(`${this.version}/recipients`, Container.resolve<Router>('RecipientRoute'))
    this.app.use(`${this.version}/transactions`, Container.resolve<Router>('TransactionRoute'))
  }

  private globalRoute(): void {
    this.app.all('/', (_req: Request, res: Response): OutgoingMessage => {
      return apiResponse<OutgoingMessage>({ stat_code: status.OK, message: 'Ping!' }, res)
    })

    this.app.use((req: Request, res: Response): OutgoingMessage => {
      const metadata: Record<string, any> = {
        host: req.hostname,
        path: req.path,
        method: req.method,
        ip: req.header('x-real-ip') ?? req.header('x-forwarded-for') ?? req.ip ?? req.socket.remoteAddress,
      }

      return apiResponse<OutgoingMessage>({ stat_code: status.NOT_FOUND, message: 'Route not found!', data: metadata }, res)
    })
  }

  private eventSignal(): void {
    if (!Environment.NODE_ENV) {
      consola.warn('Please set node environment to local or staging or production')
      process.exit(0)
    }

    process
      .on('uncaughtException', (e) => {
        consola.error('Interrupt indicate uncaughtException\n\n', JSON.stringify(e))
      })
      .on('unhandledRejection', (e) => {
        consola.error('Interrupt indicate unhandledRejection process\n\n', JSON.stringify(e))
      })
      .on('uncaughtExceptionMonitor', (e) => {
        consola.error('Interrupt indicate uncaughtExceptionMonitor process\n\n', JSON.stringify(e))
      })
      .on('rejectionHandled', (e) => {
        consola.error('Interrupt indicate rejectionHandled process\n\n', JSON.stringify(e))
      })
  }

  public async main(): Promise<void> {
    try {
      await this.connection()
      this.config()
      this.middleware()
      this.route()
      this.globalRoute()
      this.eventSignal()
      this.server.listen(this.app)
    } catch (e) {
      consola.error(e)
    }
  }
}

/**
 * @description boostraping app and run app with env development / production or staging
 */

;(function () {
  if (Environment.NODE_ENV !== 'test') Container.resolve<App>(App).main()
})()

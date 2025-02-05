import consola from 'consola'
import http, { IncomingMessage, OutgoingMessage, Server } from 'node:http'
import { Socket } from 'node:net'
import { Express } from 'express'

import { Environment } from '~/configs/config.env'
import { MultiThread } from '~/helpers/helper.multiThread'

export class GracefulShutdown {
   private multiThread: MultiThread
   private connection: Map<any, any>
   private env: string
   private port: number
   private singleThread: boolean
   private gracefulShutdownTimer: number
   private signals: string[]

   constructor() {
      this.multiThread = new MultiThread()
      this.connection = new Map()
      this.env = Environment.NODE_ENV
      this.port = Environment.PORT
      this.singleThread = Environment.SINGLE_THREAD
      this.gracefulShutdownTimer = this.env === 'development' ? 3000 : 5000
      this.signals = ['SIGTERM', 'SIGINT', 'SIGQUIT', 'SIGHUP', 'SIGABRT', 'SIGALRM', 'SIGUSR1', 'SIGUSR2']
   }

   private close(server: Server, signal: string) {
      const socket = this.connection.get('connection')
      if (!socket?.closed) socket?.destroy()

      server.close(async (err) => {
         await this.sleep(this.gracefulShutdownTimer)
         this.connection.clear()

         if (!err) {
            console.info(`Server Closed Without Error: ${err}`)
            console.info('Gracefull shutdown successfully')

            process.removeAllListeners()
            process.kill(process.pid, signal)
            process.exit(0)
         } else {
            console.info(`Server Closed With Error: ${err}`)
            console.info('Gracefull shutdown successfully')

            process.removeAllListeners()
            process.kill(process.pid, signal)
            process.exit(1)
         }
      })
   }

   private async sleep(timer: number): Promise<void> {
      await new Promise((resolve) => setTimeout(resolve, timer))
   }

   listen(app: Express): void {
      const server: Server = http.createServer(app)

      server.on('connection', (socket: Socket): void => {
         console.info('Server Connection Established')

         if (socket) this.connection.set('connection', socket)
         else socket.destroy()
      })

      server.on('request', (req: IncomingMessage, _res: OutgoingMessage): void => {
         const socketRequest: Socket = req.socket
         const socketConnection: Socket = this.connection.get('connection')

         if (!(socketRequest instanceof Socket) || !(socketConnection instanceof Socket)) {
            this.connection.clear()
            this.connection.set('connection', socketRequest)
         }
      })

      this.signals.forEach((event: string) => {
         if (this.env === 'development') {
            process.on(event, async (signal: string): Promise<void> => {
               console.info(`Server ${this.env} received signal: ${signal}`)

               if (this.singleThread) {
                  this.multiThread.nodecluster.disconnect()
               }

               await this.close(server, signal)
            })
         } else {
            process.on(event, async (signal: string): Promise<void> => {
               console.info(`Server ${this.env} received signal: ${signal}`)

               if (this.singleThread) {
                  this.multiThread.nodecluster.disconnect()
               }

               await this.close(server, signal)
            })
         }
      })

      this.multiThread.cluster(this.singleThread, (): void => {
         const serverInfo: string = `Server is running on port ${this.port}`
         server.listen(this.port, () => consola.info(serverInfo))
      })
   }
}

import os from 'node:os'
import cluster, { Cluster, Worker } from 'node:cluster'
import { EventEmitter } from 'node:events'
import consola from 'consola'

export class MultiThread {
  nodecluster: Cluster
  private cpus = os.cpus().length / 2
  private event: InstanceType<typeof EventEmitter>

  constructor() {
    this.nodecluster = cluster
    this.event = new EventEmitter()
    this.cpus = this.cpus < 1 ? 1 : this.cpus
  }

  cluster(singleThread: boolean, handler: Function): void {
    if (!singleThread && cluster.isPrimary) {
      for (let i = 1; i <= this.cpus; i++) {
        this.nodecluster.fork()
      }

      this.event.on('workers', (args: Partial<Worker>): void => {
        if (args) {
          if (args.isDead()) {
            args.send(args)
          } else {
            args.send(`Worker id ${args.id} is online with pid ${args.process.pid}`)
          }
        }
      })

      this.nodecluster.on('online', (worker: Worker): void => {
        consola.info(`Worker id ${worker.id} is online`)
        this.event.emit('workers', worker)
      })

      this.nodecluster.on('exit', (code, signal) => {
        consola.info(`Worker has teminated received code ${code.id} and signal ${signal}`)

        for (let i = 1; i <= this.cpus; i++) {
          this.nodecluster.fork()
        }
      })
    } else if (!singleThread && cluster.isWorker) {
      process.on('message', (msg: Cluster) => {
        if (msg instanceof Worker) {
          consola.info(`Worker id ${msg.worker.id} and process pid ${msg.worker.process.pid} has teminated`)
          msg.worker.kill()
        } else {
          console.info(msg)
        }
      })
      handler()
    } else {
      handler()
    }
  }
}

import { DataSource, QueryRunner } from 'typeorm'
import { apiResponse } from '~/helpers/helper.apiResponse'

export class Postgres {
   static builderTransaction = async (connection: DataSource, handler: (query: QueryRunner) => Promise<any>): Promise<any> => {
      const query: QueryRunner = connection.createQueryRunner()

      try {
         await query.connect()
         await query.startTransaction()

         const responseTransaction: Record<string, any> = await handler(query)
         console.log('x', responseTransaction)

         if (responseTransaction) {
            await query.commitTransaction()
            return responseTransaction
         }
      } catch (e: any) {
         if (query.isTransactionActive) {
            await query.rollbackTransaction()
            throw apiResponse(e)
         }
      } finally {
         if (query.isReleased) await query.release()
      }
   }
}

import { validate, ValidationError } from 'class-validator'
import { ClassConstructor, plainToClass } from 'class-transformer'
import { StatusCodes as status } from 'http-status-codes'
import { Request, Response, NextFunction, RequestHandler } from 'express'

import { apiResponse } from '~/helpers/helper.apiResponse'
import { Injectable } from '~/helpers/helper.di'
import { OutgoingMessage } from 'node:http'

@Injectable()
export class ValidatorMiddleware {
	use(...MetaTypes: ClassConstructor<any>[]): RequestHandler {
		return async function (req: Request, res: Response, next: NextFunction): Promise<OutgoingMessage | NextFunction> {
			let property: Record<string, any> = {}

			property = Object.assign(property, req.body, req.params, req.query)
			const errorsResponse: ValidationError[] = []

			for (const MetaType of MetaTypes) {
				const object: Record<string, any> = plainToClass(MetaType, property)
				const errors: ValidationError[] = await validate(object)
				errorsResponse.push(...errors)
			}

			const errorMessage = errorsResponse.map((val: ValidationError) => apiResponse({ stat_code: status.UNPROCESSABLE_ENTITY, error: Object.values(val.constraints)[0] }))
			if (errorMessage.length) {
				return apiResponse({ errors: errorMessage, stat_code: status.UNPROCESSABLE_ENTITY }, res)
			}

			next()
		}
	}
}

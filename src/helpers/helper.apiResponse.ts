import { OutgoingMessage } from 'node:http'
import consola from 'consola'
import { Response } from 'express'
import { StatusCodes as status } from 'http-status-codes'
import { TypeORMError } from 'typeorm'

export interface ApiResponse {
	stat_code: number
	message?: string
	err_code?: string
	error?: any
	errors?: any
	data?: any
	pagination?: Record<string, any>
}

export const apiResponse = <T = any>(options: Partial<ApiResponse>, res?: Response): T => {
	const apiResponse: Partial<ApiResponse> = {}
	const errCode: string = 'GENERAL_ERROR'
	const errMessage: string = 'Application is busy please try again later!'

	if (options instanceof Error) {
		consola.error(`
==================================
======== Error Exception =========
==================================

	name: ${options.name}
	message: ${options.message}
	stack: ${options.stack}

==================================
==================================
==================================
		`)
	}

	options.stat_code = options.stat_code ?? status.INTERNAL_SERVER_ERROR

	if (!options.stat_code && !options.message && !options.error) {
		options.err_code = errCode
		options.error = errMessage
	} else if (options?.errors || options instanceof Error || options instanceof TypeORMError) {
		apiResponse.stat_code = options.stat_code
		apiResponse.err_code = errCode
		apiResponse.error = errMessage

		if (options?.errors) {
			delete apiResponse.stat_code
			delete apiResponse.err_code
			delete apiResponse.error

			apiResponse.errors = options.errors
		}

		options = apiResponse
	}

	for (const i of Object.keys(options)) {
		if (options[i] === undefined) {
			delete options[i]
		}
	}

	if (res instanceof OutgoingMessage) {
		return res.status(!options?.errors ? options.stat_code : status.UNPROCESSABLE_ENTITY).json({ ...options }) as any
	}

	return { ...options } as any
}

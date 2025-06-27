import { NextRequest } from 'next/server'

interface IBaseSearchFields {
	id?: string | number | string[] | number[]
	slug?: string | string[] | number | number[]
}

export interface IActionOptions extends IBaseSearchFields {
	url: string
	headers?: {
		[key: string]: string
	}
	body?: Record<string, unknown> | string
	params?: {
		method?: 'GET' | 'POST'
		next?: {
			tags: string[]
		}
		credentials?: 'include' | 'same-origin' | 'omit'
		cache?: 'no-store' | 'no-cache' | 'force-cache' | 'only-if-cached'
		mode?: 'cors' | 'no-cors' | 'same-origin'
		headers?: {
			[key: string]: string
		}
	}
	isServerAction?: boolean
	filters?: Record<string, unknown>
	customFormatter?: (
		filters: Record<string, unknown>
	) => Record<string, string> | undefined
}

// Алиас для совместимости
export type ActionOptions = IActionOptions

export interface MutateActionOptions {
	url: string
	params?: {
		method: 'POST' | 'PUT' | 'DELETE'
		headers?: Record<string, string>
		body?: Record<string, unknown> | string
	}
	isServerAction?: boolean
	revalidateTags?: string[]
	revalidatePaths?: string[]
}

export interface ApiRequestParams {
	url: string
	options?: RequestInit
	context?: {
		req?: NextRequest
		params?: Record<string, unknown>
		searchParams?: URLSearchParams
	}
	debug?: boolean
}

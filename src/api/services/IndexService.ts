/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateSearchIndexRequest } from '../models/CreateSearchIndexRequest'
import type { SearchIndex } from '../models/SearchIndex'
import type { UpdateSearchIndexRequest } from '../models/UpdateSearchIndexRequest'

import type { CancelablePromise } from '../core/CancelablePromise'
import { OpenAPI } from '../core/OpenAPI'
import { request as __request } from '../core/request'

export class IndexService {
  /**
   * @param page
   * @param count
   * @param domain
   * @param category
   * @param search
   * @param url
   * @param createdAfter
   * @param fullIndexed
   * @returns SearchIndex Success
   * @throws ApiError
   */
  public static getIndecies(
    page?: number,
    count?: number,
    domain?: string,
    category?: string,
    search?: string,
    url?: string,
    createdAfter?: string,
    fullIndexed?: boolean,
  ): CancelablePromise<Array<SearchIndex>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/Index',
      query: {
        Page: page,
        Count: count,
        Domain: domain,
        Category: category,
        Search: search,
        Url: url,
        CreatedAfter: createdAfter,
        FullIndexed: fullIndexed,
      },
    })
  }

  /**
   * @param requestBody
   * @returns any Created
   * @throws ApiError
   */
  public static postIndex(
    requestBody?: CreateSearchIndexRequest,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/Index',
      body: requestBody,
      mediaType: 'application/json',
    })
  }

  /**
   * @param id
   * @returns SearchIndex Success
   * @throws ApiError
   */
  public static getIndexById(id: string): CancelablePromise<SearchIndex> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/Index/{id}',
      path: {
        id: id,
      },
      errors: {
        404: `Not Found`,
      },
    })
  }

  /**
   * @param id
   * @param requestBody
   * @returns SearchIndex Accepted
   * @throws ApiError
   */
  public static updateIndex(
    id: string,
    requestBody?: UpdateSearchIndexRequest,
  ): CancelablePromise<SearchIndex> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/Index/{id}',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        404: `Not Found`,
      },
    })
  }
}

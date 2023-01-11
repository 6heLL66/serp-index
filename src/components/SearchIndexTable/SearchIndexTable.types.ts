export type GetIndexesRequest = {
  page?: number
  count?: number
  domain?: string
  category?: string
  search?: string
  url?: string
  createdAfter?: string
  fullIndexed?: boolean
}

export enum IndexToggleType {
  All = 'All',
  Fully = 'Fully',
  NotFully = 'NotFully',
}

export enum IndexStatus {
  Unindexed = 'unindexed',
  PartialIndexed = 'partial-indexed',
  FullyIndexed = 'fully-indexed',
  PartialExpired = 'partial-expired',
  FullyExpired = 'fully-expired',
}

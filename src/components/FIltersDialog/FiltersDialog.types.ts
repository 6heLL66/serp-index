export enum FilterOption {
  Category = 'category',
  Domain = 'domain',
}

export type FilterOptions = {
  [FilterOption.Category]: string[]
  [FilterOption.Domain]: string[]
}

export type Filters = {
  [FilterOption.Category]?: string
  [FilterOption.Domain]?: string
  search?: string
  createdAfter?: string
}

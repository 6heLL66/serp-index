import { SearchIndex } from '../../api'
import { FilterOption, FilterOptions } from './FiltersDialog.types'

export const getFilterOptions = (
  data: Array<SearchIndex>,
  options: FilterOption[],
): FilterOptions => {
  return options.reduce((acc: FilterOptions, option: FilterOption) => {
    return {
      ...acc,
      [option]: Array.from(
        new Set(
          data.map((searchIndex: SearchIndex) => {
            return searchIndex[option as keyof typeof searchIndex]
          }),
        ),
      ),
    }
  }, {} as FilterOptions)
}

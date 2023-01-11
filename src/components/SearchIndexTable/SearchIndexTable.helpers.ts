import { IndexToggleType } from './SearchIndexTable.types'

export const getIndexValue = (type: IndexToggleType) => {
  switch (type) {
    case IndexToggleType.All:
      return undefined
    case IndexToggleType.Fully:
      return true
    case IndexToggleType.NotFully:
      return false
    default:
      return undefined
  }
}

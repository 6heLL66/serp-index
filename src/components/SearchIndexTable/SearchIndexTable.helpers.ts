import { SearchIndex } from '../../api'
import { getSplitedLanguages } from '../../services/helpers/getSplitedLanguages'
import { IndexStatus, IndexToggleType } from './SearchIndexTable.types'

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

export const getRowStatus = (row: SearchIndex) => {
  const { indexedLanguages, unindexedLanguages, expiredIndexedLanguages } =
    getSplitedLanguages(row.entries || [])

  if (expiredIndexedLanguages.length === row.entries?.length) {
    return IndexStatus.FullyExpired
  }

  if (indexedLanguages.length === row.entries?.length) {
    return IndexStatus.FullyIndexed
  }

  if (unindexedLanguages.length === row.entries?.length) {
    return IndexStatus.Unindexed
  }

  if (expiredIndexedLanguages.length === 0) {
    return IndexStatus.PartialIndexed
  }

  return IndexStatus.PartialExpired
}

import { Entry } from '../../api'

export const getSplitedLanguages = (entries: Entry[]) => {
  const indexedLanguages: string[] = []
  const unindexedLanguages: string[] = []

  entries.forEach((entry: Entry) => {
    if (entry.indexedTotal !== 0 && entry.indexedCount === entry.indexedTotal) {
      indexedLanguages.push(entry.language || '')
      return
    }
    unindexedLanguages.push(entry.language || '')
  })
  return { indexedLanguages, unindexedLanguages }
}

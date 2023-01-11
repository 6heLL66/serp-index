import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useCallback, useState, useEffect } from 'react'
import { ToggleButtonGroup, ToggleButton, Box } from '@mui/material'
import { toast } from 'react-toastify'
import { LoadingButton } from '@mui/lab'
import { IndexService, SearchIndex } from '../../api'
import { useRequest } from '../../services/hooks/useRequest'
import { getDaysUntilExpire } from '../../services/helpers/getDaysUntilExpire'
import { SearchIndexModal } from '../SearchIndexModal'
import { getSplitedLanguages } from '../../services/helpers/getSplitedLanguages'
import { IndexToggleType } from './SearchIndexTable.types'
import { getIndexValue } from './SearchIndexTable.helpers'
import { CreateIndexDialog } from '../CreateIndexDialog/CreateIndexDialog.component'

const columns: GridColDef[] = [
  {
    field: 'createdOn',
    headerName: 'Created On',
    width: 160,
    valueGetter: params => new Date(params.value).toLocaleString(),
  },
  { field: 'domain', headerName: 'Domain', width: 150 },
  { field: 'category', headerName: 'Category', width: 150 },
  {
    field: 'title',
    headerName: 'Title',
    width: 250,
  },
  {
    field: 'validUntil',
    headerName: 'Days until expired',
    width: 130,
    valueGetter: params =>
      `${getDaysUntilExpire(Date.parse(params.value))} days`,
  },
  {
    field: 'Indexed languages',
    headerName: 'Indexed languages',
    width: 140,
    valueGetter: params =>
      getSplitedLanguages(params.row.entries).indexedLanguages.join(', '),
  },
  {
    field: 'Unindexed languages',
    headerName: 'Unindexed languages',
    width: 160,
    valueGetter: params =>
      getSplitedLanguages(params.row.entries).unindexedLanguages.join(', '),
  },
]

const defaultPageSize = 10

export const SearchIndexTable: React.FC = () => {
  const [indexType, setIndexType] = useState(IndexToggleType.All)
  const [modalData, setModalData] = useState<null | SearchIndex>(null)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(defaultPageSize)

  const fetchData = useCallback(async () => {
    return IndexService.getIndecies(
      page + 1,
      pageSize,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      getIndexValue(indexType),
    )
  }, [page, pageSize, indexType])

  const { data, loading, error, fetch } =
    useRequest<Array<SearchIndex>>(fetchData)

  useEffect(() => {
    if (error) {
      toast(error)
    }
  }, [error])

  useEffect(() => {
    fetch()
  }, [fetch])

  return (
    <>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', mb: '16px' }}
      >
        <LoadingButton variant='contained' onClick={fetch} disabled={loading}>
          Refresh
        </LoadingButton>
        <Box>
          <ToggleButtonGroup
            color='primary'
            exclusive
            disabled={loading}
            value={indexType}
            onChange={(_, value: string) => {
              setIndexType(value as IndexToggleType)
            }}
            aria-label='Platform'
          >
            <ToggleButton value={IndexToggleType.All}>All</ToggleButton>
            <ToggleButton value={IndexToggleType.Fully}>
              Fully indexed
            </ToggleButton>
            <ToggleButton value={IndexToggleType.NotFully}>
              Not fully indexed{' '}
            </ToggleButton>
          </ToggleButtonGroup>
          <LoadingButton
            variant='contained'
            sx={{ ml: '32px' }}
            onClick={() => setCreateModalOpen(true)}
          >
            Create
          </LoadingButton>
        </Box>
      </Box>

      <DataGrid
        columns={columns}
        page={page}
        onRowClick={params => {
          setModalData(params.row)
        }}
        onPageChange={(newPage: number) => setPage(newPage)}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 20]}
        onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
        rows={data || []}
        rowCount={500}
        autoHeight
        paginationMode='server'
        loading={loading}
      />
      <SearchIndexModal
        open={Boolean(modalData)}
        handleClose={() => setModalData(null)}
        data={modalData}
      />
      <CreateIndexDialog
        open={createModalOpen}
        handleClose={() => {
          setCreateModalOpen(false)
        }}
      />
    </>
  )
}

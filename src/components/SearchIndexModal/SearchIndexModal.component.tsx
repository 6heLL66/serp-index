import { v4 as uuidv4 } from 'uuid'
import { Typography, Modal, Box } from '@mui/material'
import { SearchIndex } from '../../api'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { getDaysUntilExpire } from '../../services/helpers/getDaysUntilExpire'
import { modalInnerStyle } from './SearchIndexModal.style'

interface SearchIndexModalProps {
  open: boolean
  handleClose: () => void
  data: null | SearchIndex
}

const columns: GridColDef[] = [
  {
    field: 'createdOn',
    headerName: 'Created On',
    width: 160,
    valueGetter: params => new Date(params.value).toLocaleString(),
  },
  { field: 'language', headerName: 'Language', width: 85 },
  { field: 'url', headerName: 'Url', width: 282 },
  {
    field: 'title',
    headerName: 'Title',
    width: 320,
  },
  {
    field: 'validUntil',
    headerName: 'Days until expired',
    width: 150,
    valueGetter: params =>
      `${getDaysUntilExpire(Date.parse(params.value))} days`,
  },
]

export const SearchIndexModal: React.FC<SearchIndexModalProps> = ({
  open,
  handleClose,
  data,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
    >
      <Box sx={{ ...modalInnerStyle, width: 1000 }}>
        <Typography
          variant='h5'
          sx={{ mb: '16px' }}
          component='h2'
          id='modal-modal-title'
        >
          {data?.title}
        </Typography>
        <Box>
          <DataGrid
            columns={columns}
            rows={data?.entries || []}
            autoHeight
            hideFooter
            getRowId={() => {
              return uuidv4()
            }}
          />
        </Box>
      </Box>
    </Modal>
  )
}

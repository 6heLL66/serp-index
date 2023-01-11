import dateFormat from 'dateformat'
import Dialog from '@mui/material/Dialog'
import CloseIcon from '@mui/icons-material/Close'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import { FilterOption, FilterOptions, Filters } from './FiltersDialog.types'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

interface FiltersDialogProps {
  open: boolean
  options: FilterOptions
  handleClose: (filters: Filters) => void
}

export const FiltersDialog: React.FC<FiltersDialogProps> = ({
  open,
  handleClose,
  options,
}) => {
  const formik = useFormik<Filters>({
    initialValues: {
      category: undefined,
      domain: undefined,
      search: '',
      createdAfter: undefined,
    },
    onSubmit: () => {},
  })

  return (
    <Dialog
      open={open}
      onClose={() => {
        handleClose(formik.values)
      }}
    >
      <DialogTitle>Apply filters</DialogTitle>
      <DialogContent sx={{ p: '48px 32px', maxWidth: '400px' }}>
        <TextField
          autoFocus
          margin='dense'
          onChange={formik.handleChange}
          value={formik.values.search}
          name='search'
          id='search'
          label='Search'
          fullWidth
          type='text'
          variant='filled'
        />
        <FormControl fullWidth sx={{ mt: '24px' }}>
          <InputLabel id='category-select-label'>Category</InputLabel>
          <Select
            labelId='category-select-label'
            value={formik.values.category}
            name={FilterOption.Category}
            IconComponent={
              formik.values.category
                ? () => (
                    <CloseIcon
                      onClick={() =>
                        formik.setFieldValue('category', undefined)
                      }
                      sx={{ mr: '8px', cursor: 'pointer' }}
                    />
                  )
                : undefined
            }
            label='Category'
            onChange={formik.handleChange}
          >
            {options.category.map((category: string) => {
              return (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mt: '24px' }}>
          <InputLabel id='category-select-label'>Domain</InputLabel>
          <Select
            labelId='category-select-label'
            name={FilterOption.Domain}
            value={formik.values.domain}
            label='Domain'
            IconComponent={
              formik.values.domain
                ? () => (
                    <CloseIcon
                      onClick={() => formik.setFieldValue('domain', undefined)}
                      sx={{ mr: '8px', cursor: 'pointer' }}
                    />
                  )
                : undefined
            }
            onChange={formik.handleChange}
          >
            {options.domain.map((domain: string) => {
              return (
                <MenuItem key={domain} value={domain}>
                  {domain}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mt: '24px' }}>
          <InputLabel id='category-select-label'>Created after</InputLabel>
          <TextField
            margin='dense'
            id='createdAfter'
            onChange={e => {
              formik.setFieldValue(
                'createdAfter',
                new Date(e.target.value).toISOString(),
              )
            }}
            onBlur={formik.handleBlur}
            value={
              formik.values.createdAfter &&
              dateFormat(formik.values.createdAfter || '', 'yyyy-mm-dd')
            }
            name='createdAfter'
            type='date'
            fullWidth
            variant='filled'
          />
        </FormControl>
      </DialogContent>
    </Dialog>
  )
}

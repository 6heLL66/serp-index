import { useCallback, useEffect } from 'react'
import { LoadingButton } from '@mui/lab'
import { toast } from 'react-toastify'
import dateFormat from 'dateformat'
import Dialog from '@mui/material/Dialog'
import * as Yup from 'yup'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import { CreateSearchIndexRequest, IndexService } from '../../api'
import { useRequest } from '../../services/hooks/useRequest'

interface CreateIndexDialogProps {
  open: boolean
  handleClose: () => void
  onCreateSuccess: () => void
}

const CreateIndexSchema = Yup.object().shape({
  url: Yup.string().url('should be a valid url').required('url is required'),
  category: Yup.string().required('category is required'),
  validUntil: Yup.string().required('valid until is required'),
})

export const CreateIndexDialog: React.FC<CreateIndexDialogProps> = ({
  open,
  handleClose,
  onCreateSuccess,
}) => {
  const formik = useFormik<CreateSearchIndexRequest>({
    initialValues: {
      url: '',
      category: '',
      validUntil: dateFormat(Date.now() + 86400000, 'isoUtcDateTime'),
    },
    validationSchema: CreateIndexSchema,
    onSubmit: (_: CreateSearchIndexRequest, { resetForm }) => {
      handleClose()
      onCreateSuccess()
      resetForm()
    },
  })

  const onSuccess = () => {
    formik.submitForm()
  }

  const createRequest = useCallback(() => {
    return IndexService.postIndex(formik.values)
  }, [formik.values])

  const { loading, error, fetch } = useRequest<unknown>(
    createRequest,
    onSuccess,
  )

  useEffect(() => {
    if (error) {
      toast(error)
    }
  }, [error])

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create new search-index</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.url}
          name='url'
          id='url'
          label='Url'
          fullWidth
          type='text'
          error={formik.touched.url && !!formik.errors.url}
          helperText={formik.touched.url && formik.errors.url}
          variant='standard'
        />
        <TextField
          margin='dense'
          id='category'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.category}
          name='category'
          label='Category'
          type='text'
          fullWidth
          helperText={formik.touched.category && formik.errors.category}
          error={formik.touched.category && !!formik.errors.category}
          variant='standard'
        />
        <TextField
          margin='dense'
          id='validUntil'
          inputProps={{
            min: dateFormat(Date.now() + 86400000, 'yyyy-mm-dd'),
          }}
          onChange={e => {
            formik.setFieldValue(
              'validUntil',
              dateFormat(e.target.value, 'isoUtcDateTime'),
            )
          }}
          onBlur={formik.handleBlur}
          value={dateFormat(formik.values.validUntil || '', 'yyyy-mm-dd')}
          name='validUntil'
          label='Valid until'
          type='date'
          helperText={formik.touched.validUntil && formik.errors.validUntil}
          error={formik.touched.validUntil && !!formik.errors.validUntil}
          fullWidth
          variant='standard'
        />
      </DialogContent>
      <DialogActions>
        <LoadingButton onClick={() => handleClose()}>Cancel</LoadingButton>
        <LoadingButton
          onClick={() => {
            fetch()
          }}
          loading={loading}
          variant='contained'
          disabled={
            formik.dirty && Object.values(formik.errors).some(value => value)
          }
        >
          Create
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

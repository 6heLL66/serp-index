import { Container } from '@mui/system'
import { ToastContainer } from 'react-toastify'
import { OpenAPI } from './api'
import { SearchIndexTable } from './components/SearchIndexTable'
import 'react-toastify/dist/ReactToastify.css'

OpenAPI.BASE = 'https://serpindex-demo.svc.violetvault.com'

function App() {
  return (
    <>
      <ToastContainer />
      <Container sx={{ pt: '32px' }}>
        <SearchIndexTable />
      </Container>
    </>
  )
}

export default App

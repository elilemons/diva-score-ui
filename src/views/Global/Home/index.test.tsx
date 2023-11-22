import { render, screen } from '@utils/testUtils'
import Home from './'

test('renders page heading', async () => {
  render(<Home />)
  const headingElement = await screen.findByText(/Divinely Inspired Vision and Actions/)
  expect(headingElement).toBeInTheDocument()
})

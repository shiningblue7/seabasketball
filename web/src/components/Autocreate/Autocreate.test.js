import { render } from '@redwoodjs/testing/web'

import Autocreate from './Autocreate'

describe('Autocreate', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Autocreate />)
    }).not.toThrow()
  })
})

import { render } from '@redwoodjs/testing/web'

import TestPage from './TestPage'

describe('TestPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TestPage />)
    }).not.toThrow()
  })
})

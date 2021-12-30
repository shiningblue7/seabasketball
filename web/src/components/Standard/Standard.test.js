import { render } from '@redwoodjs/testing/web'

import Standard from './Standard'

describe('Standard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Standard />)
    }).not.toThrow()
  })
})

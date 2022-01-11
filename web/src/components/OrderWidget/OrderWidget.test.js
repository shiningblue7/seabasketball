import { render } from '@redwoodjs/testing/web'

import OrderWidget from './OrderWidget'

describe('OrderWidget', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OrderWidget />)
    }).not.toThrow()
  })
})

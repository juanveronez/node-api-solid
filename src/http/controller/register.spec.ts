import { expect, it } from 'vitest'

it('should sum 1 + 1', () => {
  expect(1 + 1).toBe(2)
  console.log(process.env.DATABASE_URL)
})

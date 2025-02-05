import { randomUUID } from 'node:crypto'

interface DatabaseMockDetial {
  createPricing?: Record<string, any>
  getAllPricing?: Record<string, any>[]
  getPricingById?: Record<string, any>
  updatePricingById?: Record<string, any>
}

interface DatabaseMock {
  pricing: DatabaseMockDetial
}

export const mock: DatabaseMock = {
  pricing: {
    createPricing: {
      id: randomUUID(),
      created_time: new Date().toISOString(),
      package: 'free',
      price: 0,
      period: 'monthly',
      currency: 'USD',
      limit: 50,
    },
    getAllPricing: [
      {
        id: randomUUID(),
        created_time: new Date().toISOString(),
        package: 'free',
        price: 0,
        period: 'monthly',
        currency: 'USD',
        limit: 50,
      },
      {
        id: randomUUID(),
        created_time: new Date().toISOString(),
        package: 'basic',
        price: 50,
        period: 'monthly',
        currency: 'USD',
        limit: 4000,
      },
      {
        id: randomUUID(),
        created_time: new Date().toISOString(),
        package: 'pro',
        price: 100,
        period: 'monthly',
        currency: 'USD',
        limit: 10000,
      },
      {
        id: randomUUID(),
        created_time: new Date().toISOString(),
        package: 'business',
        price: 300,
        period: 'monthly',
        currency: 'USD',
        limit: 50000,
      },
      {
        id: randomUUID(),
        created_time: new Date().toISOString(),
        package: 'enterprise',
        price: 500,
        period: 'monthly',
        currency: 'USD',
        limit: 1000000,
      },
    ],
    getPricingById: {
      id: randomUUID(),
      created_time: new Date().toISOString(),
      package: 'free',
      price: 0,
      period: 'monthly',
      currency: 'USD',
      limit: 50,
    },
    updatePricingById: {
      id: randomUUID(),
      created_time: new Date().toISOString(),
      updated_time: new Date().toISOString(),
      package: 'free',
      price: 0,
      period: 'monthly',
      currency: 'USD',
      limit: 50,
    },
  },
}

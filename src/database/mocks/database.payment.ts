import { randomUUID } from 'node:crypto'

interface DatabaseMockDetial {
  sendPeionio?: Record<string, any>
  sendUSDC?: Record<string, any>
  sendACH?: Record<string, any>
}

interface DatabaseMock {
  payment: DatabaseMockDetial
}

export const mock: DatabaseMock = {
  payment: {
    sendPeionio: {
      id: randomUUID(),
      created_time: new Date().toISOString(),
      recipient_address: 'maxcavalera13@gmail.com',
      type: 'peionio',
      status: 'succeed',
      amount: 100000,
    },
    sendUSDC: {
      id: randomUUID(),
      created_time: new Date().toISOString(),
      recipient_address: 'd926b2cbeecd92668d58b245e50c3e0550afa7ec114f5b0eb6610b',
      type: 'usdc',
      status: 'succeed',
      amount: 100000,
    },
    sendACH: {
      id: randomUUID(),
      created_time: new Date().toISOString(),
      recipient_address: '201543502291',
      type: 'ach',
      status: 'succeed',
      amount: 100000,
    },
  },
}

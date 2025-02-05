import { randomUUID } from 'node:crypto'

interface DatabaseMockDetial {
  getAllTransaction?: Record<string, any>[]
  getTransactionById?: Record<string, any>
}

interface DatabaseMock {
  transaction: DatabaseMockDetial
}

export const mock: DatabaseMock = {
  transaction: {
    getAllTransaction: [
      {
        id: randomUUID(),
        created_time: new Date().toDateString(),
        transaction_type: 'peionio',
        status: 'succeed',
        amount: 55139,
        notes: '11-870 - Agricultural Equipment',
      },
      {
        id: randomUUID(),
        created_time: new Date().toDateString(),
        transaction_type: 'peionio',
        status: 'succeed',
        amount: 35174,
        notes: '6-050 - Basic Wood and Plastic Materials and Methods',
      },
      {
        id: randomUUID(),
        created_time: new Date().toDateString(),
        transaction_type: 'peionio',
        status: 'succeed',
        amount: 19175,
        notes: '2-870 - Sculpture/Ornamental',
      },
      {
        id: randomUUID(),
        created_time: new Date().toDateString(),
        transaction_type: 'peionio',
        status: 'succeed',
        amount: 69588,
        notes: '13-185 - Kennels and Animal Shelters',
      },
      {
        id: randomUUID(),
        created_time: new Date().toDateString(),
        transaction_type: 'usdc',
        status: 'succeed',
        amount: 30487,
        notes: '5-500 - Metal Fabrications',
      },
      {
        id: randomUUID(),
        created_time: new Date().toDateString(),
        transaction_type: 'usdc',
        status: 'succeed',
        amount: 43840,
        notes: '6-900 - Wood and Plastic Restoration and Cleaning',
      },
      {
        id: randomUUID(),
        created_time: new Date().toDateString(),
        transaction_type: 'usdc',
        status: 'succeed',
        amount: 1889,
        notes: '11-680 - Office Equipment',
      },
      {
        id: randomUUID(),
        created_time: new Date().toDateString(),
        transaction_type: 'usdc',
        status: 'succeed',
        amount: 5967,
        notes: '5-400 - Cold-Formed Metal Framing',
      },
      {
        id: randomUUID(),
        created_time: new Date().toDateString(),
        transaction_type: 'ach',
        status: 'succeed',
        amount: 30097,
        notes: '2-821 - Chain Link Fences',
      },
      {
        id: randomUUID(),
        created_time: new Date().toDateString(),
        transaction_type: 'ach',
        status: 'succeed',
        amount: 70519,
        notes: '1-570 - Temporary Controls',
      },
    ],
    getTransactionById: {
      id: randomUUID(),
      created_time: new Date().toDateString(),
      transaction_type: 'peionio',
      status: 'succeed',
      amount: 55139,
      notes: '11-870 - Agricultural Equipment',
    },
  },
}

import { randomUUID } from 'node:crypto'

interface DatabaseMockDetial {
  createdPeionioRecipient?: Record<string, any>
  getPeioinoRecipientById?: Record<string, any>
  getAllPeionioRecipient?: Record<string, any>[]
  updatedPeionioRecipient?: Record<string, any>

  createdUSDCRecipient?: Record<string, any>
  getAllUSDCRecipient?: Record<string, any>[]
  getUSDCRecipientById?: Record<string, any>
  updatedUSDCRecipient?: Record<string, any>

  createdACHRecipient?: Record<string, any>
  getAllACHRecipient?: Record<string, any>[]
  getACHRecipientById?: Record<string, any>
  updatedACHRecipient?: Record<string, any>
}

interface DatabaseMock {
  recipient: DatabaseMockDetial
}

export const mock: DatabaseMock = {
  recipient: {
    createdPeionioRecipient: {
      id: randomUUID(),
      nick_name: 'maxcavalera13',
      account_name: 'Max Cavalera',
      user_email: 'maxcavalera13@gmail.com',
    },
    getAllPeionioRecipient: [
      {
        id: randomUUID(),
        nick_name: 'maxcavalera13',
        account_name: 'Max Cavalera',
        user_email: 'maxcavalera13@gmail.com',
      },
    ],
    getPeioinoRecipientById: {
      id: randomUUID(),
      nick_name: 'maxcavalera13',
      account_name: 'Max Cavalera',
      user_email: 'maxcavalera13@gmail.com',
    },
    updatedPeionioRecipient: {
      id: randomUUID(),
      recipient_name: 'Max Cavalera',
      recipient_bank: 'bca',
      recipient_address: 201543502291,
    },

    createdUSDCRecipient: {
      id: randomUUID(),
      nick_name: 'maxcavalera13',
      account_name: 'Max Cavalera',
      wallet_address: 'd926b2cbeecd92668d58b245e50c3e0550afa7ec114f5b0eb6610b',
    },
    getAllUSDCRecipient: [
      {
        id: randomUUID(),
        nick_name: 'maxcavalera13',
        account_name: 'Max Cavalera',
        wallet_address: 'd926b2cbeecd92668d58b245e50c3e0550afa7ec114f5b0eb6610b',
      },
    ],
    getUSDCRecipientById: {
      id: randomUUID(),
      nick_name: 'maxcavalera13',
      account_name: 'Max Cavalera',
      wallet_address: 'd926b2cbeecd92668d58b245e50c3e0550afa7ec114f5b0eb6610b',
    },
    updatedUSDCRecipient: {
      id: randomUUID(),
      recipient_name: 'Max Cavalera',
      recipient_address: 'd926b2cbeecd92668d58b245e50c3e0550afa7ec114f5b0eb6610b',
    },

    createdACHRecipient: {
      id: randomUUID(),
      nick_name: 'maxcavalera13',
      account_name: 'Max Cavalera',
      beneficiary_name: 'Max Cavalera Sepultura',
      account_number: 201543502291,
      routing_number: 1435022291212,
    },
    getAllACHRecipient: [
      {
        id: randomUUID(),
        nick_name: 'maxcavalera13',
        account_name: 'Max Cavalera',
        beneficiary_name: 'Max Cavalera Sepultura',
        account_number: 201543502291,
        routing_number: 1435022291212,
      },
    ],
    getACHRecipientById: {
      id: randomUUID(),
      nick_name: 'maxcavalera13',
      account_name: 'Max Cavalera',
      beneficiary_name: 'Max Cavalera Sepultura',
      account_number: 201543502291,
      routing_number: 1435022291212,
    },
    updatedACHRecipient: {
      id: randomUUID(),
      recipient_name: 'Max Cavalera',
      recipient_bank: 'bca',
      recipient_address: '201543502291',
      recipient_address_number: 1435022291212,
    },
  },
}

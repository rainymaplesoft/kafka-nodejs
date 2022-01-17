import { CompressionTypes, Kafka, Producer } from 'kafkajs'
import * as ip from 'ip'
// const msg = process.argv[2]
import users from './data/users.json'
import albums from './data/albums.json'
import photos from './data/photos.json'

const host = process.env.HOST_IP || ip.address()
let index = 0

// todo: can be configurable
const _topic = 'Users'
let _data = users

const kafka = new Kafka({
  //   brokers: [`${host}:29092`],
  brokers: [`localhost:29092`],
  clientId: 'nodejs-producer',
})

setExit()

const producer = kafka.producer()

const run = async () => {
  await producer.connect()
  setInterval(sendMessage, 3000)
}

run().catch((e) => console.error(`[example/producer] ${e.message}`, e))

const sendMessage = () => {
  if (index === _data.length - 1) {
    index = 0
  }
  return producer
    .send({
      topic: _topic,
      compression: CompressionTypes.GZIP,
      messages: createMessage(index, _data[index]),
    })
    .then((data) => {
      console.log('test---!!!@@@')
      console.log(data)
    })
    .catch((e) => console.error(`[example/producer] ${e.message}`, e))
    .finally(() => {
      index++
    })
}

const createMessage = (index: number, d: any) => [
  {
    key: `key-${index}-${new Date().toISOString()}`,
    value: JSON.stringify(d),
  },
]

function setExit() {
  const errorTypes = ['unhandledRejection', 'uncaughtException']
  const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']
  errorTypes.map((type) => {
    process.on(type, async () => {
      try {
        console.log(`producer disconnected normally`)
        console.log(`process.on ${type}`)
        await producer.disconnect()
        process.exit(0)
      } catch (_) {
        console.log(`producer disconnected with error ${type}`)
        process.exit(1)
      }
    })
  })

  signalTraps.map((type) => {
    process.once(type, async () => {
      try {
        console.log(`producer disconnected normally [${type}]`)
        await producer.disconnect()
      } finally {
        console.log(`producer disconnected with error [${type}]`)
        process.kill(process.pid, type)
      }
    })
  })
}

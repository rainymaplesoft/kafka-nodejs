# Kafka + Producer & docker-compose

## Author
  [Jianguo Li](https://github.com/rainymaplesoft)

## Installation
### Prerequisites
- `with docker installed in your system `
### Setup
- `git clone https://github.com/rainymaplesoft/kafka-producer.git`

## For Subscriber
>Topic: `DebugData`
>Kafka Url: `localhost:29092`

### Example:
```sh
    val _kafkaTopic = "DebugData"
    val _kafkaUrl = "localhost:29092"
```

### To start Kafka Producer:

```sh
    cd kafka-producer
    docker-compose up
```

### To change data file
- run `docker-compose down` to stop docker container
- navigate to `data` folder
- add you new json data file, e.g. `newdata.json`
- edit `index.ts` file
- comment out the current `import data from` line
- add a new `import data from` line for your new json file, like this `import data from './newdata.json'`
- save `index.ts` file
- run `docker-compose up`

## Tech
- [Node.js] - Software runtime
- [Kafka] - Stream-processing
- [TypeScript] - Kafka Producer code
- [Docker] - Software Visualization Platform

## License info
MIT License

[//]: # 

   [Node.js]: <http://nodejs.org>
   [Kafka]: <https://kafka.apache.org>
   [TypeScript]: <https://www.typescriptlang.org/>
   [Docker]:<https://www.docker.com/>

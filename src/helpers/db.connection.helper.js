'use strict'

const moongoose = require('mongoose')
const os = require('os')

const _SECONDS = 5000

// count number of db connections
const countConnection = () => {
    const numConnections = moongoose.connections.length
    console.log('Number of connections:: ' + numConnections);
}

// check overload db connection
const checkOverloadConnection = () => {
    setInterval(() => {
        const numConnections = moongoose.connections.length
        const numCores = os.cpus().length
        const memoryUsage = process.memoryUsage().rss 

        // Example maximum number of connections based on number of cores
        const maxConnections = numCores*5

        console.log('Active connections: ', numConnections);
        console.log('Memory usage: ', memoryUsage / 1024 / 1024, ' MB');

        if (numConnections > maxConnections) {
            console.log('Connection overload detected')
        } 

    }, _SECONDS)
}

module.exports = {
    countConnection,
    checkOverloadConnection
}
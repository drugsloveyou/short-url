const cluster = require("cluster");

let clusterId = 0;

if (!cluster.isMaster && cluster.worker) {
  clusterId = cluster.worker.id;
}

module.exports = parseInt(clusterId, 10);

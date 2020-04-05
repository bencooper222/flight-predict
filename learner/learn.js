const data = require('../staticData/usFinalJson.json').slice(10);

const options = { task: 'regression', debug: true, learningRate: 1e-6 };
const nn = ml5.neuralNetwork(options);

data.forEach(item => {
  const inputs = {
    d: item.distance,
    de: item.depatureEnplanements,
    ae: item.arrivalEnplanements,
  };
  const outputs = {
    count: item.counter,
  };

  nn.addData(inputs, outputs);
});

nn.normalizeData();

const trainingOptions = {
  epochs: 2,
  batchSize: 128,
};

function handleResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  console.log('res', results); // {label: 'red', confidence: 0.8};
}

function predict() {
  console.log('hi');
  nn.predict({ d: 159, de: 376468, ae: 11621623 }, handleResults);
  console.log(nn);
}

function finishedTraining() {
  // nn.save();
  predict();
}

nn.train(trainingOptions, finishedTraining);

import tf from '@tensorflow/tfjs-node';

async function trainsModel(inputXs, outputYs) {
    const model = tf.sequential();

    //Primeira camada da rede:
    // entrada de 7 posições (idade norm, 3 cores e 3 localizacoes)
    // camada de ativação RELU somente deixa passar valores positivos.

    model.add(tf.layers.dense({
        inputShape: [7],
        units:80,
        activation: 'relu'
    }))

    // Saída: 3 neuronios
    // um para cada categoria de pessoa (premium, medium, basic)
    // camada de ativação SOFTMAX transforma valores (>2) em probabilidades (soma = 1)

    model.add(tf.layers.dense({
        units: 3,
        activation: 'softmax'
    }))

    // Compiland o modelo:
    // Optmizer Adam: ajusta os pesos da rede neural para minimizar a perda (loss)
    // loss categoricalCrossentropy compara os valores com as categorias
    // metrics accuracy mede a acurácia do modelo durante o treino

    model.compile({
        optimizer: 'adam',
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy']
    })

    // Treinamento do modelo:
    // verbose: 0 -> não mostra o progresso do treino
    // epochs: 100 -> número de vezes que o modelo vai passar pelos dados de treino
    // shuffle: true -> embaralha os dados a cada época para evitar overfitting
    // callbacks: função que é chamada ao final de cada época, mostrando a perda (loss)

    await model.fit(
        inputXs,
        outputYs,
        {
            verbose: 0,
            epochs: 100,
            shuffle: true,
            callbacks: {
                onEpochEnd: (epoch, logs) => console.log(
                    `Epoch: ${epoch}: loss - ${logs.loss}`
                )
            }
        }
    );
    return model
}



// COMENTÁRIOS ---------------------------------------------------------------------

// Exemplo de pessoas para treino (cada pessoa com idade, cor e localização)
// const pessoas = [
//     { nome: "Erick", idade: 30, cor: "azul", localizacao: "São Paulo" },
//     { nome: "Ana", idade: 25, cor: "vermelho", localizacao: "Rio" },
//     { nome: "Carlos", idade: 40, cor: "verde", localizacao: "Curitiba" }
// ];

// Vetores de entrada com valores já normalizados e one-hot encoded
// Ordem: [idade_normalizada, azul, vermelho, verde, São Paulo, Rio, Curitiba]
// const tensorPessoas = [
//     [0.33, 1, 0, 0, 1, 0, 0], // Erick
//     [0, 0, 1, 0, 0, 1, 0],    // Ana
//     [1, 0, 0, 1, 0, 0, 1]     // Carlos
// ]

//------------------------------------------------------------------

// Usamos apenas os dados numéricos, como a rede neural só entende números.
// tensorPessoasNormalizado corresponde ao dataset de entrada do modelo.
const tensorPessoasNormalizado = [
    [0.33, 1, 0, 0, 1, 0, 0], // Erick
    [0, 0, 1, 0, 0, 1, 0],    // Ana
    [1, 0, 0, 1, 0, 0, 1]     // Carlos
]

// Labels das categorias a serem previstas (one-hot encoded)
// [premium, medium, basic]
const labelsNomes = ["premium", "medium", "basic"]; // Ordem dos labels
const tensorLabels = [
    [1, 0, 0], // premium - Erick
    [0, 1, 0], // medium - Ana
    [0, 0, 1]  // basic - Carlos
];

// Criamos tensores de entrada (xs) e saída (ys) para treinar o modelo
const inputXs = tf.tensor2d(tensorPessoasNormalizado)
const outputYs = tf.tensor2d(tensorLabels)

// inputXs.print();
// outputYs.print();


// Treinamos o modelo com os dados de entrada e saída
// Seria interessante termos mais dados para treinar o modelo
const models = trainsModel(inputXs, outputYs);


const btJogarDado1 = document.getElementById('jogarDado1');
const btJogarDado2 = document.getElementById('jogarDado2');
const btReiniciar = document.getElementById('reiniciar');
const placarJogador1 = document.getElementById('placarJogador1');
const placarJogador2 = document.getElementById('placarJogador2');
const placarEmpate = document.getElementById('placarEmpate');
const numeroRodada = document.getElementById('rodada');
const valorJogadas1 = document.getElementById('jogadas1');
const valorJogadas2 = document.getElementById('jogadas2');
const resultadoPartida = document.getElementById('vencedorPartida');
const resultadoRodada = document.getElementById('resultadoRodada');

let jogador1 = {
    nome: 'Jogador 1',
    pontos: 0,
    jogada: null,
};

let jogador2 = {
    nome: 'Jogador 2',
    pontos: 0,
    jogada: null,
};

let empates = 0;
let rodadaAtual = 1;

const salvarEstadoJogo = () => {
    localStorage.setItem('jogador1', JSON.stringify(jogador1));
    localStorage.setItem('jogador2', JSON.stringify(jogador2));
    localStorage.setItem('empates', empates.toString());
    localStorage.setItem('rodadaAtual', rodadaAtual.toString());
    localStorage.setItem('btJogarDado1Disabled', btJogarDado1.disabled);
    localStorage.setItem('btJogarDado2Disabled', btJogarDado2.disabled);
    localStorage.setItem('btReiniciarDisabled', btReiniciar.disabled);
};

const carregarEstadoJogo = () => {
    const jogador1Data = localStorage.getItem('jogador1');
    const jogador2Data = localStorage.getItem('jogador2');
    const empatesData = localStorage.getItem('empates');
    const rodadaAtualData = localStorage.getItem('rodadaAtual');
    const resultadoRodadaData = localStorage.getItem('resultadoRodada');
    const resultadoPartidaData = localStorage.getItem('resultadoPartida');
    const valorJogadas1Data = localStorage.getItem('valorJogadas1');
    const valorJogadas2Data = localStorage.getItem('valorJogadas2');
    const btJogarDado1Disabled = localStorage.getItem('btJogarDado1Disabled');
    const btJogarDado2Disabled = localStorage.getItem('btJogarDado2Disabled');
    const btReiniciarDisabled = localStorage.getItem('btReiniciarDisabled');

    if (jogador1Data && jogador2Data && empatesData && rodadaAtualData && resultadoRodadaData
        && resultadoPartidaData && valorJogadas1Data && valorJogadas2Data && btJogarDado1Disabled
        && btJogarDado2Disabled && btReiniciarDisabled) {
        jogador1 = JSON.parse(jogador1Data);
        jogador2 = JSON.parse(jogador2Data);
        empates = parseInt(empatesData);
        rodadaAtual = parseInt(rodadaAtualData);
        placarJogador1.textContent = jogador1.pontos;
        placarJogador2.textContent = jogador2.pontos;
        placarEmpate.textContent = empates;
        numeroRodada.textContent = rodadaAtual;
        resultadoRodada.textContent = resultadoRodadaData;
        resultadoPartida.textContent = resultadoPartidaData;
        valorJogadas1.innerHTML = valorJogadas1Data;
        valorJogadas2.innerHTML = valorJogadas2Data;
        btJogarDado1.disabled = btJogarDado1Disabled === 'true';
        btJogarDado2.disabled = btJogarDado2Disabled === 'true';
        btReiniciar.disabled = btReiniciarDisabled === 'true';
    }
};

const jogadaJogador1 = () => {
    jogador1.jogada = Math.floor(Math.random() * 6) + 1;
    const valor = document.createTextNode(jogador1.jogada);
    const celulaTabela = document.createElement("td");
    celulaTabela.appendChild(valor);
    valorJogadas1.appendChild(celulaTabela);
    localStorage.setItem('valorJogadas1', valorJogadas1.innerHTML);
    btJogarDado1.disabled = true;
    btJogarDado2.disabled = false;
    salvarEstadoJogo();
}

const jogadaJogador2 = () => {
    jogador2.jogada = Math.floor(Math.random() * 6) + 1;
    const valor = document.createTextNode(jogador2.jogada);
    const celulaTabela = document.createElement("td");
    celulaTabela.appendChild(valor);
    valorJogadas2.appendChild(celulaTabela);
    localStorage.setItem('valorJogadas2', valorJogadas2.innerHTML);
    btJogarDado2.disabled = true;
    btReiniciar.disabled = false;
    salvarEstadoJogo();
    calcularVencedor();
}

const calcularVencedor = () => {
    let vencedor = null;
    if (jogador1.jogada > jogador2.jogada) {
        vencedor = jogador1;
    } else if (jogador2.jogada > jogador1.jogada) {
        vencedor = jogador2;
    } else {
        empates++;
    }

    if (vencedor) {
        vencedor.pontos++;
        resultadoRodada.textContent = `O ${vencedor.nome} GANHOU a rodada ${rodadaAtual}!`;
    } else {
        resultadoRodada.textContent = `A rodada ${rodadaAtual} foi EMPATE!`;
    }

    placarJogador1.textContent = jogador1.pontos;
    placarJogador2.textContent = jogador2.pontos;
    placarEmpate.textContent = empates;

    if (rodadaAtual === 10) {
        btJogarDado1.disabled = true;
        btJogarDado2.disabled = true;
        btReiniciar.disabled = false;
        //resultadoRodada.textContent = '';

        let vencedor = null;
        if (jogador1.pontos > jogador2.pontos) {
            vencedor = jogador1;
        } else if (jogador2.pontos > jogador1.pontos) {
            vencedor = jogador2;
        }

        if (vencedor) {
            resultadoPartida.textContent = (`O ${vencedor.nome} VENCEU A PARTIDA com ${vencedor.pontos} pontos!`);
        } else {
            resultadoPartida.textContent = (`A partida terminou em EMPATE!` + `\n\n`
                + `O jogador 1 com ${jogador1.pontos} pontos e o jogador 2 também com ${jogador2.pontos} pontos.`);
        }
    } else {
        rodadaAtual++;
        numeroRodada.textContent = rodadaAtual;
        jogador1.jogada = null;
        jogador2.jogada = null;
        btJogarDado1.disabled = false;
        btJogarDado2.disabled = true;
        btReiniciar.disabled = false;
        //resultadoPartida.textContent = '-';
    }
    localStorage.setItem('resultadoRodada', resultadoRodada.textContent);
    localStorage.setItem('resultadoPartida', resultadoPartida.textContent);
    salvarEstadoJogo();
}

const reiniciar = () => {
    jogador1.pontos = 0;
    jogador2.pontos = 0;
    empates = 0;
    rodadaAtual = 1;
    numeroRodada.textContent = rodadaAtual;
    placarJogador1.textContent = jogador1.pontos;
    placarJogador2.textContent = jogador2.pontos;
    placarEmpate.textContent = empates;
    btJogarDado1.disabled = false;
    btJogarDado2.disabled = true;
    btReiniciar.disabled = false;
    resultadoPartida.textContent = '-';
    valorJogadas1.textContent = '';
    valorJogadas2.textContent = '';
    resultadoRodada.textContent = '';
    salvarEstadoJogo();
}

btJogarDado1.onclick = jogadaJogador1;
btJogarDado2.onclick = jogadaJogador2;
btReiniciar.onclick = reiniciar;
carregarEstadoJogo();

const palavras = ["MATEMATICA", "LIVRO", "AULA", "LOGICA", "ESTUDO", "SAPATO", "MESA", "QUADRADO"];
let tempos = []; // Array para armazenar os tempos
let palavraAtual = ""; // Armazena a palavra atual
let tempoInicial = 60; // Tempo padrão em segundos (1 minuto)
let dificuldadeAtual = ""; // Variável para armazenar a dificuldade atual
let pontos = 0; // Variável para armazenar a pontuação

function definirTempo() {
    const tempoEscolhido = document.getElementById("tempoEscolhido").value;
    tempoInicial = parseInt(tempoEscolhido) * 60; // Converter para segundos
    iniciarTimer(); // Inicia o timer após a escolha do tempo
}

function obterPalavraAleatoria() {
    return palavras[Math.floor(Math.random() * palavras.length)];
}

function codificarPalavra(palavra) {
    const equacoes = {
        A: "1 + 0", B: "1 + 1", C: "1 + 2", D: "1 + 3", E: "1 + 4", F: "1 + 5", G: "1 + 6",
        H: "1 + 7", I: "1 + 8", J: "1 + 9", K: "1 + 10", L: "1 + 11", M: "1 + 12", N: "1 + 13",
        O: "1 + 14", P: "1 + 15", Q: "1 + 16", R: "1 + 17", S: "1 + 18", T: "1 + 19", U: "1 + 20",
        V: "1 + 21", W: "1 + 22", X: "1 + 23", Y: "1 + 24", Z: "1 + 25"
    };
    return palavra.split("").map(letra => equacoes[letra]);
}

function verificarResposta() {
    const respostaUsuario = document.getElementById("respostaUsuario").value.toUpperCase();
    const palavraOriginal = document.getElementById("palavraOriginal").value;
    const resultado = respostaUsuario === palavraOriginal ? "Correto!" : "Incorreto. Tente novamente.";
    document.getElementById("resultado").innerText = resultado;
    

    if (respostaUsuario === palavraOriginal) {
        salvarTempo(); // Salva o tempo no histórico
        exibirHistorico(); // Exibe o histórico de tempos e atualiza a pontuação
        iniciar(); // Gera uma nova palavra automaticamente
    }
}

function iniciar() {
    const palavra = obterPalavraAleatoria();
    document.getElementById("respostaUsuario").disabled = false;
    document.getElementById("resultado").innerText = " ";
    document.getElementById("tempoEscolhido").style.display = "none"
    document.getElementById("sumiço").style.display = "block";
    document.getElementById("sumiçar").style.display = "block"
    document.getElementById("txt_h3").style.display = "none";


    palavraAtual = palavra; // Atualiza a palavra atual
    const palavraCodificada = codificarPalavra(palavra);
    document.getElementById("palavraCodificada").innerText = palavraCodificada.join(" | ");
    document.getElementById("palavraOriginal").value = palavra;
    document.getElementById("txt").style.display = "block";
    document.getElementById("respostaUsuario").style.display = "block";
    document.getElementById("respostaUsuario").value = ""; // Limpa o campo de resposta

    const nivel = document.getElementById("dificuldade");
    if (palavra.length <= 4) {
        nivel.innerHTML = "<strong><h2>Palavra de nível FÁCIL</h2></strong>";
        nivel.style.color = "#018d09";
        dificuldadeAtual = "facil";
    } else if (palavra.length <= 7) {
        nivel.innerHTML = "<strong><h2>Palavra de nível MÉDIO</h2></strong>";
        nivel.style.color = "blue";
        dificuldadeAtual = "medio";
    } else if (palavra.length <= 12) {
        nivel.innerHTML = "<strong><h2>Palavra de nível DIFÍCIL</h2></strong>";
        nivel.style.color = "orange";
        dificuldadeAtual = "dificil";
    } else {
        nivel.innerHTML = "<strong><h2>Palavra de nível IMPOSSÍVEL</h2></strong>";
        nivel.style.color = "red";
        dificuldadeAtual = "impossivel";
    }
}

// Timer regressivo
let intervalo;
let tempoRestante;

function formatarTempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const segs = segundos % 60;
    return `${minutos.toString().padStart(2, '0')}:${segs.toString().padStart(2, '0')}`;

}

function atualizarExibicaoTimer() {
    document.getElementById('cronometro').innerHTML = `<h3>${formatarTempo(tempoRestante)}</h3>`;
}

function iniciarTimer() {
    document.getElementById("botaoIniciar").style.display = "none";
    document.getElementById("botaoCancelar").style.display = "inline";

    if (intervalo) {
        clearInterval(intervalo); // Para o timer anterior, se existir
    }
    tempoRestante = tempoInicial;
    atualizarExibicaoTimer();
    iniciar();

    intervalo = setInterval(() => {
        tempoRestante--;
        atualizarExibicaoTimer();

        if (tempoRestante <= 0) {
            clearInterval(intervalo);
            document.getElementById("resultado").innerText = "Tempo esgotado!";
            document.getElementById("respostaUsuario").disabled = true;
            document.getElementById("botaoCancelar").style.display = "none";
            document.getElementById("botaoIniciar").style.display = "inline-flex"
        }
    }, 1000);
}

function cancelarTimer() {
    clearInterval(intervalo);
    document.getElementById("resultado").innerText = "Timer cancelado!";
    document.getElementById("botaoCancelar").style.display = "none";
    document.getElementById("botaoIniciar").style.display = "inline-flex";
    document.getElementById("respostaUsuario").disabled = true;
    document.getElementById("tempoEscolhido").style.display = "block"
    document.getElementById("sumiço").style.display = "none"
    document.getElementById("sumiçar").style.display = "none"
    document.getElementById("dificuldade").style.display = "none"
    document.getElementById("txt").style.display = "none"
    document.getElementById("txt_h3").style.display = "inline";


}


function salvarTempo() {
    const tempoDecorrido = tempoInicial - tempoRestante;
    tempos.push({
        palavra: palavraAtual,
        tempo: formatarTempo(tempoDecorrido),
        dificuldade: dificuldadeAtual
    });
}

function exibirHistorico() {
    const historicoDiv = document.getElementById('historicoTempos');
    const pontosDiv = document.getElementById('pontos'); // Acessa o elemento de pontuação

    historicoDiv.innerHTML = "<h3>Histórico de Tempos:</h3>";
    pontosDiv.innerHTML = ""; // Limpa o conteúdo anterior de pontuação

    tempos.forEach((item, index) => {
        let cor = "";
        switch (item.dificuldade) {
            case "facil":
                cor = "#018d09";
                pontos += 3;
                break;
            case "medio":
                cor = "blue";
                pontos += 6;
                break;
            case "dificil":
                cor = "orange";
                pontos += 10;
                break;
            case "impossivel":
                cor = "red";
                pontos += 16;
                break;
        }
        historicoDiv.innerHTML += `<p style="color: ${cor};">Palavra ${index + 1}: ${item.palavra} - Tempo: ${item.tempo}</p>`;
    });

    pontosDiv.innerHTML = `<h2>${pontos}</h2>`;
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("respostaUsuario").addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            verificarResposta();
        }
    });

    
document.getElementById('theme-toggle').addEventListener('change', function() {
    tema = true;
    if(tema == true){
    document.body.classList.toggle('dark-theme');
    }
});

document.getElementById('theme-toggle2').addEventListener('change', function() {
    tema = false;
    if(tema == false){
    document.body.classList.toggle('colorblind-theme');
    }
});
});

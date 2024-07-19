
function postFichaNoFirebase() {
    const ficha = JSON.parse(localStorage.getItem('ficha'));
    const url = 'https://cyberpunk-web1-default-rtdb.firebaseio.com/fichas.json';

    if (ficha) {
        const fichaDados = {
            name: ficha.nomePersonagem,
            idade: ficha.idadePersonagem,
            sexo: ficha.sexoPersonagem,
            antecedente: ficha.antecedente,
            vidaMaxima: ficha.vidaMaxima,
            pontosVidaToken: ficha.pontosVidaToken,
            sanidadeMaxima: ficha.sanidadeMaxima,
            percepcaoPassiva: ficha.percepcaoPassiva,
            pesoMaximo: ficha.pesoMaximo,
            identidade: ficha.identidade,
            velocidadeBase: ficha.velocidadeBase,
            movimento: ficha.movimento,
            correr: ficha.correr,
            caminharETerrenoDificil: ficha.caminharETerrenoDificil,
            feridoESobrecarregado: ficha.feridoESobrecarregado,
            reducaoDanos: ficha.reducaoDanos,
        };

        const options = {
            method: 'POST', // PUT para substituir ou POST para adicionar
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fichaDados) // Convertendo os dados para JSON
        };

        // Fazendo a requisição POST
        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na requisição: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                // Manipulando a resposta
                console.log('deu certo yay');
                alert('Ficha criada com sucesso'); 
            })
            .catch(error => {
                // Tratamento de erro
                console.error('Erro ao enviar os dados:', error);
            });
    }
}

document.addEventListener("DOMContentLoaded", function() {
    console.log("Script para scriptCriarFicha3.js carregado!");

    document.getElementById("butSair").addEventListener("click", function() {
        document.getElementById("formFicha").reset();
        window.location.href = 'fichasJogador.html';
    });

    const butFinalizar = document.getElementById("butFinalizar");
    var dadosEnviados = false;

    if (butFinalizar) {
        butFinalizar.addEventListener("click", function() {
            if (dadosEnviados == false){
                saveFormDataToLocalStorage();
                console.log("dados da ficha3 salvos no JSON");
                postFichaNoFirebase();
                
                butFinalizar.innerHTML = 'Voltar';
                dadosEnviados = true;

            } else { // Na segunda vez que o usuário clicar em enviar ele volta para tela de fichas
                window.location.href = 'fichasJogador.html';
            }
        });
    }

    function saveFormDataToLocalStorage() {
        const formData = captureFormData();
        let ficha = JSON.parse(localStorage.getItem('ficha')) || {};
        Object.assign(ficha, formData);
        localStorage.setItem('ficha', JSON.stringify(ficha));
        //window.location.href = nextPage; // TAVA DANDO PROBLEMA, ELE PASSAVA PRA PRÓX PÁGINA E PERDIA OS DADOS OU ALGO ASSIM
    }

    function captureFormData() {
        const formData = {};
        const inputs = document.querySelectorAll('.inputFicha');

        inputs.forEach(input => {
            formData[input.name] = input.value;
        });

        return formData;
    }

});

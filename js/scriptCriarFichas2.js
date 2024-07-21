document.addEventListener("DOMContentLoaded", function () {
    console.log("Script para criarFicha2.js carregado!");
    
    const pontosRestantesInput = document.getElementById('pontosRestantesInput');
    const inputAtributosElements = document.querySelectorAll('.inputAtributos');
    
    function atualizarPontosRestantes() {
        let totalPontos = 72;
        inputAtributosElements.forEach(input => {
            const valor = parseInt(input.value) || 0; // Convertendo o valor para inteiro, caso não seja um número, usar 0
            totalPontos -= valor;
        });
        pontosRestantesInput.value = totalPontos;
    }
    
    // Adicionar event listeners para os inputs
    inputAtributosElements.forEach(input => {
        input.addEventListener('blur', () => {
            //atualiza antes de verificar
            atualizarPontosRestantes();
            if (pontosRestantesInput.value < 0){
                alert("Você não tem mais pontos sobrando");
                input.value = 2;
                atualizarPontosRestantes();
            }
    
            
            const valor = parseInt(input.value) || 0;
            if (valor > 10 || valor < 2){
                alert("Os valores devem estar entre 2 e 10");
                input.value = 2;
            }
            
            atualizarPontosRestantes();
            
            
        });
    
    });
    
    // Chamar a função inicial para garantir que os pontos sejam calculados no carregamento
    atualizarPontosRestantes();
    
    document.getElementById("butSair").addEventListener("click", function () {
        document.getElementById("formFicha").reset();
        window.location.href = 'fichasJogador.html';
    });

    const butContinuar2 = document.getElementById("butContinuar2");
    const butVoltar2 = document.getElementById("butVoltar2");

    if (butContinuar2) {
        butContinuar2.addEventListener("click", function () {
            if (pontosRestantesInput.value > 0){
                if (confirm("Você ainda tem pontos sobrando, tem certeza que deseja continuar?")){
                    saveFormDataToLocalStorage('criarFicha3.html');
                }
            } else {
                saveFormDataToLocalStorage('criarFicha3.html');
            }
        });
    }

    if (butVoltar2) {
        butVoltar2.addEventListener("click", function () {
            window.location.href = 'criarFicha1.html';
        });
    }

    function saveFormDataToLocalStorage(nextPage) {
        const formData = captureFormData();
        let ficha = JSON.parse(localStorage.getItem('ficha')) || {};
        Object.assign(ficha, formData);

        let atributos = {};
        for (let key in ficha) {
            if (key !== "nomePersonagem" && key !== "idadePersonagem" && key !== "sexoPersonagem" && key !== "antecedente" && key !== "atributos" && key !== "vidaMaxima" && key !== "pontosVidaToken" && key !== "percepcaoPassiva" && key !== "sanidadeMaxima" && key !== "percepcaoPassiva" && key !== "pesoMaximo" && key !== "identidade" && key !== "velocidadeBase" && key !== "movimento" && key !== "correr" && key !== "caminharETerrenoDificil" && key !== "feridoESobrecarregado" && key !== "reducaoDanos") {
                atributos[key] = ficha[key];
                delete ficha[key];
            }
        }

        const vidaMaxima = parseInt(atributos.resistencia) + parseInt(atributos.forca);
        const pontosVidaToken = vidaMaxima * 10;
        const sanidadeMaxima = parseInt(atributos.autocontrole) + parseInt(atributos.sabedoria);
        const percepcaoPassiva = (parseInt(atributos.destreza) + parseInt(atributos.sabedoria)) / 2;
        const pesoMaximo = 4 + (parseInt(atributos.forca) + parseInt(atributos.resistencia)) * 5;
        const identidade = (parseInt(atributos.humanidade) * 3) + 20
        const velocidadeBase = (parseInt(atributos.agilidade) + parseInt(atributos.destreza)) / 2;
        const movimento = parseInt(atributos.agilidade) / 2;
        const correr = movimento * 4;
        const caminharETerrenoDificil = movimento * 2;
        const feridoESobrecarregado = movimento * 1;
        const reducaoDanos = parseInt(atributos.resistencia) / 2

        ficha.atributos = atributos;
        ficha.vidaMaxima = vidaMaxima;
        ficha.pontosVidaToken = pontosVidaToken;
        ficha.sanidadeMaxima = sanidadeMaxima;
        ficha.percepcaoPassiva = percepcaoPassiva;
        ficha.pesoMaximo = pesoMaximo;
        ficha.identidade = identidade;
        ficha.velocidadeBase = velocidadeBase;
        ficha.movimento = movimento;
        ficha.correr = correr;
        ficha.caminharETerrenoDificil = caminharETerrenoDificil;
        ficha.feridoESobrecarregado = feridoESobrecarregado;
        ficha.reducaoDanos = reducaoDanos;

        localStorage.setItem('ficha', JSON.stringify(ficha));
        window.location.href = nextPage;
    }

    function captureFormData() {
        const formData = {};
        const formGroups = document.querySelectorAll('.formAtributo');

        formGroups.forEach(form => {
            const atributo = form.querySelector('.atributos').textContent.trim();
            const inputs = form.querySelectorAll('input[type="text"]');

            inputs.forEach(input => {
                formData[input.name] = input.value;
            });
        });

        return formData;
    }
    
    
});

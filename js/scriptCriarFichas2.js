document.addEventListener("DOMContentLoaded", function () {
    console.log("Script para criarFicha2.js carregado!");

    document.getElementById("butSair").addEventListener("click", function () {
        document.getElementById("formFicha").reset();
        window.location.href = 'fichasJogador.html';
    });

    const butContinuar2 = document.getElementById("butContinuar2");
    const butVoltar2 = document.getElementById("butVoltar2");

    if (butContinuar2) {
        butContinuar2.addEventListener("click", function () {
            saveFormDataToLocalStorage('criarFicha3.html');
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
            if (key !== "nomePersonagem" && key !== "idadePersonagem" && key !== "sexoPersonagem" && key !== "antecedente" && key !== "atributos") {
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

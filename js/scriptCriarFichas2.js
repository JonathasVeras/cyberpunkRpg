document.addEventListener("DOMContentLoaded", function() {
    console.log("Script para criarFicha2.js carregado!");

    document.getElementById("butSair").addEventListener("click", function() {
        document.getElementById("formFicha").reset();
        window.location.href = 'fichasJogador.html';
    });

    const butContinuar2 = document.getElementById("butContinuar2");
    const butVoltar2 = document.getElementById("butVoltar2");

    if (butContinuar2) {
        butContinuar2.addEventListener("click", function() {
            saveFormDataToLocalStorage('criarFicha3.html');
        });
    }

    if (butVoltar2) {
        butVoltar2.addEventListener("click", function() {
            window.location.href = 'criarFicha1.html';
        });
    }

    function saveFormDataToLocalStorage(nextPage) {
        const formData = captureFormData();
        let ficha = JSON.parse(localStorage.getItem('ficha')) || {};
        Object.assign(ficha, formData);
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

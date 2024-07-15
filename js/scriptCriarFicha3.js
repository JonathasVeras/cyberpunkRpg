document.addEventListener("DOMContentLoaded", function() {
    console.log("Script para scriptCriarFicha3.js carregado!");

    document.getElementById("butSair").addEventListener("click", function() {
        document.getElementById("formFicha").reset();
        window.location.href = 'fichasJogador.html';
    });

    const butFinalizar = document.getElementById("butFinalizar");

    if (butFinalizar) {
        butFinalizar.addEventListener("click", function() {
            saveFormDataToLocalStorage('fichasJogador.html');
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
        const inputs = document.querySelectorAll('.inputFicha');

        inputs.forEach(input => {
            formData[input.name] = input.value;
        });

        return formData;
    }
});

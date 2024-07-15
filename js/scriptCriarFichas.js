document.addEventListener("DOMContentLoaded", function() {
    console.log("Document is ready!");

    document.getElementById("butSair").addEventListener("click", function() {
        document.getElementById("formFicha").reset();
        window.location.href = 'fichasJogador.html';
    });

    document.getElementById("butContinuar1").addEventListener("click", function() {
        saveFormDataToLocalStorage('criarFicha2.html');
    });
    
    function saveFormDataToLocalStorage(nextPage) {
        const formData = captureFormData();
        let ficha = JSON.parse(localStorage.getItem('ficha')) || {};
        Object.assign(ficha, formData);
        localStorage.setItem('ficha', JSON.stringify(ficha));
        window.location.href = nextPage;
    }

    function captureFormData() {
        const formData = {};
        const formElements = document.getElementById("formFicha").elements;

        for (let element of formElements) {
            if (element.tagName === "INPUT" || element.tagName === "SELECT") {
                formData[element.name] = element.value;
            }
        }

        return formData;
    }
});

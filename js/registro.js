document.addEventListener("DOMContentLoaded", function() {
    const formRegistro = document.getElementById("formRegistro");

    document.getElementById("butRegistrar").addEventListener("click", function() {
        const nome = formRegistro.nome.value;
        const senha = formRegistro.senha.value;

        if (nome && senha) {
            registrarPerfil(nome, senha);
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    });

    document.getElementById("butVoltarLogin").addEventListener("click", function() {
        window.location.href = 'login.html';
    });

    function registrarPerfil(nome, senha) {
        const url = 'https://cyberpunk-web1-default-rtdb.firebaseio.com/perfis.json';

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, senha })
        })
        .then(response => response.json())
        .then(data => {
            alert('Perfil registrado com sucesso!');
            window.location.href = 'login.html';
        })
        .catch(error => {
            console.error('Erro ao registrar o perfil:', error);
            alert('Erro ao registrar o perfil. Tente novamente.');
        });
    }
});

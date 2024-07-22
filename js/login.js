document.addEventListener("DOMContentLoaded", function() {
    const formLogin = document.getElementById("formLogin");

    document.getElementById("butLogin").addEventListener("click", function() {
        const nome = formLogin.nome.value;
        const senha = formLogin.senha.value;

        if (nome && senha) {
            autenticarPerfil(nome, senha);
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    });

    document.getElementById("butRegistro").addEventListener("click", function() {
        window.location.href = 'registro.html';
    });

    function autenticarPerfil(nome, senha) {
        const url = 'https://cyberpunk-web1-default-rtdb.firebaseio.com/perfis.json';

        fetch(url)
        .then(response => response.json())
        .then(data => {
            const perfis = Object.keys(data).map(key => ({ id: key, ...data[key] }));
            const perfil = perfis.find(p => p.nome === nome && p.senha === senha);

            if (perfil) {
                localStorage.setItem('perfilAtual', JSON.stringify({ nome: perfil.nome, id: perfil.id }));
                alert('Login bem-sucedido!');
                window.location.href = 'fichasJogador.html';
            } else {
                alert('Nome ou senha incorretos. Tente novamente.');
            }
        })
        .catch(error => {
            console.error('Erro ao autenticar o perfil:', error);
            alert('Erro ao autenticar o perfil. Tente novamente.');
        });
    }
});

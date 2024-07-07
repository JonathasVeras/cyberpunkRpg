document.addEventListener("DOMContentLoaded", function() {
    // Função para resetar o formulário e voltar para fichasJogador ao clicar em "Sair"
    document.getElementById("butSair").addEventListener("click", function() {
        document.getElementById("formFicha").reset();
        window.location.href = 'fichasJogador.html';
    });

    // Função para processar o submit e redirecionar ao clicar em "Continuar"
    document.getElementById("butFinalizar").addEventListener("click", function() {
        // Resetar o formulário (mudar no futuro para passar essas informações para outra estrutura)
        document.getElementById("formFicha").reset();
        
        // Obter o caminho da URL
        var path = window.location.pathname;

        // Extrair o nome da página (último segmento do caminho)
        var currentPage = path.substring(path.lastIndexOf('/') + 1);
    
        // Verificar a página atual e redirecionar de acordo
        if (currentPage === "criarFicha.html") {
            window.location.href = 'criarFicha2.html';
        } else if (currentPage === "criarFicha2.html") {
            window.location.href = 'criarFicha5.html';
        } else if (currentPage === "criarFicha5.html") {
            window.location.href = 'fichasJogador.html';
        } else {
            // Adicione outros redirecionamentos ou uma ação padrão se necessário
            console.log("Página desconhecida ou ação padrão.");
        }
    });
});
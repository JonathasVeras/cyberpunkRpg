document.addEventListener('DOMContentLoaded', () => {
    const fichasContainer = document.getElementById('fichasContainer');

    // URL do Firebase
    const url = 'https://cyberpunk-web1-default-rtdb.firebaseio.com/fichas.json';

    // Fazendo a requisição GET para buscar as fichas
    fetch(url)
        .then(response => {
            if (!response.ok) { // Verifica se a resposta é OK (status 200-299)
                throw new Error('Erro na requisição: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Manipulando os dados recebidos
            if (data) {
                Object.keys(data).forEach(key => {
                    const ficha = data[key];
                    ficha.id = key;
                    criarCardFicha(ficha);
                });
            } else {
                fichasContainer.innerText = 'Nenhuma ficha encontrada.';
            }
        })
        .catch(error => {
            // Tratamento de erro
            fichasContainer.innerText = 'Erro ao buscar as fichas: ' + error.message;
            console.error('Erro ao buscar as fichas:', error);
        });

    // Função para criar um card de ficha
    function criarCardFicha(ficha) {
        const card = document.createElement('div');
        card.className = 'card-ficha';

        card.innerHTML = `
            <h3 class="nome-personagem">${ficha.name}</h3>
            <p>Idade: ${ficha.idade}</p>
            <p>Sexo: ${ficha.sexo}</p>
            <p>${ficha.vidaMaxima} / ${ficha.vidaMaxima}</p>
        `;

        // Deixar o card clicável
        card.addEventListener("click", () => {
            if (remover) {
                if (confirm("Tem certeza que deseja excluir esta ficha?")) {
                    const deleteUrl = `https://cyberpunk-web1-default-rtdb.firebaseio.com/fichas/${ficha.id}.json`;
                    fetch(deleteUrl, {
                        method: 'DELETE'
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Erro na requisição DELETE: ' + response.statusText);
                        }
                        return response.json();
                    })
                    .then(() => {
                        console.log(`Ficha ${ficha.name} removida com sucesso.`);
                        alert(`Ficha ${ficha.name} removida com sucesso.`);
                        fichasContainer.removeChild(card); // Remove o card da tela
                    })
                    .catch(error => {
                        console.error('Erro ao remover a ficha:', error);
                    });
                }
            } else if (visualizar) {
                localStorage.setItem('fichaSelecionada', JSON.stringify(ficha));
                window.location.href = 'visualizarFicha.html';
            } else if (editar) {
                localStorage.setItem('fichaSelecionada', JSON.stringify(ficha));
                window.location.href = 'editarFicha.html';
            }
        });

        fichasContainer.appendChild(card);
    }

});

var remover = false;
var visualizar = true;
var editar = false;

const btnRemover = document.getElementById('botaoRemover');
const btnEditar = document.getElementById('botaoEditar');

btnRemover.addEventListener("click", function () {
    if (!remover) {
        btnRemover.style.color = "#220425";
        btnRemover.style.backgroundColor = "#DE1A1A";
    } else {
        btnRemover.style.color = "#DE1A1A";
        btnRemover.style.backgroundColor = "#220425";
    }
    remover = !remover;
    visualizar = !remover;
    editar = false;
    btnEditar.style.color = "#dfdb13";
    btnEditar.style.backgroundColor = "#220425";
});

btnEditar.addEventListener("click", function () {
    if (!editar) {
        btnEditar.style.color = "#220425";
        btnEditar.style.backgroundColor = "#dfdb13";
    } else {
        btnEditar.style.color = "#dfdb13";
        btnEditar.style.backgroundColor = "#220425";
    }
    editar = !editar;
    visualizar = !editar;
    remover = false;
    btnRemover.style.color = "#DE1A1A";
    btnRemover.style.backgroundColor = "#220425";
});

document.addEventListener('DOMContentLoaded', () => {
    const aventurasContainer = document.getElementById('aventurasContainer');

    // URL do Firebase
    const url = 'https://cyberpunk-web1-default-rtdb.firebaseio.com/aventuras.json';

    // Fazendo a requisição GET para buscar as aventuras
    fetch(url)
        .then(response => {
            if (!response.ok) { // Verifica se a resposta é OK 
                throw new Error('Erro na requisição: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Manipulando os dados recebidos
            if (data) {
                Object.keys(data).forEach(key => {
                    const aventura = data[key];
                    aventura.id = key;
                    criarCardAventura(aventura);
                });
            } else {
                aventurasContainer.innerText = 'Nenhuma aventura encontrada.';
            }
        })
        .catch(error => {
            // Tratamento de erro
            aventurasContainer.innerText = 'Erro ao buscar as aventuras: ' + error.message;
            console.error('Erro ao buscar as aventuras:', error);
        });

    // Função para criar um card de aventura
    function criarCardAventura(aventura) {
        const card = document.createElement('div');
        card.className = 'card-aventura';

        card.innerHTML = `
            <h3 class="nome-aventura">${aventura.nome}</h3>
        `;

        // Deixar o card clicável
        card.addEventListener("click", () => {
            if (remover) {
                if (confirm("Tem certeza que deseja excluir esta aventura?")) {
                    const deleteUrl = `https://cyberpunk-web1-default-rtdb.firebaseio.com/aventuras/${aventura.id}.json`;
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
                        console.log(`Aventura ${aventura.nome} removida com sucesso.`);
                        alert(`Aventura ${aventura.nome} removida com sucesso.`);
                        aventurasContainer.removeChild(card); // Remove o card da tela
                    })
                    .catch(error => {
                        console.error('Erro ao remover a aventura:', error);
                    });
                }
            } else if (visualizar) {
                localStorage.setItem('aventuraSelecionada', JSON.stringify(aventura));
                window.location.href = 'visualizarAventura.html';
            } else if (editar) {
                localStorage.setItem('aventuraSelecionada', JSON.stringify(aventura));
                window.location.href = 'editarAventura.html';
            }
        });

        aventurasContainer.appendChild(card);
    }
})


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
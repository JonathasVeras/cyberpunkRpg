document.addEventListener('DOMContentLoaded', () => {
    const fichaSelecionada = JSON.parse(localStorage.getItem('fichaSelecionada'));

    if (!fichaSelecionada) {
        alert('Nenhuma ficha selecionada para edição.');
        window.location.href = 'fichasJogador.html';
        return;
    }

    const form = document.getElementById('editarFichaForm');
    const atributosContainer = document.getElementById('atributosContainer');

    // Preenche o formulário com os dados da ficha selecionada
    form.name.value = fichaSelecionada.name;
    form.idade.value = fichaSelecionada.idade;
    form.sexo.value = fichaSelecionada.sexo;
    form.vidaMaxima.value = fichaSelecionada.vidaMaxima;
    form.pontosVidaToken.value = fichaSelecionada.pontosVidaToken;
    form.sanidadeMaxima.value = fichaSelecionada.sanidadeMaxima;
    form.pontosSanidadeToken.value = fichaSelecionada.pontosSanidadeToken;
    form.reducaoDanos.value = fichaSelecionada.reducaoDanos;
    form.pesoMaximo.value = fichaSelecionada.pesoMaximo;
    form.percepcaoPassiva.value = fichaSelecionada.percepcaoPassiva;
    form.movimento.value = fichaSelecionada.movimento;
    form.velocidadeBase.value = fichaSelecionada.velocidadeBase;

    // Preenche o select com o valor do antecedente
    document.getElementById('antecedente').value = fichaSelecionada.antecedente;

    // Função para criar campos de atributos
    const criarCampoAtributo = (nome, valor) => {
        const div = document.createElement('div');
        div.className = 'form-group';

        const label = document.createElement('label');
        label.innerText = nome;
        div.appendChild(label);

        const input = document.createElement('input');
        input.type = 'text';
        input.name = nome;
        input.value = valor;
        div.appendChild(input);

        atributosContainer.appendChild(div);
    };

    // Preenche os campos de atributos
    for (const atributo in fichaSelecionada.atributos) {
        criarCampoAtributo(atributo, fichaSelecionada.atributos[atributo]);
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const updatedFicha = {
            name: form.name.value,
            idade: form.idade.value,
            sexo: form.sexo.value,
            antecedente: form.antecedente.value,
            vidaMaxima: form.vidaMaxima.value,
            pontosVidaToken: form.pontosVidaToken.value,
            sanidadeMaxima: form.sanidadeMaxima.value,
            pontosSanidadeToken: form.pontosSanidadeToken.value,
            reducaoDanos : form.reducaoDanos.value,
            pesoMaximo : form.pesoMaximo.value,
            percepcaoPassiva : form.percepcaoPassiva.value,
            movimento : form.movimento.value,
            velocidadeBase : form.velocidadeBase.value,
            atributos: {}
        };

        // Atualiza os valores dos atributos
        const inputsAtributos = atributosContainer.querySelectorAll('input');
        inputsAtributos.forEach(input => {
            updatedFicha.atributos[input.name] = input.value;
        });

        const updateUrl = `https://cyberpunk-web1-default-rtdb.firebaseio.com/fichas/${fichaSelecionada.id}.json`;
        
        fetch(updateUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedFicha)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição PUT: ' + response.statusText);
            }
            return response.json();
        })
        .then(() => {
            alert('Ficha atualizada com sucesso!');
            window.location.href = 'fichasJogador.html';
        })
        .catch(error => {
            console.error('Erro ao atualizar a ficha:', error);
        });
    });
});

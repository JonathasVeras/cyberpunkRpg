document.addEventListener('DOMContentLoaded', () => {
    // Recupera a aventura do localStorage
    const aventuraSelecionada = localStorage.getItem('aventuraSelecionada');
        
    const descricao = document.getElementById('txtAreaDescricao');
    const imagem = document.getElementById('imgPH');
    const nome = document.getElementById('inputNomeAventura');

    if (aventuraSelecionada) {
        // Parse a string JSON para um objeto
        const aventura = JSON.parse(aventuraSelecionada);
        
        // Preencher os campos com os dados da aventura
        descricao.value = aventura.descricao;
        nome.value = aventura.nome;
        
        // Se a imagem estiver em base64, configurar o src da imagem
        if (aventura.imagem) {
            imagem.src = aventura.imagem;
        } else {
            // Se não houver imagem, usar a imagem placeholder
            imagem.src = '../imagens/image_place_holder.png';
        }
    } else {
        // Se não houver aventura selecionada, exibir mensagem de erro ou redirecionar
        alert('Nenhuma aventura selecionada.');
        window.location.href = 'aventurasJogador.html';
    }

    // Adicionar funcionalidade ao botão "Finalizar"
    document.getElementById('butFinalizar').addEventListener('click', () => {
        // Obtém os valores atualizados dos campos
        const updatedDescricao = descricao.value;
        const updatedNome = nome.value;
        const updatedImagem = imagem.src;

        // Verificar se a URL é a placeholder e remover o prefixo de base64 se necessário
        const isPlaceholder = updatedImagem.includes('image_place_holder.png');
        const imagemFinal = isPlaceholder ? '' : updatedImagem;

        // Atualizar a aventura no Firebase
        const aventuraId = JSON.parse(aventuraSelecionada).id;
        const updateUrl = `https://cyberpunk-web1-default-rtdb.firebaseio.com/aventuras/${aventuraId}.json`;

        fetch(updateUrl, {
            method: 'PUT',
            body: JSON.stringify({
                nome: updatedNome,
                descricao: updatedDescricao,
                imagem: imagemFinal
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na atualização: ' + response.statusText);
            }
            return response.json();
        })
        .then(() => {
            alert('Aventura atualizada com sucesso!');
            document.getElementById('butFinalizar').innerHTML = 'Voltar';
            window.location.href = 'aventurasJogador.html';
        })
        .catch(error => {
            console.error('Erro ao atualizar a aventura:', error);
        });
    });
});
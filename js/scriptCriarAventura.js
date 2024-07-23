document.addEventListener('DOMContentLoaded', () => {
    const butFinalizar = document.getElementById('butFinalizar');
    const inputNomeAventura = document.getElementById('inputNomeAventura');
    const txtAreaDescricao = document.getElementById('txtAreaDescricao');
    const iFile = document.getElementById('i-file');
    const imgPH = document.getElementById('imgPH');

    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    var dadosEnviados = false;

    butFinalizar.addEventListener('click', async () => {
        if (!dadosEnviados) {
            const nomeAventura = inputNomeAventura.value;
            const descricao = txtAreaDescricao.value;
            const imagemArquivo = iFile.files[0];
    
            if (!nomeAventura || !descricao) {
                alert("Por favor, preencha todos os campos.");
                return;
            }
    
            try {
                let imagemBase64;
                if (imagemArquivo) {
                    imagemBase64 = await convertToBase64(imagemArquivo);
                } else {
                    imagemBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAABmJLR0QA/wD/AP+gvaeTAAABJElEQVR4nO3SsQkAMAzAQPb/P1GhwwyzGFFhRRRTTjlVS5FHRDQkgD4KY9Y9Xw2q2tIAAAAAAAAAAAAAv19eqDgcAAAAAAAAAAAAAQAF1fOnLwAAAAAAAAAAAAAA4JUPXbgcAAAAAAAAAAAAAQKF1eZLxAAAAAAAAAAAAAA4HUPn4gBAAAAAAAAAAAAABQCVf27HAADq8neKQwB9M/BNX+sfgR/xD+om8Ub9I7yjupRtVGz/Ge3r39vuPbaTuqu/v6P+4Dcf/wz2u/kqxHvFt9F7A/yl5m7K7XehXM0k9L6VL9qtSujddVm6o1rWPLibx/3eqJfV+v+mP7Kz9I7R3rRYsYv8l9A9TVtv/pN9X58gD+iFkAAAAAAAAAAAAvnDzdx8JIdv1AAAAAElFTkSuQmCC';
                }
    
    
                const aventura = {
                    nome: nomeAventura,
                    descricao: descricao,
                    imagem: imagemBase64
                };
    
                const url = 'https://cyberpunk-web1-default-rtdb.firebaseio.com/aventuras.json';
    
                fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(aventura),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro na requisição: ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    alert("Aventura criada com sucesso!");
                    console.log("Dados enviados:", data);
                })
                .catch(error => {
                    console.error('Erro ao criar aventura:', error);
                });
            } catch (error) {
                console.error('Erro ao processar a imagem:', error);
            }

            butFinalizar.innerHTML = 'Voltar';
            dadosEnviados = true;
            
        } else {
            window.location.href = 'aventurasJogador.html';
        }
        
    });
})

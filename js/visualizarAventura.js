document.addEventListener('DOMContentLoaded', () => {
    
    // Recupera a aventura do localStorage
    const aventuraSelecionada = localStorage.getItem('aventuraSelecionada');

    if (aventuraSelecionada) {

        // Converte a string JSON de volta para um objeto
        const aventura = JSON.parse(aventuraSelecionada);

        // Preenche os elementos HTML com as informações da aventura
        const tituloElement = document.getElementById('nomeAventura');
        if (tituloElement) {
            tituloElement.innerHTML = aventura.nome;
        }

        const descricaoElement = document.getElementById('descricaoAventura');
        if (descricaoElement) {
            descricaoElement.innerHTML = aventura.descricao;
        }

        const imagemElement = document.getElementById('imagemAventura');
        if (imagemElement) {
            // Base64 da imagem placeholder
            const placeholderImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAABmJLR0QA/wD/AP+gvaeTAAABJElEQVR4nO3SsQkAMAzAQPb/P1GhwwyzGFFhRRRTTjlVS5FHRDQkgD4KY9Y9Xw2q2tIAAAAAAAAAAAAAv19eqDgcAAAAAAAAAAAAAQAF1fOnLwAAAAAAAAAAAAAA4JUPXbgcAAAAAAAAAAAAAQKF1eZLxAAAAAAAAAAAAAA4HUPn4gBAAAAAAAAAAAAABQCVf27HAADq8neKQwB9M/BNX+sfgR/xD+om8Ub9I7yjupRtVGz/Ge3r39vuPbaTuqu/v6P+4Dcf/wz2u/kqxHvFt9F7A/yl5m7K7XehXM0k9L6VL9qtSujddVm6o1rWPLibx/3eqJfV+v+mP7Kz9I7R3rRYsYv8l9A9TVtv/pN9X58gD+iFkAAAAAAAAAAAAvnDzdx8JIdv1AAAAAElFTkSuQmCC';

            // Verifica se a imagem é válida, caso contrário, usa o placeholder
            if (aventura.imagem) {
                imagemElement.src = aventura.imagem;
            } else {
                imagemElement.src = placeholderImage;
            }
            imagemElement.alt = `Imagem da aventura ${aventura.nome}`;
            imagemElement.style.maxWidth = '100%'; // Ajusta a largura da imagem
        }

    }


});
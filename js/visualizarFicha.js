document.addEventListener('DOMContentLoaded', () => {
    const mainFichasJogador = document.querySelector('.mainFichasJogador');

    const fichaSelecionada = localStorage.getItem('fichaSelecionada');
    
    if (fichaSelecionada) {
        const ficha = JSON.parse(fichaSelecionada);

        const atributosHtml = Object.entries(ficha.atributos).map(([key, value]) => `
            <div class="atributo">
                <strong>${key}:</strong> ${value}
            </div>
        `).join('');

        const fichaHtml = `
            <div class="ficha-detalhes">
                <h2>${ficha.name}</h2>
                <p><strong>Antecedente:</strong> ${ficha.antecedente}</p>
                <p><strong>Idade:</strong> ${ficha.idade}</p>
                <p><strong>Sexo:</strong> ${ficha.sexo}</p>
                <div class="atributos">
                    ${atributosHtml}
                </div>
            </div>
        `;

        mainFichasJogador.innerHTML = fichaHtml;
    } else {
        mainFichasJogador.innerHTML = '<p>Nenhuma ficha selecionada.</p>';
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const mainFichasJogador = document.querySelector('.mainFichasJogador');

    const fichaSelecionada = localStorage.getItem('fichaSelecionada');
    
    if (fichaSelecionada) {
        const ficha = JSON.parse(fichaSelecionada);

        const atributosHtml = Object.entries(ficha.atributos).map(([key, value]) => `
            <div class="atributo">
                <strong>${key}:</strong> ${value}
            </div>
        `).join('');

        const fichaHtml = `
            <div class="ficha-detalhes">
                <h2>${ficha.name}</h2>
                <p><strong>Antecedente:</strong> ${ficha.antecedente}</p>
                <p><strong>Idade:</strong> ${ficha.idade}</p>
                <p><strong>Sexo:</strong> ${ficha.sexo}</p>
                <p><strong>Pontos de Vida Token:</strong> ${ficha.pontosVidaToken}</p>
                <p><strong>Vida Máxima:</strong> ${ficha.vidaMaxima}</p>
                <p><strong>Sanidade Máxima:</strong> ${ficha.sanidadeMaxima}</p>
                <p><strong>Redução de Danos:</strong> ${ficha.reducaoDanos}</p>
                <p><strong>Percepção Passiva:</strong> ${ficha.percepcaoPassiva}</p>
                <p><strong>Peso Máximo:</strong> ${ficha.pesoMaximo}</p>
                <p><strong>Velocidade Base:</strong> ${ficha.velocidadeBase}</p>
                <p><strong>Movimento:</strong> ${ficha.movimento}</p>
                <div class="secao">
                    <h3>Atributos</h3>
                    <div class="atributos">
                        ${atributosHtml}
                    </div>
                </div>
            </div>
        `;

        mainFichasJogador.innerHTML = fichaHtml;
    } else {
        mainFichasJogador.innerHTML = '<p>Nenhuma ficha selecionada.</p>';
    }
});

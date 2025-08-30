const calcBtn = document.getElementById('calc')
const areia = document.getElementById('areia')
const pedra = document.getElementById('pedra')
const cimento = document.getElementById('cimento')

let tipoSelecionado = 'concre' // valor inicial

function setTipo() {
    const tipo = document.getElementById('tipo')
    const tipoLarg = document.getElementById('tipoLarg')
    const botoes = document.querySelectorAll('#concre, #reboc, #conPiso')

    const btnInicial = document.getElementById('concre')
    btnInicial.style.backgroundColor = '#f12345'
    tipo.textContent = btnInicial.textContent
    tipoSelecionado = 'concre'

    botoes.forEach(botao => {
        botao.addEventListener('click', () => {
            // Atualiza o texto
            function setTraco() {
                if (botao.id === 'reboc') {
                    return ' 4 por 1'
                } if (botao.id === 'concre') {
                    return ' 3 por 1'
                } else {
                    return ' 5 por 1'
                }
            }

            tipo.textContent = `${botao.textContent + setTraco()}`

            if (botao.id === 'reboc') {
                tipoLarg.textContent = 'Altura'
            } else {
                tipoLarg.textContent = 'Largura' // valor padrão para os outros
            }

            // Reseta cor dos outros botões e aplica cor ao clicado
            botoes.forEach(b => b.style.backgroundColor = '')
            botao.style.backgroundColor = '#f12343'

            // Atualiza o tipo selecionado
            tipoSelecionado = botao.id
        })
    })
}

document.addEventListener('DOMContentLoaded', setTipo)

function calcVolume() {
    const comp = Number(document.getElementById('comp').value)
    const larg = Number(document.getElementById('larg').value)
    const esp = Number(document.getElementById('esp').value)

    return comp * larg * esp // volume em m³
}

calcBtn.addEventListener('click', () => {
    const volume = calcVolume()

    let qtdCimentoM3, qtdAreia, qtdPedra

    if(tipoSelecionado === 'concre') {
        // Traço 1:3:2
        const parte = volume / 6
        qtdCimentoM3 = parte * 1
        qtdAreia = parte * 3
        qtdPedra = parte * 2
    } else if(tipoSelecionado === 'reboc') {
        // Traço 1:4 (sem pedra)
        const parte = volume / 5
        qtdCimentoM3 = parte * 1
        qtdAreia = parte * 4
        qtdPedra = 0
    } else if(tipoSelecionado === 'conPiso') {
        // Traço 1:3 (sem pedra)
        const parte = volume / 5
        qtdCimentoM3 = parte * 1
        qtdAreia = parte * 3
        qtdPedra = 0
    }

    // Converter cimento para kg
    const qtdCimentoKg = qtdCimentoM3 * 1400

    // Exibir resultados arredondados
    cimento.textContent = ` ${Math.round(qtdCimentoKg)} kg`
    areia.textContent = ` ${qtdAreia.toFixed(2)} m³`
    pedra.textContent = qtdPedra > 0 ? ` ${qtdPedra.toFixed(2)} m³` : ' Não aplicável'


    // Limpar inputs
    document.getElementById('comp').value = ''
    document.getElementById('larg').value = ''
    document.getElementById('esp').value = ''
})

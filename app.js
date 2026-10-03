const cards = document.getElementById('cards')
const pesquisa = document.getElementById('pesquisa')
const filtroPrioridade = document.getElementById('prioridade')
const filtroStatus = document.getElementById('status')
const ordenacao = document.getElementById('ordenacao')
const limpar = document.getElementById('limpar')
const resultado = document.getElementById('resultado')

function criarCard(chamado) {
    const card = document.createElement('article')
    card.classList.add('card')

    card.innerHTML = `
        <div class="card-topo">
            <span class="numero">#${chamado.id}</span>

            <span class="prioridade ${chamado.prioridade
                .toLowerCase()
                .replace('í', 'i')
                .replace('é', 'e')}">
                ${chamado.prioridade}
            </span>
        </div>

        <h2>${chamado.titulo}</h2>

        <p><strong>Usuário:</strong> ${chamado.usuario}</p>
        <p><strong>Status:</strong> ${chamado.status}</p>
    `

    return card
}

function mostrarChamados(lista) {
    cards.innerHTML = ''

    resultado.textContent =
        `${lista.length} chamado(s) encontrado(s)`

    if (lista.length === 0) {
        cards.innerHTML =
            '<p class="sem-resultado">Nenhum chamado encontrado.</p>'

        return
    }

    lista.forEach(chamado => {
        cards.appendChild(criarCard(chamado))
    })
}

function filtrarChamados() {
    const nome = pesquisa.value.toLowerCase()
    const prioridadeSelecionada = filtroPrioridade.value
    const statusSelecionado = filtroStatus.value

    let listaFiltrada = chamados.filter(chamado => {

        const nomeCorresponde =
            chamado.usuario.toLowerCase().includes(nome)

        const prioridadeCorresponde =
            prioridadeSelecionada === '' ||
            chamado.prioridade === prioridadeSelecionada

        const statusCorresponde =
            statusSelecionado === '' ||
            chamado.status === statusSelecionado

        return nomeCorresponde &&
               prioridadeCorresponde &&
               statusCorresponde
    })

    if (ordenacao.value === 'prioridade') {

        const pesoPrioridade = {
            'Crítica': 1,
            'Alta': 2,
            'Média': 3,
            'Baixa': 4
        }

        listaFiltrada.sort((a, b) =>
            pesoPrioridade[a.prioridade] -
            pesoPrioridade[b.prioridade]
        )
    }

    if (ordenacao.value === 'status') {

        const pesoStatus = {
            'Aberto': 1,
            'Em progresso': 2,
            'Fechado': 3
        }

        listaFiltrada.sort((a, b) =>
            pesoStatus[a.status] -
            pesoStatus[b.status]
        )
    }

    mostrarChamados(listaFiltrada)
}

function limparFiltros() {
    pesquisa.value = ''
    filtroPrioridade.value = ''
    filtroStatus.value = ''
    ordenacao.value = ''

    mostrarChamados(chamados)
}

pesquisa.addEventListener('input', filtrarChamados)

filtroPrioridade.addEventListener(
    'change',
    filtrarChamados
)

filtroStatus.addEventListener(
    'change',
    filtrarChamados
)

ordenacao.addEventListener(
    'change',
    filtrarChamados
)

limpar.addEventListener(
    'click',
    limparFiltros
)

mostrarChamados(chamados)
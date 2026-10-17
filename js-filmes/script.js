
const API_KEY = "0e334dad76711446f35e49f5d0bd1577";
const btnCadastrarFilme = document.getElementById("btnCadastrarFilme");
const listaFilmes = document.getElementById("listaFilmes");
const contadorFilmes = document.getElementById("contadorFilmes");
const CHAVE_FILMES = "cinePipocaFilmes";
const CHAVE_SERIES = "cinePipocaSeries";

let filmes = JSON.parse(
    localStorage.getItem(CHAVE_FILMES)
) || [];

let series = JSON.parse(
    localStorage.getItem(CHAVE_SERIES)
) || [];
function salvarFilmes() {
    localStorage.setItem(
        CHAVE_FILMES,
        JSON.stringify(filmes)
    );
}

function salvarSeries() {
    localStorage.setItem(
        CHAVE_SERIES,
        JSON.stringify(series)
    );
}

let totalFilmes = 0;

function renderizarFilmes() {
    listaFilmes.innerHTML = "";

    filmes.forEach(function (filme, index) {
        const card = document.createElement("div");
        card.classList.add("filme");

        card.innerHTML = `
            <h3>🎬 ${filme.nome}</h3>
            <p>🎭 ${filme.genero}</p>
            <p>📅 ${filme.ano}</p>
        `;

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";

        btnExcluir.addEventListener("click", function () {
            filmes.splice(index, 1);

            salvarFilmes();
            renderizarFilmes();
            renderizarFilmes();
renderizarSeries();
        });

        card.appendChild(btnExcluir);
        listaFilmes.appendChild(card);
    });

    contadorFilmes.textContent =
        `Filmes cadastrados: ${filmes.length}`;
}

btnCadastrarFilme.addEventListener("click", function () {
    const nome = document.getElementById("nomeFilme").value.trim();
    const genero = document.getElementById("genero").value.trim();
    const ano = document.getElementById("ano").value;

    if (nome === "" || genero === "" || ano === "") {
        alert("Preencha todos os campos!");
        return;
    }

    const novoFilme = {
        nome: nome,
        genero: genero,
        ano: ano
    };

    filmes.push(novoFilme);

    salvarFilmes();
    renderizarFilmes();

    document.getElementById("nomeFilme").value = "";
    document.getElementById("genero").value = "";
    document.getElementById("ano").value = "";
});


//
// series
//

const btnCadastrarSerie = document.getElementById("btnCadastrarSerie");
const listaSeries = document.getElementById("listaSeries");
const contadorSeries = document.getElementById("contadorSeries");

let totalSeries = 0;

function renderizarSeries() {
    listaSeries.innerHTML = "";

    series.forEach(function (serie, index) {
        const card = document.createElement("div");
        card.classList.add("filme");

        card.innerHTML = `
            <h3>📺 ${serie.nome}</h3>
            <p>🎭 ${serie.genero}</p>
            <p>📚 Temporadas: ${serie.temporadas}</p>
            <p>📌 Status: ${serie.status}</p>
        `;

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";

        btnExcluir.addEventListener("click", function () {
            series.splice(index, 1);

            salvarSeries();
            renderizarSeries();
        });

        card.appendChild(btnExcluir);
        listaSeries.appendChild(card);
    });

    contadorSeries.textContent =
        `Séries cadastradas: ${series.length}`;
}

btnCadastrarSerie.addEventListener("click", function () {
    const nome = document.getElementById("nomeSerie").value.trim();
    const genero = document.getElementById("generoSerie").value.trim();
    const temporadas = document.getElementById("temporadas").value;
    const status = document.getElementById("status").value;

    if (
        nome === "" ||
        genero === "" ||
        temporadas === "" ||
        status === ""
    ) {
        alert("Preencha todos os campos!");
        return;
    }

    const novaSerie = {
        nome: nome,
        genero: genero,
        temporadas: temporadas,
        status: status
    };

    series.push(novaSerie);

    salvarSeries();
    renderizarSeries();
    renderizarFilmes();
    renderizarSeries();

    document.getElementById("nomeSerie").value = "";
    document.getElementById("generoSerie").value = "";
    document.getElementById("temporadas").value = "";
    document.getElementById("status").value = "";
});

//
// ================= modo escuro =================
//

const btnModoEscuro = document.getElementById("btnModoEscuro");

btnModoEscuro.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
});
//
const btnBuscar = document.getElementById("btnBuscar");

btnBuscar.addEventListener("click", buscarFilme);

async function buscarFilme() {

    const nomeFilme = document.getElementById("buscarFilme").value;

    const resposta = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-BR&query=${nomeFilme}`
    );

    const dados = await resposta.json();

    mostrarFilme(dados.results[0]);
}

function mostrarFilme(filme) {

    const resultado = document.getElementById("resultadoBusca");

    if (!filme) {

        resultado.innerHTML = "<p>Filme não encontrado.</p>";

        return;
    }

    resultado.innerHTML = `
        <div class="filme">

            <img
                src="https://image.tmdb.org/t/p/w300${filme.poster_path}"
                alt="${filme.title}">

            <h2>${filme.title}</h2>

            <p><strong>Lançamento:</strong> ${filme.release_date}</p>

            <p>${filme.overview}</p>

        </div>
    `;
}
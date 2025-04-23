const dados = {
    "noticias": [
        {
            "id": 1,
            "titulo": "Prefeitura Lança Novo Plano de Mobilidade Urbana",
            "descricao": "Novo plano visa melhorar o transporte público e reduzir o trânsito na cidade.",
            "conteudo": "A Prefeitura apresentou nesta segunda-feira um novo plano de mobilidade urbana que inclui a criação de corredores exclusivos de ônibus, ciclovias e a requalificação de vias principais. O projeto será implementado ao longo dos próximos dois anos.",
            "categoria": "Cidades",
            "autor": "Joana Ribeiro",
            "destaque": true,
            "data": "2025-03-30",
            "imagem_principal": "https://images.unsplash.com/photo-1601758003122-53c40e686a19",
            "imagens_complementares": [
                { 
                    "id": 1,
                    "src": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325",
                    "descricao": "Corredor exclusivo para ônibus"
                },
                { 
                    "id": 2,
                    "src": "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8",
                    "descricao": "Ciclovia em área central"
                },
                { 
                    "id": 3,
                    "src": "https://images.unsplash.com/photo-1518457900604-d0aa5f7f63de",
                    "descricao": "Requalificação de calçadas"
                }
            ]
        },
        {
            "id": 2,
            "titulo": "Tecnologia 6G Está em Desenvolvimento",
            "descricao": "Pesquisadores anunciam avanços na próxima geração de redes móveis.",
            "conteudo": "Universidades e empresas de telecomunicação já estão testando tecnologias que poderão compor a infraestrutura do 6G. A expectativa é que a nova geração seja 100 vezes mais rápida que o 5G e amplie a integração entre dispositivos inteligentes.",
            "categoria": "Tecnologia",
            "autor": "Carlos Mendes",
            "destaque": true,
            "data": "2025-03-28",
            "imagem_principal": "https://images.unsplash.com/photo-1518770660439-4636190af475",
            "imagens_complementares": [
                { 
                    "id": 1,
                    "src": "https://images.unsplash.com/photo-1518770660439-4636190af475",
                    "descricao": "Teste de rede 6G em laboratório"
                },
                { 
                    "id": 2,
                    "src": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
                    "descricao": "Equipamentos para 6G"
                }
            ]
        },
        {
            "id": 3,
            "titulo": "Festival de Música Reúne Mais de 50 Mil Pessoas",
            "descricao": "Evento cultural movimentou o final de semana com atrações nacionais e internacionais.",
            "conteudo": "Durante três dias de programação, o festival contou com a participação de mais de 40 artistas e promoveu atividades culturais e gastronômicas em paralelo. A prefeitura estima um impacto positivo no turismo local.",
            "categoria": "Cultura",
            "autor": "Ana Clara Silva",
            "destaque": false,
            "data": "2025-03-27",
            "imagem_principal": "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3",
            "imagens_complementares": [
                { 
                    "id": 1,
                    "src": "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4",
                    "descricao": "Público no festival"
                },
                { 
                    "id": 2,
                    "src": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
                    "descricao": "Artista se apresentando"
                }
            ]
        }
    ]
};

// Função para carregar os destaques no carrossel
function carregarDestaques() {
    const destaques = dados.noticias.filter(noticia => noticia.destaque);
    const carouselInner = document.querySelector('.carousel-inner');
    
    if (destaques.length === 0) {
        carouselInner.innerHTML = '<div class="carousel-item active"><p>Nenhum destaque disponível no momento.</p></div>';
        return;
    }
    
    destaques.forEach((noticia, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        
        carouselItem.innerHTML = `
            <img src="${noticia.imagem_principal}" class="d-block w-100" alt="${noticia.titulo}">
            <div class="carousel-caption d-none d-md-block">
                <h5>${noticia.titulo}</h5>
                <p>${noticia.descricao}</p>
                <a href="detalhe.html?id=${noticia.id}" class="btn btn-primary">Ver detalhes</a>
            </div>
        `;
        
        carouselInner.appendChild(carouselItem);
    });
}

// Função para carregar todos os itens em cards
function carregarTodosItens() {
    const container = document.querySelector('#todos-itens');
    
    dados.noticias.forEach(noticia => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-4';
        
        col.innerHTML = `
            <div class="card h-100">
                <img src="${noticia.imagem_principal}" class="card-img-top" alt="${noticia.titulo}">
                <div class="card-body">
                    <h5 class="card-title">${noticia.titulo}</h5>
                    <p class="card-text">${noticia.descricao}</p>
                    <span class="badge bg-secondary">${noticia.categoria}</span>
                </div>
                <div class="card-footer bg-transparent">
                    <a href="detalhe.html?id=${noticia.id}" class="btn btn-outline-primary">Ler mais</a>
                </div>
            </div>
        `;
        
        container.appendChild(col);
    });
}

// Função para carregar os detalhes de uma notícia específica
function carregarDetalhesItem() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    if (!id) {
        window.location.href = 'index.html';
        return;
    }
    
    const noticia = dados.noticias.find(n => n.id === parseInt(id));
    
    if (!noticia) {
        window.location.href = 'index.html';
        return;
    }
    
    // Preencher informações principais
    document.getElementById('titulo-item').textContent = noticia.titulo;
    document.getElementById('imagem-principal').src = noticia.imagem_principal;
    document.getElementById('imagem-principal').alt = noticia.titulo;
    
    // Preencher informações adicionais
    const infoAdicionais = document.getElementById('info-adicionais');
    infoAdicionais.innerHTML = `
        <p><strong>Publicado em:</strong> ${new Date(noticia.data).toLocaleDateString('pt-BR')}</p>
        <p><strong>Autor:</strong> ${noticia.autor}</p>
        <p><strong>Categoria:</strong> ${noticia.categoria}</p>
        <div class="mt-4">
            <h4>Matéria completa:</h4>
            <p>${noticia.conteudo}</p>
        </div>
    `;
    
    // Preencher fotos complementares
    const fotosContainer = document.getElementById('fotos-item');
    
    noticia.imagens_complementares.forEach(foto => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-4';
        
        col.innerHTML = `
            <div class="card h-100">
                <img src="${foto.src}" class="card-img-top" alt="${foto.descricao}">
                <div class="card-body">
                    <p class="card-text">${foto.descricao}</p>
                </div>
            </div>
        `;
        
        fotosContainer.appendChild(col);
    });
}

// Carregar conteúdo conforme a página
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.carousel-inner')) {
        carregarDestaques();
        carregarTodosItens();
    }
    
    if (document.getElementById('detalhes-item')) {
        carregarDetalhesItem();
    }
});
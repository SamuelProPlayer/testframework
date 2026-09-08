// Script Principal - Inicialização e Manipulação do DOM
$(document).ready(function() {
  // ============================================================
  // 1. CARREGAMENTO DE IMÓVEIS
  // ============================================================
  let imoveisCache = [];

  function carregarImoveis() {
    API.buscarImoveis(
      function(imoveis) {
        imoveisCache = imoveis;
        renderizarImoveis(imoveis);
      },
      function(error) {
        console.error('Erro ao carregar imóveis:', error);
        $('#imoveis-container').html(
          '<p style="text-align: center; color: #666; padding: 2rem;">Erro ao carregar imóveis. Verifique a conexão com o servidor.</p>'
        );
      }
    );
  }

  // ============================================================
  // 2. RENDERIZAR CARDS DE IMÓVEIS
  // ============================================================
  function renderizarImoveis(imoveis) {
    const container = $('#imoveis-container');
    container.empty();

    if (imoveis.length === 0) {
      container.html(
        '<p style="text-align: center; color: #666; padding: 2rem; grid-column: 1/-1;">Nenhum imóvel encontrado com os filtros selecionados.</p>'
      );
      return;
    }

    imoveis.forEach((imovel) => {
      const card = `
        <article class="card-img" data-imovel-id="${imovel.id}">
          <div class="imovel-image">
            <img src="${imovel.imagens[0]}" alt="${imovel.nome}" loading="lazy">
            <span class="imovel-badge">${imovel.badge || 'Destaque'}</span>
          </div>
          <div class="imovel-details">
            <h3>${imovel.nome}</h3>
            <p class="imovel-price">R$ ${imovel.preco.toLocaleString('pt-BR')}</p>
            <p class="imovel-description">${imovel.suites} Suítes • ${imovel.banheiros} Banheiros • ${imovel.area} m²</p>
            <p class="imovel-info">${imovel.descricao}</p>
            <div style="display: flex; gap: 0.5rem;">
              <button class="btn btn-outline btn-ver-mais" data-id="${imovel.id}">Ver Mais</button>
              <button class="btn btn-secondary btn-favoritar" data-id="${imovel.id}" title="Adicionar aos favoritos" style="flex: 1; background: transparent; color: #d4af37; border: 2px solid #d4af37; padding: 10px 15px;">
                &#10084; Favoritar
              </button>
            </div>
          </div>
        </article>
      `;
      container.append(card);
    });

    // Event Listeners para botoes de cards
    $('.btn-ver-mais').on('click', function() {
      const id = $(this).data('id');
      abrirModalDetalhes(id);
    });

    $('.btn-favoritar').on('click', function() {
      const id = $(this).data('id');
      toggleFavorito(id, $(this));
    });

    // Carregar favoritos do localStorage
    atualizarBotoesFavoritos();
  }

  // ============================================================
  // 3. FILTRO DE IMÓVEIS
  // ============================================================
  $('#filtro-preco').on('input', function() {
    const valor = parseInt($(this).val());
    $('#preco-display').text('Até R$ ' + valor.toLocaleString('pt-BR'));
  });

  $('#btn-filtrar').on('click', function() {
    const tipo = $('#filtro-tipo').val();
    const cidade = $('#filtro-cidade').val();
    const preco = parseInt($('#filtro-preco').val());
    const finalidade = $('#filtro-finalidade').val();

    const filtrados = imoveisCache.filter((imovel) => {
      return (
        (tipo === '' || imovel.tipo === tipo) &&
        (cidade === '' || imovel.cidade === cidade) &&
        (imovel.preco <= preco) &&
        (finalidade === '' || imovel.finalidade === finalidade)
      );
    });

    renderizarImoveis(filtrados);
  });

  $('#btn-limpar').on('click', function() {
    $('#filtro-tipo').val('');
    $('#filtro-cidade').val('');
    $('#filtro-preco').val(15000000);
    $('#filtro-finalidade').val('');
    $('#preco-display').text('Até R$ 15.000.000');
    renderizarImoveis(imoveisCache);
  });

  // ============================================================
  // 4. MODAL DE DETALHES DO IMÓVEL
  // ============================================================
  function abrirModalDetalhes(id) {
    API.buscarImovelPorId(id, function(imovel) {
      const atributosHTML = imovel.atributos
        .map((attr) => `<span class="attribute-tag">${attr}</span>`)
        .join('');

      const imagensHTML = imovel.imagens
        .map((img, index) => `<img src="${img}" alt="Imagem ${index + 1}" class="${index === 0 ? 'active' : ''}">`)
        .join('');

      const modalContent = `
        <div class="imovel-detail-content">
          <article>
            <figure class="imovel-gallery">
              <div class="carousel-container">
                ${imagensHTML}
              </div>
              <div class="carousel-controls">
                <button class="carousel-prev" data-imovel="${id}" style="padding: 8px 12px; font-size: 0.85rem;">← Anterior</button>
                <span class="carousel-counter" data-imovel="${id}">1 / ${imovel.imagens.length}</span>
                <button class="carousel-next" data-imovel="${id}" style="padding: 8px 12px; font-size: 0.85rem;">Próxima →</button>
              </div>
            </figure>

            <section style="margin-top: 2rem;">
              <h2 style="font-family: 'Playfair Display', serif; font-size: 2rem; margin-bottom: 1rem; color: #1a1a1a;">${imovel.nome}</h2>
              <p style="font-size: 1.3rem; color: #d4af37; font-weight: 700; margin-bottom: 1rem;">R$ ${imovel.preco.toLocaleString('pt-br')}</p>

              <div class="imovel-info-grid">
                <div class="info-item">
                  <div class="label">Suítes</div>
                  <div class="value">${imovel.suites}</div>
                </div>
                <div class="info-item">
                  <div class="label">Banheiros</div>
                  <div class="value">${imovel.banheiros}</div>
                </div>
                <div class="info-item">
                  <div class="label">Área</div>
                  <div class="value">${imovel.area} m²</div>
                </div>
                <div class="info-item">
                  <div class="label">Garagens</div>
                  <div class="value">${imovel.garagens || 0}</div>
                </div>
              </div>

              <p style="margin-top: 1.5rem; color: #666; line-height: 1.7; font-size: 0.95rem;">${imovel.descricaoCompleta}</p>

              <div class="imovel-attributes">
                <h4>Atributos</h4>
                <div class="attributes-list">
                  ${atributosHTML}
                </div>
              </div>

              <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #e0e0e0;">
                <h4 style="margin-bottom: 1rem; color: #1a1a1a;">Localização</h4>
                <p style="color: #666; margin-bottom: 0.5rem;"><strong>Endereço:</strong> ${imovel.endereco}</p>
                <p style="color: #666; margin-bottom: 0.5rem;"><strong>Bairro:</strong> ${imovel.bairro}</p>
                <p style="color: #666; margin-bottom: 0.5rem;"><strong>Cidade:</strong> ${imovel.cidade}</p>
                <p style="color: #666;"><strong>CEP:</strong> ${imovel.cep}</p>
              </div>
            </section>
          </article>

          <aside style="background-color: #f9f9f9; padding: 2rem; border-radius: 8px; height: fit-content;">
            <form class="proposta-form" data-imovel-id="${imovel.id}">
              <h3 style="font-family: 'Playfair Display', serif; font-size: 1.3rem; margin-bottom: 1.5rem; color: #1a1a1a;">Envie uma Proposta</h3>
              
              <div class="form-group">
                <label for="proposta-nome">Seu Nome</label>
                <input type="text" id="proposta-nome" name="nome" required placeholder="Nome completo" aria-label="Seu nome">
              </div>
              
              <div class="form-group">
                <label for="proposta-email">Email</label>
                <input type="email" id="proposta-email" name="email" required placeholder="seu@email.com" aria-label="Seu email">
              </div>
              
              <div class="form-group">
                <label for="proposta-telefone">Telefone</label>
                <input type="tel" id="proposta-telefone" name="telefone" placeholder="(00) 00000-0000" aria-label="Seu telefone">
              </div>
              
              <div class="form-group">
                <label for="proposta-mensagem">Mensagem</label>
                <textarea id="proposta-mensagem" name="mensagem" rows="4" placeholder="Conte-nos mais sobre seu interesse" aria-label="Sua mensagem"></textarea>
              </div>
              
              <button type="submit" class="btn btn-primary" style="width: 100%;">Enviar Proposta</button>
            </form>
          </aside>
        </div>
      `;

      $('#modal-body').html(modalContent);
      $('#modal-imovel').addClass('active');

      // Carrousel
      carregarCarrossel(imovel);

      // Form de Proposta
      $('.proposta-form').on('submit', function(e) {
        e.preventDefault();
        enviarProposta(imovel.id, $(this));
      });
    });
  }

  // ============================================================
  // 5. CARROSSEL DE IMAGENS
  // ============================================================
  let imagemAtual = {};

  function carregarCarrossel(imovel) {
    imagemAtual[imovel.id] = 0;
    atualizarCarrossel(imovel.id, imovel.imagens.length);
  }

  function atualizarCarrossel(id, total) {
    $(`.carousel-container img`).removeClass('active');
    $(`.carousel-container img:eq(${imagemAtual[id]})`).addClass('active');
    $(`.carousel-counter[data-imovel="${id}"]`).text(
      `${imagemAtual[id] + 1} / ${total}`
    );
  }

  $(document).on('click', '.carousel-prev', function() {
    const id = $(this).data('imovel');
    const total = $('.carousel-counter').length > 0 ? 
      parseInt($('.carousel-counter').text().split(' / ')[1]) : 0;
    imagemAtual[id] = (imagemAtual[id] - 1 + total) % total;
    atualizarCarrossel(id, total);
  });

  $(document).on('click', '.carousel-next', function() {
    const id = $(this).data('imovel');
    const total = $('.carousel-counter').length > 0 ?
      parseInt($('.carousel-counter').text().split(' / ')[1]) : 0;
    imagemAtual[id] = (imagemAtual[id] + 1) % total;
    atualizarCarrossel(id, total);
  });

  // ============================================================
  // 6. FECHAR MODAL
  // ============================================================
  $('.modal-close').on('click', function() {
    $('#modal-imovel').removeClass('active');
  });

  $('#modal-imovel').on('click', function(e) {
    if ($(e.target).is('#modal-imovel')) {
      $(this).removeClass('active');
    }
  });

  // ============================================================
  // 7. FAVORITOS - LOCALSTORAGE
  // ============================================================
  function toggleFavorito(id, button) {
    let favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');

    if (favoritos.includes(id)) {
      favoritos = favoritos.filter((fav) => fav !== id);
      button.css('color', '#d4af37').css('border-color', '#d4af37');
    } else {
      favoritos.push(id);
      button.css('color', '#d4af37').css('border-color', '#d4af37').css('background', 'rgba(212, 175, 55, 0.1)');
    }

    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }

  function atualizarBotoesFavoritos() {
    const favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
    favoritos.forEach((id) => {
      $(`.btn-favoritar[data-id="${id}"]`)
        .css('color', '#d4af37')
        .css('background', 'rgba(212, 175, 55, 0.1)');
    });
  }

  // ============================================================
  // 8. ENVIAR PROPOSTA
  // ============================================================
  function enviarProposta(imovelId, form) {
    const proposta = {
      id: Date.now(),
      imovelId: imovelId,
      nome: form.find('input[name="nome"]').val(),
      email: form.find('input[name="email"]').val(),
      telefone: form.find('input[name="telefone"]').val(),
      mensagem: form.find('textarea[name="mensagem"]').val(),
      dataProposta: new Date().toISOString(),
    };

    API.adicionarProposta(
      proposta,
      function() {
        alert('Proposta enviada com sucesso!');
        form[0].reset();
        $('#modal-imovel').removeClass('active');
      },
      function(error) {
        alert('Erro ao enviar proposta: ' + error);
      }
    );
  }

  // ============================================================
  // 9. FORMULÁRIO DE CONTATO
  // ============================================================
  $('#form-contato').on('submit', function(e) {
    e.preventDefault();

    const nome = $('#nome').val().trim();
    const email = $('#email-contato').val().trim();
    const telefone = $('#telefone-contato').val();
    const mensagem = $('#mensagem').val();

    if (!Validacao.validarNome(nome)) {
      alert('Por favor, insira um nome válido.');
      return;
    }

    if (!Validacao.validarEmail(email)) {
      alert('Por favor, insira um email válido.');
      return;
    }

    // Simular envio de contato
    console.log({
      nome: nome,
      email: email,
      telefone: telefone,
      mensagem: mensagem,
    });

    alert('Obrigado! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.');
    this.reset();
  });

  // ============================================================
  // 10. INICIALIZAÇÃO
  // ============================================================
  carregarImoveis();
});
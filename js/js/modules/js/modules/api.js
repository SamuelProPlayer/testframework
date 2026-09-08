// Módulo de API - Requisições Assíncronas
const API = {
  BASE_URL: 'http://localhost:3000',
  VIACEP_URL: 'https://viacep.com.br/ws',

  // Buscar todos os imóveis
  buscarImoveis: function(callback, errorCallback) {
    $.ajax({
      url: this.BASE_URL + '/imoveis',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        callback(data);
      },
      error: function(xhr, status, error) {
        console.error('Erro ao buscar imóveis:', error);
        if (errorCallback) errorCallback(error);
      },
    });
  },

  // Buscar um imóvel por ID
  buscarImovelPorId: function(id, callback, errorCallback) {
    $.ajax({
      url: this.BASE_URL + '/imoveis/' + id,
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        callback(data);
      },
      error: function(xhr, status, error) {
        console.error('Erro ao buscar imóvel:', error);
        if (errorCallback) errorCallback(error);
      },
    });
  },

  // Adicionar novo imóvel
  adicionarImovel: function(imovel, callback, errorCallback) {
    $.ajax({
      url: this.BASE_URL + '/imoveis',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(imovel),
      success: function(data) {
        callback(data);
      },
      error: function(xhr, status, error) {
        console.error('Erro ao adicionar imóvel:', error);
        if (errorCallback) errorCallback(error);
      },
    });
  },

  // Atualizar imóvel
  atualizarImovel: function(id, imovel, callback, errorCallback) {
    $.ajax({
      url: this.BASE_URL + '/imoveis/' + id,
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(imovel),
      success: function(data) {
        callback(data);
      },
      error: function(xhr, status, error) {
        console.error('Erro ao atualizar imóvel:', error);
        if (errorCallback) errorCallback(error);
      },
    });
  },

  // Deletar imóvel
  deletarImovel: function(id, callback, errorCallback) {
    $.ajax({
      url: this.BASE_URL + '/imoveis/' + id,
      type: 'DELETE',
      success: function(data) {
        callback(data);
      },
      error: function(xhr, status, error) {
        console.error('Erro ao deletar imóvel:', error);
        if (errorCallback) errorCallback(error);
      },
    });
  },

  // Buscar endereço por CEP (ViaCEP API Pública)
  buscarEnderecoPorCEP: function(cep) {
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) {
      $('#cep-error').text('CEP deve ter 8 dígitos').show();
      return;
    }

    $.ajax({
      url: this.VIACEP_URL + '/' + cepLimpo + '/json',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        if (data.erro) {
          $('#cep-error').text('CEP não encontrado').show();
        } else {
          $('#endereco').val(data.logradouro);
          $('#bairro').val(data.bairro);
          $('#cidade').val(data.localidade);
          $('#cep-error').hide();
        }
      },
      error: function(xhr, status, error) {
        console.error('Erro ao buscar CEP:', error);
        $('#cep-error').text('Erro ao buscar CEP').show();
      },
    });
  },

  // Adicionar proposta/contato
  adicionarProposta: function(proposta, callback, errorCallback) {
    $.ajax({
      url: this.BASE_URL + '/propostas',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(proposta),
      success: function(data) {
        callback(data);
      },
      error: function(xhr, status, error) {
        console.error('Erro ao enviar proposta:', error);
        if (errorCallback) errorCallback(error);
      },
    });
  },

  // Buscar propostas
  buscarPropostas: function(callback, errorCallback) {
    $.ajax({
      url: this.BASE_URL + '/propostas',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        callback(data);
      },
      error: function(xhr, status, error) {
        console.error('Erro ao buscar propostas:', error);
        if (errorCallback) errorCallback(error);
      },
    });
  },
};
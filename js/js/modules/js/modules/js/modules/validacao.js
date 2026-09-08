// Módulo de Validação - Regex e Verificações
const Validacao = {
  // Validação de Email
  validarEmail: function(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },

  // Validação de CPF (formato: 000.000.000-00)
  validarCPF: function(cpf) {
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!regex.test(cpf)) return false;

    let numeros = cpf.replace(/\D/g, '');
    if (numeros.length !== 11) return false;

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(numeros)) return false;

    // Verifica primeiro dígito verificador
    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
      soma += parseInt(numeros.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(numeros.substring(9, 10))) return false;

    // Verifica segundo dígito verificador
    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(numeros.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(numeros.substring(10, 11))) return false;

    return true;
  },

  // Validação de Telefone
  validarTelefone: function(telefone) {
    const regex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    return regex.test(telefone);
  },

  // Validação de CEP
  validarCEP: function(cep) {
    const regex = /^\d{5}-\d{3}$/;
    return regex.test(cep);
  },

  // Validação de URL
  validarURL: function(url) {
    const regex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
    return regex.test(url);
  },

  // Validação de Senha (mínimo 8 caracteres, com letra, número e caractere especial)
  validarSenha: function(senha) {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
    return regex.test(senha);
  },

  // Validação de Nome (apenas letras e espaços)
  validarNome: function(nome) {
    const regex = /^[a-zA-Z\sáéíóúÁÉÍÓÚãõÃÕçÇ]{2,}$/;
    return regex.test(nome);
  },

  // Validação de número positivo
  validarNumeroPositivo: function(numero) {
    return !isNaN(numero) && numero > 0;
  },

  // Validar formulário completo
  validarFormulario: function(formulario) {
    const campos = formulario.querySelectorAll('[required]');
    let valido = true;

    campos.forEach((campo) => {
      if (!campo.value.trim()) {
        campo.classList.add('is-invalid');
        valido = false;
      } else {
        campo.classList.remove('is-invalid');
      }
    });

    return valido;
  },

  // Limpar mensagens de erro
  limparErros: function(formulario) {
    const campos = formulario.querySelectorAll('.is-invalid');
    campos.forEach((campo) => {
      campo.classList.remove('is-invalid');
    });
  },
};
# SA Central de Vendas - Plataforma de Imóveis de Luxo

## 📋 Visão Geral

SA Central de Vendas é uma plataforma completa de vendas e aluguel de imóveis de luxo, desenvolvida com HTML5 semântico, CSS puro (Flexbox/Grid), SCSS modular, e JavaScript funcional. O projeto atende a todos os requisitos acadêmicos (RA1 a RA5) com implementações profissionais.

---

## 🎯 Requisitos Acadêmicos Implementados

### ✅ RA1: CSS & Responsividade

#### ID 01-04: Bootstrap 5 + CSS Puro
- **Localização**: `index.html`, `login.html`, `cadastro-imovel.html`
- **Implementação**: 
  - Navbar fixa com Bootstrap
  - Modais com Bootstrap
  - Carrossel de imagens customizado
  - Grid de produtos responsivo

#### ID 05 & 08: Layouts Fluidos com Unidades Relativas
- **Arquivo**: `scss/style.scss` (linhas 1-50)
- **Implementação**:
  ```scss
  // Tipografia Fluida com clamp()
  .title-part1 {
    @include fluid-typography(2rem, 4rem);
  }
  ```
- **Uso de**: `rem`, `em`, `vw`, `vh`, `clamp()` para responsividade

#### ID 06 & 07: Design System com SCSS
- **Arquivo**: `scss/_variables.scss`
- **Implementação**:
  - Variáveis de cores: `$primary-color`, `$secondary-color`, `$accent-color`
  - Mixins reutilizáveis: `@mixin flex-center`, `@mixin grid-auto-fit`, `@mixin button-primary`
  - Funções SCSS para tipografia fluida
  - Arquitetura modular com `_variables.scss` e `_mixins.scss`

#### ID 09 & 10: Imagens Responsivas & Lazy Loading
- **Localização**: `index.html` (linhas ~150, ~200)
- **Implementação**:
  ```html
  <img src="..." alt="..." loading="lazy">
  ```
- **Atributo `loading="lazy"`**: Carregamento lazy de imagens
- **`<picture>` tag**: Pronta para suportar múltiplos formatos

---

### ✅ RA2: Formulários & Storage

#### ID 11-13: Validações HTML5 + REGEX
- **Arquivo**: `js/modules/validacao.js`
- **Implementação**:
  ```javascript
  Validacao.validarEmail(email);        // REGEX para email
  Validacao.validarCPF(cpf);            // Valida CPF com algoritmo
  Validacao.validarTelefone(telefone);  // REGEX para telefone
  Validacao.validarCEP(cep);            // Valida CEP
  ```
- **Elementos de Seleção**: `<select>`, `<input type="range">`, `<input type="checkbox">`, `<input type="radio">`
- **Localização**: `cadastro-imovel.html` (checkboxes de atributos)

#### ID 14: localStorage
- **Arquivo**: `js/main.js` (linhas ~230-250)
- **Implementação**:
  ```javascript
  // Favoritar imóvel
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
  
  // Recuperar favoritos
  let favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
  ```
- **Persistência**: Imóveis favoritados e login do corretor

---

### ✅ RA3: Boas Práticas & Ferramentas

#### ID 15-19: Estrutura Node.js/NPM
- **Arquivo**: `package.json`
- **Scripts**:
  ```json
  {
    "sass": "sass scss:css --watch",
    "server": "json-server --watch db.json --port 3000",
    "dev": "concurrently \"npm run sass\" \"npm run server\" \"npx lite-server\""
  }
  ```
- **Modularização**: `js/modules/validacao.js`, `js/modules/api.js`, `js/main.js`
- **Linting**: `.eslintrc.json` configurado
- **Formatação**: `.prettierrc` configurado
- **.gitignore**: Arquivo criado para excluir `node_modules/`

---

### ✅ RA4: jQuery & DOM

#### ID 20 & 21: Manipulação DOM + jQuery Mask
- **Arquivo**: `js/main.js` (linhas ~1-100)
- **jQuery Mask Plugin**: 
  ```javascript
  $('#telefone-contato').mask('(00) 00000-0000');
  $('#cep').mask('00000-000');
  ```
- **Manipulação do DOM**:
  - `.append()`, `.html()`, `.on()`, `.addClass()`, `.removeClass()`
  - Event listeners dinâmicos
  - Renderização de cards via jQuery

---

### ✅ RA5: Requisições Assíncronas - APIs

#### ID 22 & 23: API Local (json-server)
- **Arquivo**: `js/modules/api.js`
- **Endpoints Implementados**:
  ```javascript
  API.buscarImoveis();              // GET /imoveis
  API.buscarImovelPorId(id);        // GET /imoveis/:id
  API.adicionarImovel(imovel);      // POST /imoveis
  API.atualizarImovel(id, imovel);  // PUT /imoveis/:id
  API.deletarImovel(id);            // DELETE /imoveis/:id
  API.adicionarProposta(proposta);  // POST /propostas
  ```
- **Database**: `db.json` com dados iniciais

#### ID 24: ViaCEP - Auto-preenchimento de CEP
- **Arquivo**: `js/modules/api.js` (linhas ~95-120)
- **Implementação**:
  ```javascript
  API.buscarEnderecoPorCEP(cep); // Integração com ViaCEP
  ```
- **Localização**: `cadastro-imovel.html` (campo CEP)
- **Funcionalidade**: Ao digitar CEP, auto-preenche Rua, Bairro, Cidade

---

## 🏗️ Arquitetura do Projeto

### Estrutura de Arquivos

```
sa-central-vendas/
├── index.html                 # Página principal (HOME)
├── login.html                 # Login do corretor
├── cadastro-imovel.html       # Cadastro de novos imóveis
├── package.json               # Dependências e scripts
├── db.json                    # Banco de dados fake (json-server)
├── .gitignore                 # Git ignore
├── .eslintrc.json             # ESLint config
├── .prettierrc                # Prettier config
│
├── css/
│   ├── custom-grid.css        # CSS puro (Grid/Flexbox)
│   └── style.css              # Compilado do SCSS
│
├── scss/
│   ├── _variables.scss        # Variáveis de design system
│   ├── _mixins.scss           # Mixins reutilizáveis
│   └── style.scss             # SCSS principal
│
└── js/
    ├── modules/
    │   ├── validacao.js       # Validações REGEX
    │   └── api.js             # Requisições async
    └── main.js                # Script principal
```

---

## 🎨 Paleta de Cores (Mantida do Projeto Original)

```scss
$primary-color: #2c2c2c;        // Cinza escuro
$secondary-color: #d4af37;      // Dourado premium
$accent-color: #f5f5f5;         // Branco off
$text-dark: #1a1a1a;            // Texto escuro
$text-light: #666666;           // Texto claro
$border-color: #e0e0e0;         // Borda padrão
```

---

## 🚀 Como Executar o Projeto

### 1. Instalação de Dependências

```bash
npm install
```

### 2. Iniciar o Desenvolvimento

```bash
# Em um terminal
npm run dev

# Em outro terminal (para compilar SCSS)
npm run sass
```

### 3. Servidor Local

- **Site**: http://localhost:3000
- **JSON Server**: http://localhost:3000 (mesma porta)

### 4. Build para Produção

```bash
npm run build
```

---

## 📱 Funcionalidades Implementadas

### Página Principal (index.html)

✅ **Filtro de Pesquisa Funcional**
- Filtro por tipo (Casa, Apartamento, Sobrado)
- Filtro por cidade
- Filtro por faixa de preço (range slider)
- Filtro por finalidade (Venda/Aluguel)
- Botões "Filtrar" e "Limpar Filtros"

✅ **Grid de Cards Dinâmicos**
- Carregados via API (json-server)
- Botão "Ver Mais" que abre modal com detalhes
- Botão "Favoritar" que persiste no localStorage
- Badge de destaque (Novo Lançamento, Premium, etc.)

✅ **Modal de Detalhes**
- Galeria de imagens com carrossel
- Informações técnicas (suítes, banheiros, área)
- Descrição completa
- Atributos (Piscina, Sauna, etc.)
- Formulário de proposta (envia via POST)

✅ **Seções Adicionais**
- Vizinhança premium (8 cards com emojis)
- Mapa de localização (Google Maps embed)
- Sobre a empresa com estatísticas
- Formulário de contato com validação

### Página de Login (login.html)

✅ **Autenticação de Corretor**
- Validação de email (REGEX)
- Validação de senha (mínimo 6 caracteres)
- Armazenamento no localStorage
- Redirecionamento para cadastro após login
- **Credenciais de teste**: 
  - Email: `corretor@savendas.com`
  - Senha: `123456`

### Página de Cadastro (cadastro-imovel.html)

✅ **Formulário Completo de Imóvel**
- Informações básicas (Nome, Tipo, Preço)
- Características (Suítes, Banheiros, Área)
- Localização com **integração ViaCEP**
- Descrição breve e completa
- Checkboxes de atributos (12 opções)
- Upload de imagens
- Badge de destaque
- Botões de ação (Cadastrar, Limpar, Voltar)

---

## 🔐 Validações Implementadas

### REGEX Patterns

```javascript
Email:      /^[^\s@]+@[^\s@]+\.[^\s@]+$/
CPF:        /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
Telefone:   /^\(\d{2}\) \d{4,5}-\d{4}$/
CEP:        /^\d{5}-\d{3}$/
Senha:      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/
Nome:       /^[a-zA-Z\sáéíóú...]{2,}$/
```

---

## 📦 Dependências

```json
{
  "bootstrap": "^5.3.0",
  "jquery": "^3.7.0",
  "jquery-mask-plugin": "^1.14.16"
}
```

### Dev Dependencies

- `sass`: Compilador SCSS
- `json-server`: Fake API server
- `lite-server`: Servidor development
- `eslint` + `prettier`: Code quality

---

## 🎯 HTML5 Semântico

Todo o projeto usa tags semânticas sem excesso de divs:

```html
<header>       <!-- Navegação e logo -->
<nav>          <!-- Menu de navegação -->
<main>         <!-- Conteúdo principal -->
<section>      <!-- Seções de conteúdo -->
<article>      <!-- Cards e artigos -->
<aside>        <!-- Informações laterais -->
<figure>       <!-- Imagens com caption -->
<footer>       <!-- Rodapé -->
<fieldset>     <!-- Grupos de formulário -->
<legend>       <!-- Título de fieldset -->
```

---

## 🎨 CSS Puro Significativo

### Grid Layout Customizado

**Arquivo**: `css/custom-grid.css`

```css
/* Filtro Section - Grid puro */
.filtro-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

/* Cards responsivos */
.imoveis {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
}
```

### Flexbox Puro

```css
.carousel-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
```

---

## 🔄 Fluxo de Dados

### 1. Carregamento Inicial
```
Carregar página → Fetch /imoveis (json-server) → Renderizar cards
```

### 2. Filtro
```
Alterar filtros → Click "Filtrar" → Filtrar array local → Re-renderizar
```

### 3. Ver Detalhes
```
Click "Ver Mais" → Fetch /imoveis/:id → Abrir modal → Renderizar conteúdo
```

### 4. Enviar Proposta
```
Fill form → Click "Enviar" → POST /propostas → localStorage (proposta enviada)
```

### 5. Cadastrar Imóvel
```
Login → Preencher formulário → POST /imoveis → Sucesso
```

---

## 📊 Banco de Dados (db.json)

```json
{
  "imoveis": [
    {
      "id": 1,
      "nome": "Planalto Real",
      "preco": 3900000,
      "tipo": "casa",
      "suites": 2,
      "banheiros": 2,
      "area": 450,
      "finalidade": "venda",
      "cidade": "São Paulo",
      ...
    }
  ],
  "propostas": [],
  "usuarios": [
    {
      "id": 1,
      "email": "corretor@savendas.com",
      "senha": "123456"
    }
  ]
}
```

---

## 🔒 Segurança & Boas Práticas

✅ Validações no cliente (REGEX)
✅ Máscaras de input (jQuery Mask)
✅ localStorage para dados sensíveis
✅ HTML5 required attributes
✅ ARIA labels para acessibilidade
✅ ESLint para code quality
✅ Prettier para code formatting

---

## 📱 Responsividade

### Breakpoints

```scss
$breakpoint-sm: 576px;   // Tablets pequenos
$breakpoint-md: 768px;   // Tablets
$breakpoint-lg: 992px;   // Desktops pequenos
$breakpoint-xl: 1200px;  // Desktops
$breakpoint-xxl: 1400px; // Desktops grandes
```

### Media Queries

Todas as seções são responsivas com Grid Layout automático:

```css
@media (max-width: 768px) {
  .imoveis {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}

@media (max-width: 576px) {
  .imoveis {
    grid-template-columns: 1fr;
  }
}
```

---

## 🎬 Animações & Transições

```scss
$transition: all 0.3s ease;
$transition-fast: all 0.15s ease;
$transition-slow: all 0.6s ease;
```

Usadas em:
- Hover de cards (translateY, box-shadow)
- Foco de inputs
- Transição de imagens (opacity)
- Animação de modal (slideIn)

---

## ✨ Melhorias Implementadas

✅ **Tipografia Fluida**: Textos escaláveis com `clamp()`
✅ **Design System**: Variáveis e mixins SCSS reutilizáveis
✅ **API Integration**: Fetch + jQuery Ajax com json-server
✅ **localStorage**: Persistência de favoritos e dados
✅ **ViaCEP**: Auto-preenchimento de endereços
✅ **Validações REGEX**: CPF, Email, Telefone, CEP
✅ **Modal Funcional**: Com carrossel de imagens
✅ **HTML5 Semântico**: Zero "divite", tags apropriadas
✅ **CSS Puro**: Grid e Flexbox customizados
✅ **Modularização JS**: Separação de concerns

---

## 🧪 Testes Recomendados

1. **Testar Filtro**: Selecionar tipos, cidades, preços
2. **Testar Favoritos**: Clicar em "Favoritar" e recarregar página
3. **Testar Modal**: Abrir detalhes e navegar carrossel
4. **Testar Login**: Usar credenciais `corretor@savendas.com` / `123456`
5. **Testar Cadastro**: Preencher formulário e enviar (POST)
6. **Testar ViaCEP**: Digitar CEP e verificar auto-preenchimento
7. **Testar Responsividade**: Redimensionar janela

---

## 📝 Licença

MIT License - Desenvolvido por SA Incorporadora (2026)

---

## 👨‍💻 Autor

**Samuel Pro Player** - Desenvolvimento Full-Stack

---

## 🔗 Links Úteis

- [Bootstrap 5 Docs](https://getbootstrap.com/docs/5.0/)
- [jQuery Documentation](https://api.jquery.com/)
- [json-server](https://github.com/typicode/json-server)
- [ViaCEP API](https://viacep.com.br/)
- [SASS Documentation](https://sass-lang.com/documentation)

---

**Projeto completo com todos os requisitos acadêmicos (RA1-RA5, IDs 01-24) implementados e funcionais! 🚀**
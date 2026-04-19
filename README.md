# 📝 Meu Blog Pessoal

Blog pessoal estático com visual editorial e elementos de rede social — curtidas, comentários e compartilhamento. Hospedado no **GitHub Pages**.

## ✨ Funcionalidades

- ✅ Tema claro / escuro (salvo no localStorage)
- ✅ Curtidas por post (salvas localmente)
- ✅ Comentários por post (salvos localmente)
- ✅ Modal de compartilhamento com cópia de link
- ✅ Compartilhar no Twitter/X e WhatsApp
- ✅ Share API nativa (mobile)
- ✅ Barra de progresso de leitura
- ✅ RSS Feed
- ✅ Design responsivo

## 📁 Estrutura do projeto

```
blog/
├── index.html          ← Página principal (lista de posts)
├── sobre.html          ← Página "Sobre"
├── rss.xml             ← Feed RSS
├── css/
│   └── style.css       ← Estilos principais
├── js/
│   └── main.js         ← Lógica interativa
└── posts/
    ├── primeiro-post.html   ← Template de post
    ├── segundo-post.html
    └── ...
```

## 🚀 Como publicar no GitHub Pages

1. Crie um repositório público no GitHub (ex: `meu-blog`)
2. Suba todos os arquivos para a branch `main`
3. Vá em **Settings → Pages → Source → Deploy from branch → main → / (root)**
4. Aguarde alguns minutos e acesse: `https://seuusuario.github.io/meu-blog`

> Se o repositório se chamar `seuusuario.github.io`, o blog ficará em `https://seuusuario.github.io/` diretamente.

## ✏️ Como criar um novo post

1. Copie o arquivo `posts/primeiro-post.html`
2. Renomeie para `posts/nome-do-seu-post.html`
3. Edite o conteúdo:
   - `<title>` e `<meta>` tags no `<head>`
   - `data-post-id` único no `<article>`
   - Conteúdo do artigo dentro de `.article-body`
   - `data-post` nos botões sociais (use o mesmo ID único)
4. Adicione o post na lista em `index.html`
5. Atualize o `rss.xml`

## 🎨 Personalização

No arquivo `css/style.css`, edite as variáveis CSS no `:root`:

```css
:root {
  --accent: #e8a838;  /* cor de destaque */
  --font-display: 'Playfair Display', serif;
  --font-body: 'DM Sans', sans-serif;
}
```

Para mudar o nome do blog, busque por `meu.blog` em todos os arquivos HTML.

## 📌 Notas

- Curtidas e comentários são salvos no **localStorage** do navegador (locais por dispositivo). Para comentários persistentes entre usuários, você precisará integrar um serviço como [Giscus](https://giscus.app/) (baseado em GitHub Discussions) ou [Utterances](https://utteranc.es/).
- O RSS feed precisa ter a URL base atualizada para o seu domínio real.

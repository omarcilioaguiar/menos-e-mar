# Guia: Como Criar Novos Posts

O seu blog agora utiliza o **Hugo** com o tema **Hextra**. O processo de publicação é baseado em arquivos Markdown.

## 1. Onde criar os arquivos
Os posts são organizados por idioma dentro da pasta `content/`:
*   **Português**: `content/pt/posts/`
*   **Inglês**: `content/en/posts/`

Para criar um novo post, basta criar um arquivo `.md` nessas pastas (ex: `meu-novo-post.md`).

## 2. Estrutura do Post (Frontmatter)
Todo post deve começar com um cabeçalho (chamado frontmatter) entre três traços `---`. Copie o modelo abaixo:

```markdown
---
title: "Título do seu Post"
description: "Um resumo curto para aparecer na busca do Google e listagens."
date: 2026-04-20
thumbnail: "https://url-da-sua-imagem.jpg"
categories: ["Produtividade"]
tags: ["foco", "minimalismo"]
---

Aqui começa o seu conteúdo em Markdown...
```

## 3. Campos Importantes
*   **title**: O título que aparece no topo do post e na lista estilo Akita.
*   **date**: Use o formato `YYYY-MM-DD`. O blog agrupa os posts automaticamente por este campo.
*   **thumbnail**: Link para a imagem (ou capa do YouTube) que aparece no card do post.
*   **categories**: Use para agrupar temas grandes (ex: Reviews, Filosofia).
*   **tags**: Palavras-chave menores.

## 4. Como ver as mudanças (Local)
Sempre que quiser ver como o post ficou antes de subir, rode no terminal:
```bash
./hugo server -D
```
Acesse `http://localhost:1313` no seu navegador. O site atualizará sozinho conforme você salva o arquivo `.md`.

## 5. Como enviar para o GitHub
Após terminar o post e salvar, use os comandos padrão do Git:
```bash
git add .
git commit -m "Publicação: Nome do Post"
git push origin main
```

---

> [!TIP]
> **Vídeos do YouTube**: Para inserir um vídeo, você pode colar o código de incorporação (iframe) do YouTube diretamente no Markdown, pois ativei o suporte a "Unsafe HTML" na configuração para você.

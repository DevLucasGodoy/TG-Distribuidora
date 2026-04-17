# Recorte para Refatoracao

Esta pasta contem apenas o necessario para refatorar o projeto legado com base no CodeIgniter.

## Incluido
- `index.php`, `router.php`, `.htaccess`
- `application/` (codigo da aplicacao, configs, controllers, models, views, helpers, language, etc.)
- `system/` (core do CodeIgniter usado pelo projeto)
- `assets/geral` e `assets/painel` (CSS/JS/fontes/imagens de interface)

## Excluido
- dados volateis e de ambiente: cache e logs
- uploads de conteudo do cliente (imagens e anexos)
- arquivos alternativos de entrada nao essenciais (`index0.php`, `index2.php`)

## Objetivo
- reduzir ruido para refatoracao
- manter o suficiente para executar e validar alteracoes de codigo

## Observacao
Se quiser, na proxima etapa eu removo ainda mais itens de front-end nao usados (analise por referencia em views) para deixar o recorte minimo absoluto.

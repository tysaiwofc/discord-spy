# Discord Spy

Use por sua conta e risco!

## Requisitos

- [NodeJS v17+](https://nodejs.org/en)

## Instalação

Para instalar esse projeto, basta utilizar o comando `npm install` na raíz do projeto e pronto!

## Como Funciona

Você irá conseguir ver imagens, mensagens, log de call, log de status e etc...

## Configuração

1 - Configure o arquivo `.env` na raíz do projeto.
 - TOKEN<String>
 - BLOCK_GUILDS<Array>
 - SPY_USERS<Array>

2 - Configure os Webhooks onde as logs serão enviadas.
 - Caminho: ./src/structures/Webhooks.js

## Como Iniciar


```bash
# Exemplo de comando para iniciar o projeto
node src/index.js
```

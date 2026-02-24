# Projeto FullStack - Gestão de Produção e Insumos

Este projeto é uma aplicação para **gerenciamento de insumos e otimização de produção industrial**.  
Permite controlar matérias-primas, produtos e calcular a melhor sugestão de produção com base no estoque disponível.

---

## **Tecnologias**

- **Back-end:** Node.js + Express  
- **Front-end:** Vue.js  
- **Banco de dados:** Em memória (para testes), pode ser substituído por Postgres, H2 ou outro relacional

---

## **Estrutura do Projeto**


/production (back-end)
├── index.js
└── package.json

/frontend (front-end)
├── src/
└── package.json


---

## **Como rodar o projeto localmente**

### **1️⃣ Back-end**

1. Abra o terminal na pasta do back-end (`production`):

```bash
cd production

Instale as dependências:

npm install

Inicie o servidor:

node index.js

O servidor estará rodando em: http://localhost:8080

Você pode testar usando Thunder Client, Postman ou curl.

2️⃣ Front-end

Abra outro terminal na pasta do front-end (frontend):

cd frontend

Instale as dependências:

npm install

Inicie o servidor de desenvolvimento:

npm run serve

O front-end estará rodando em: http://localhost:8081
 (ou a porta que o Vue indicar)

<h3 align="center">
  <strong>Eduzz Campaign Manager</strong>
</h3>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/LuizGTogni/eduzz-campaign-manager-js?color=%2304D361">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/LuizGTogni/eduzz-campaign-manager-js">
  
  <a href="https://github.com/LuizGTogni/eduzz-campaign-manager-js">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/LuizGTogni/eduzz-campaign-manager-js">
  </a>
  <a href="https://github.com/luizGTogni/eduzz-campaign-manager-js/blob/master/LICENSE">
    <img alt="License" src="https://img.shields.io/badge/license-MIT-blue">
  </a>
</p>

## 💻 Sobre o projeto

🧑‍🏫 Eduzz Campaign Manger - É uma plataforma de gerenciamento de campanhas de anúncios pagas para marketing digital, aonde você pode encontrar detalhes de quanto 
você investiu, faturou e outras informações.

Projeto desenvolvido durante um Bootcamp oferecido pela [Digital Innovation One](https://www.dio.me/en).
O NLW é uma experiência online com muito conteúdo prático, desafios e hacks onde o conteúdo fica disponível durante uma semana.

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- ReactJS
- SQL
- NodeJS
- RabbitMQ

## 🚀 Como executar o projeto

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com). 

Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/).

Precisa ter o [Docker](https://www.docker.com/).

E não esqueça de instalar o [NodeJS](https://nodejs.org/en/).

### 🧭 Rodando a aplicação web

```bash
# Clone este repositório
$ git clone https://github.com/luizGTogni/eduzz-campaign-manager-js/

# Acesse a pasta do projeto no seu terminal/cmd
$ cd eduzz-campaign-manager-js

# Rode o docker-Compose
$ docker-compose up -d

# Altere os arquivos "env" dos outros arquivos

# Instale as bibliotecas necessárias para o projeto front
$ cd front && yarn
$ yarn start

# Executando o servidor
$ cd api && yarn
$ yarn start

# Executando o Worker (Serviço de Mensageria)
$ cd worker && yarn
$ yarn start

# A aplicação será aberta na porta:3000 - acesse http://localhost:3000
```
## 😯 Como contribuir para o projeto

1. Faça um **fork** do projeto.
2. Crie uma nova branch com as suas alterações: `git checkout -b my-feature`
3. Salve as alterações e crie uma mensagem de commit contando o que você fez: `git commit -m "feature: My new feature"`
4. Envie as suas alterações: `git push origin my-feature`
> Caso tenha alguma dúvida confira este [guia de como contribuir no GitHub](https://github.com/firstcontributions/first-contributions)

## 📝 Licença

Este projeto esta sobe a licença MIT.

Feito por Luiz Gustavo Togni 👋🏽 [Entre em contato!](https://www.linkedin.com/in/luizgustavotogni/)

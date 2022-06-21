<div align='center'>

---
# Grupo WB Agenda de clientes 👨‍💻

---

Atividade relacionada a matéria de **Tecnica de programação** ministrada pelo professor **Gerson Penha.**

> Neste guia iremos configurar o ambiente de desenvolvimento, clonando o projeto e instalando suas dependências, além de mostrar como executá-lo.
> Ainda neste guia é possível encontrar uma breve explicação da estrutura das pastas adotada para a construção desse projeto.

### Links úteis (para antes de clonar o repositório)

- [Instalação das ferramentas](https://www.notion.so/Instala-o-das-ferramentas-405f3e8b014649cbb422dee6b5bd0535): como instalar o Node, NPM ou Yarn e o Visual Studio Code (tutoriais para Windows, MacOS e Linux)
- [Atualização (caso já tenha as ferramentas](https://www.notion.so/Atualiza-o-vers-es-diferentes-09abff4d88d44c459a7c7a925ad15bfa): se já passou pelo processo de instalação do Node, NPM e Yarn alguma vez, realize este tutorial para garantir as versões mais recentes das ferramentas (para Windows, MacOS e Linux)
- [Caso surja algum problema...](https://www.notion.so/Tive-problemas-e-agora-c67378e1319d4723a3211aad8eb987c6)

</div>

## Organização do Repositório

Pastas:
>   - 📁 node_modules/            -> Armazena as bibliotecas (dependências) usadas pelo projeto                            
>   - 📂 src/domain/controllers   -> Código fonte dos controladores (client, dashboard, order, product e service)          
>   - 📂 src/domain/models        -> Código fonte dos modelos (business, person, client, order, product e service)         
>   - 📁 src/domain/shared        -> Modelo e utilitários compartilhados, pode ser utilizado em outros locais da aplicação 
>   - 📁 src/domain/shared/utils  -> Código fonte dos utilitários (groupBy, Input, RandomId, Search, ValuesDefault)        
>   - 📁 src/domain/shared/models -> Modelo compartilhado, que pode ser utilizado em outros locais da aplicação            
>   - 📁 src/app/main             -> Arquivo responsável por executar a aplicação                                          
>   - 📁 package.json             -> Arquivo usado para gerenciar as dependências do projeto, scripts e versões            

## Clonando projeto

Com todas as ferramentas necessárias devidamente instaladas, baixe ou clone este repositório pelo terminal seguindo passo a passo descrito abaixo.

```bash

# Baixe este repositório ou clone pelo Git usando o comando:
$ git clone https://github.com/vbuarque/TPI-FA-TYPESCRIPT-WB.git

# Acesse a pasta do projeto
$ cd TPI-FA-TYPESCRIPT-WB

# Instale as dependências do projeto (são listadas no arquivo package.json)
$ npm install
# ou
$ yarn

# Para compilar o projeto você precisa ter o compilador TypeScript
$ npm install -g typescript
# ou pode usar npx ferramentas semelhantes se preferir executar a tsc partir de um node_modules pacote local .
$ npx tsc

# finalmente para executar o projeto
$ node out/app/main.js

```

Agora o projeto está sendo executado. Todas as operações serão feitas via CLI - Terminal

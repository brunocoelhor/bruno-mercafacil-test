# Desafio técnico Mercafacil - Desenvolvedor Backend


## Passos para execução do projeto

```
$ git clone https://github.com/brunocoelhor/bruno-mercafacil-test.git
```
### Após clonar o repositório entrar no diretório do projeto e executar os seguintes comandos no terminal

### Comando para subir as imagens do docker com o banco de dados Postgres e MySQL.
```
$ docker-compose up -d
```

### Comando para baixar as dependências necessárias para o funcionamento do projeto.
```
$ yarn
ou
$ yarn install
ou
$ npm install
```
### Comando para gerar o PrismaClient, é necessário gerar os clients dos dois databases.

```
yarn prisma generate --schema prisma/pg.prisma
yarn prisma generate --schema prisma/mysql.prisma
``` 

### Comando para a criação de tabelas e inclusão de dados no Postgres e MySQL. Neste comando é necessário colocar o nome da migration que está sendo criada, para identificação futura caso necessário.

É necessário remover os arquivos da criação da primeira migrate conforme informado na [documentação do prisma](https://www.prisma.io/docs/concepts/components/prisma-migrate/prisma-migrate-limitations-issues#you-cannot-automatically-switch-database-providers).
```
$ yarn prisma migrate dev --schema=./prisma/pg.prisma

$ rm -rf prisma/migrations/*

$ yarn prisma migrate dev --schema=./prisma/mysql.prisma
```
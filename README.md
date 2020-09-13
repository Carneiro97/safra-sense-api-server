# API Safra-Sense
## Bem-vindx, vamos conhecer um pouco dessa importante parte do projeto, a nossa Interface de Programação de Aplicações!

### Esta documentação se divide em duas partes.
* **Técnica**: Apresentando mais sobre as requisições e a execução da API;
* **Introdutória**: Para aqueles que vieram conhecer um pouco mais sobre a estrutura e organização de pastas deste projeto e sobre APIs de forma geral.

### Descrição: 
Essa é uma API Restful desenvolvida em NodeJs, consumindo um banco de dados MongoDB.
A API foi hospedada em um servidor utilizando o host **Umbler**, porém o início de seu desenvolvimento foi em um outro repositório (https://github.com/marcomarcassa/Safra-Sense) devido a especificações do host, mas não se preocupe, os arquivos são os mesmos!
Nesse repositório você encontrará nosso projeto, assim como os commits a partir do início do seu host até sua entrega no dia 13-09-2020. Já no repositório citado acima, os commits se iniciam desde o início do projeto.




---

### Documentação Técnica
Esta API utiliza de **POST** e **GET** requests para se comunicar e códigos de respostas **HTTP** para identificar status e erros. Para seus parâmetros e response trabalhamos com o tipo **body Json**.
Para a parte de autenticação, utilizamos **headers** e ***JWT***.



### Response Codes
* 200: Success
* 400: Bad request
* 401: Unauthorized
* 404: Cannot be found
* 405: Method not allowed
* 50X: Server Error

### Error Codes Details
* 100: Bad Request
* 110: Unauthorized
* 120: User Authenticaion Invalid
* 130: Parameter Error
* 140: Item Missing
* 150: Conflict
* 160: Server Error

## Endpoints
### Login
**Envio:** Suas credenciais.  **Resposta:** Um token com o qual você pode realizar futuras ações.

**Request:**

**POST** /usuario/login
Content-Type: application/json

```
{
    "usuarioLogin": "usuario",
    "senha": "usuario" 
}
```

**Successful Response:**

HTTP/1.1 200 OK
Content-Type: application/json

```
{
    "message": "Autenticado com sucesso!",
    "token": "seu-token-vem-aqui"
}
```

**Failed Response:**

HTTP/1.1 401 Unauthorized
Content-Type: application/json

```
{
    "message": "A autenticação falhou."
}
```

Para mais informações sobre nossas requests, faça o download de nossa Postman Collection que está no diretório **safra-sense-api-server**.

# Estrutura de arquivos
### Safra-Sense/DB.API
Aqui começamos nossa história!
Nesta pasta você encontra alguns arquivos de configuração e 2 arquivos **mega** importantes!

O nosso querido **app.js** controla nossas rotas e direciona as requests corretamente, enquanto nosso **server.js** define e monta nosso servidor!

### Safra-Sense/DB.API/api
Entrando aqui, a mágica começa a se revelar! Na pasta **api** temos a estrutura de solução de nossa API.


### enums
Seguindo para a pasta **enums**, temos essa importante ferramenta que, importada em nossas páginas, torna nossa vida mais fácil durante nosso coding! No caso, temos apenas um enum, mas é bom deixar algo preparado caso surjam mais ideias, não é mesmo ?

### midleware
Já na pasta **middleware**, presta atenção que esse é importante em... temos aqui nossa lógica de autenticação **JWT (Json-web-token)** de maneira independente. Com isso, conseguimos chamar nossa função de autenticação em diversas partes do nosso projeto e ainda facilitar nossa manutenção futura!
Dê uma conferida em como fazemos isso em nossas routes!

### models
Outra pasta bem importante é a pasta **models**! Afinal, o que seria de nossa aplicação sem os dados? Nela possuímos nossos objetos do banco de dados e os utilizamos em toda requisição de nossa aplicação!

### routes
Por último, mas não ~~jamais, nunca, até parece~~ menos importante, nossa **routes**! Lembra da pasta *api* que direciona nossas requests? É aqui que elas chegam. Aqui você encontra todas as nossas rotas e lógicas das requests. Praticamente, toda a nossa lógica implementada está inserida aqui, então presta atenção nela, viu?

Este documento foi criado como um meio de auxiliar aqueles que tem interesse em saber um pouco mais sobre a nossa API tanto de forma técnica quanto de uma forma mais ilustrativa.

*Para mais informações/dúvidas, deixo meu e-mail para contato: daniel.alexandre97@hotmail.com*

Abraços!

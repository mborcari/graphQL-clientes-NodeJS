var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
 
// Construct a schema, using GraphQL schema language

var schema = buildSchema(`
  type Client {
    username: String
    lastusername: String
    address: String
    phone: String
    email: String
  }
 
  type Query {
    clients : [Client],
    getClient(username: String): Client
  }

`);
 
// Maps userusername to content
var databaseClients = [
  {
      username : "Thor",
      lastusername : "Trovoada",
      address : "Rua São Paulo 1500, Belo Horizonte",
      phone : "31 - 3355-3355",
      email : "thor.trovoada@gmailfalso.com.br"
      },
  
   { 
     username :"Homem de Ferro",
      lastusername : "De Ferro",
      address : "Rua da Bahia 50, Belo Horizonte",
      phone : "31 - 2121-2121",
      email : "iron.man@gmailfalso.com.br"
    },

    { 
      username : "Hulk",
      lastusername : "Raivoso",
      address : "Rua Tubinanbás 5656, Belo Horizonte",
      phone : "31 - 9900-9900",
      email : "hulk.raivoso@gmailfalso.com.br"
    },

  { 
    username : "Capitão",
    lastusername : "América",
    address : "Rua Sputinik 25, Russia",
    phone : "+150 25 - 3355-3355",
    email : "capitao.america@gmailfalso.com.br"
  }
];

// This class implements the RandomDie GraphQL type
class Client {
  constructor({username, lastusername, address, phone, email}) {
    this.username = username;
    this.lastusername = lastusername;
    this.address = address;
    this.phone = phone;
    this.email = email;
  }
 
}
 
// The root resolvers
var root = {

  getClient : ({username}) => {

    var user_found = databaseClients.filter(user => user.username == username)[0];

    if (typeof user_found == "undefined") {
      throw new Error('User not found! ' + username);
    }
    return new Client(user_found);
  },

  clients : () => {
    return databaseClients;
  }
};
 
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
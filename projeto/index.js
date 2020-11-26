const customExpress =  require('./config/custom-express');
const app = customExpress();
const conexao = require('./infra/connection');
const Tables = require('./infra/Tables');

conexao.connect((erro) => {
    if(erro){
        console.log(`erro ao connectar no banco: ${erro}`);
    }
    else{
        console.log('connectado no banco agenda-petshop!');
        Tables.init(conexao);
        app.listen(3000, () => console.log('servidor rodando na porta 3000'));
    }
});






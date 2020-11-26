class Tables {
    init(connection){
        console.log('Tabela chamadas')
        this.conn = connection;

        this.criarAtendimentos();

    }

    criarAtendimentos(){
        const sql = `CREATE TABLE IF NOT EXISTS ATENDIMENTOS (
                id int not null auto_increment,
                cliente varchar(100) not null,
                pet varchar(20) null,
                servico varchar(20) not null,
                data datetime not null,
                status varchar(20) not null,
                observacoes text null,
                datacriacao datetime not null,
                PRIMARY KEY(id) ); `

        this.conn.query(sql, (erro) => {
            if(erro){
                console.log(erro);
            }
            else{
                console.log(`tabela criada`);
            }
        });
    }
}

module.exports = new Tables;    
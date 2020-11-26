const connection = require('../infra/connection');
const moment = require('moment');

class Atendimento {

    adiciona(atendimento, res){

        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteEhValido = atendimento.cliente.length >= 5

        const validacaoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos 5 caracteres'
            }
        ]

        const erros = validacaoes.filter(campo => !campo.valido)
        const exitemErros = erros.length;

        if(exitemErros){
            res.status(400).json(erros);
        }
        else{

            const atendimentoDatado = { ...atendimento, dataCriacao, data };

            const sql = `INSERT INTO ATENDIMENTOS SET ?`
            
            connection.query(sql, atendimentoDatado, (erro, resultado) => {
                if(erro){
                    res.status(400).json(erro);
                }
                else{
                    res.status(201).json(resultado);
                    console.log(sql)
                }
                
            });

        }
    }

    lista(res){

        const sql = `SELECT * FROM ATENDIMENTOS`

        connection.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro);
            }
            else{
                res.status(200).json(resultados)
            }
        });
    }

    buscaPorId(id, res){
        const sql = `SELECT * FROM ATENDIMENTOS WHERE id = ?`

        connection.query(sql, id, (erro, resultado) => {

            const atendimento = resultado[0];
            if(erro){
                res.status(400).json(erro);
            }
            else{
                res.status(200).json(atendimento);
            }
        });
    }

    altera(id, valores, res){
        
        const sql = `UPDATE ATENDIMENTOS SET ? WHERE id = ?`

        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        }        

        connection.query(sql, [valores, id], (erro, resultado) => {
            if(erro){
                res.status(400).json(erro);
            }
            else {
                res.status(200).json(resultado);
            }
        });

    }

    exclui(id, res){

        const sql = `DELETE FROM ATENDIMENTOS WHERE id =  ?`

        connection.query(sql, id, (erro, resultado) => {
            if(erro){
                res.status(400).json(erro);
            }
            else {
                res.status(200).json(resultado);
            }
        });
    }
}

module.exports = new Atendimento;
const express = require('express');
const config = require('../../knexfile');
const knex = require('knex')(config);

const tableRouter = express.Router();

tableRouter.get('/tablenames', async (req, res) => {
    const result = await knex('general').select('name');


    if (result) {
        res.status(200).json(result);
    } else {
        res.status(503).json({ message: 'Not working' });
    }


});

tableRouter.get('/table/:filename', async (req, res) => {
    const fileName = req.params.filename;


    const result = await knex('general').select('data').where({name: fileName});

    if (result) {
        res.status(200).json(result);
    } else {
        res.status(503).json({ message: 'Not working' });
    }


});

tableRouter.post('/table', async (req, res) => {
    const { body } = req;
    const { fileName, tableData } = body;

    const result = await knex('general').insert({
        name: fileName,
        data: JSON.stringify(tableData)
    });



    for(let ind=8; ind<tableData.length; ind++){
        if(!(tableData[ind]['Название банка'].toString().includes('КЛАСС'))){
            let resultInSaldo = await knex('insaldo').insert({
                account: tableData[ind]['Название банка'].toString(),
                assets: tableData[ind]['__EMPTY'].toString(),
                liabilities: tableData[ind]['__EMPTY_1'].toString(),
                excelname: fileName
            });

            let resultCashFlow = await knex('cashflow').insert({
                account: tableData[ind]['Название банка'].toString(),
                debit: tableData[ind]['__EMPTY_2'].toString(),
                credit: tableData[ind][' '].toString(),
                excelname: fileName
            });

            let resultOutSaldo = await knex('outsaldo').insert({
                account: tableData[ind]['Название банка'].toString(),
                assets: tableData[ind]['__EMPTY_3'].toString(),
                liabilities: tableData[ind]['__EMPTY_4'].toString(),
                excelname: fileName
            });
        }
    }

    if (result) {
        res.status(200).json(table);
    } else {
        res.status(503).json({ message: 'Not working' });
    }


});


module.exports = tableRouter;
const axios = require('axios');
const XLSX = require('xlsx');

let workbook = XLSX.readFile('Planilha_CNPJ.xlsx');
let sheet_name_list = workbook.SheetNames;
let df = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

let cnpjs = df.map(row => row.CNPJ);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchCNPJData(cnpjs) {
    let results = [];
    for (let i = 0; i < cnpjs.length; i++) {
        let cnpj = cnpjs[i];
        try {
            let response = await axios.get(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`);
            console.log(`Status da resposta para o CNPJ ${cnpj}: ${response.status}`);
            let data = response.data;
            results.push({
                NOME: data.nome || 'N/A',
                FANTASIA: data.fantasia || 'N/A',
                PORTE: data.porte || 'N/A',
                LOGRADOURO: data.logradouro || 'N/A',
                MUNICIPIO: data.municipio || 'N/A',
                BAIRRO: data.bairro || 'N/A',
                UF: data.uf || 'N/A',
                CEP: data.cep || 'N/A',
                EMAIL: data.email || 'N/A',
                TELEFONE: data.telefone || 'N/A',
            });
        } catch (error) {
            console.log(`Erro ao buscar o CNPJ ${cnpj}: ${error.response.status}`);
        }
        if ((i + 1) % 3 === 0) {
            await sleep(70000);
        }
    }
    return results;
}
fetchCNPJData(cnpjs).then(results => {
    results = results.filter(result => result !== null);
    
    df = df.concat(results);

    let new_workbook = XLSX.utils.book_new();
    let new_worksheet = XLSX.utils.json_to_sheet(df);
    XLSX.utils.book_append_sheet(new_workbook, new_worksheet, 'Sheet1');
    XLSX.writeFile(new_workbook, 'Planilha_CNPJ.xlsx');
});
import pandas as pd
import http.client
import json

df = pd.read_excel('Planilha_CNPJ.xlsx')
cnpjs = df['CNPJ']
headers = {'Accept': "application/json"}

dados = {'NOME': [], 'FANTASIA': [], 'PORTE': [], 'LOGRADOURO': [], 'MUNICIPIO': [], 'BAIRRO': [], 'UF': [], 'CEP': [], 'EMAIL': [], 'TELEFONE': []}

for cnpj in cnpjs:
    conn = http.client.HTTPSConnection("www.receitaws.com.br")
    conn.request("GET", "/v1/cnpj/{}".format(cnpj), headers=headers)
    response = conn.getresponse()
    data = response.read()
    
    print(f'Status da resposta para o CNPJ {cnpj}: {response.status}')
    data = json.loads(data.decode('utf-8'))
    
    dados['NOME'].append(data.get('nome', 'N/A'))
    dados['FANTASIA'].append(data.get('fantasia', 'N/A'))
    dados['PORTE'].append(data.get('porte', 'N/A'))
    dados['LOGRADOURO'].append(data.get('logradouro', 'N/A'))
    dados['MUNICIPIO'].append(data.get('municipio', 'N/A'))
    dados['BAIRRO'].append(data.get('bairro', 'N/A'))
    dados['UF'].append(data.get('uf', 'N/A'))
    dados['CEP'].append(data.get('cep', 'N/A'))
    dados['EMAIL'].append(data.get('email', 'N/A'))
    dados['TELEFONE'].append(data.get('telefone', 'N/A'))

df_novo = pd.DataFrame(dados)
df_final = pd.concat([df, df_novo], axis=1)

df_final.to_excel('Planilha_CNPJ_Atualizada.xlsx', index=False)

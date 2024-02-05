# Atualização de Dados de CNPJ - Python e JavaScript

Este repositório contém dois scripts, um em Python e outro em JavaScript, projetados para automatizar a atualização de informações cadastrais de empresas através da API pública do site Receitaws. Ambos os scripts leem um arquivo Excel contendo uma lista de CNPJs, consultam a API para obter detalhes como nome, fantasia, porte, endereço, e outros, e finalmente, atualizam uma nova planilha Excel com essas informações.

## Python Script
### Funcionamento
1. #### Leitura de Dados:
     - Carrega uma planilha Excel ('Planilha_CNPJ.xlsx') contendo os CNPJs a serem atualizados.
2. ### Consulta à API Receitaws:
      - Itera sobre a lista de CNPJs e realiza requisições à API para obter informações detalhadas.
      - Aguarda um intervalo de 60 segundos a cada três consultas para respeitar limites de uso da API.
3.  ### Atualização dos Dados:
     - Coleta e armazena os dados obtidos da API em um dicionário.
5. ### Criação da Nova Planilha:
      - Combina os dados originais do CNPJ com as informações atualizadas.
      - Salva a nova planilha Excel ('Planilha_CNPJ_Atualizada.xlsx').
  
## JavaScript Script
### Funcionamento
1. #### Leitura de Dados:
     - Utiliza a biblioteca xlsx para ler a planilha Excel ('Planilha_CNPJ.xlsx') e extrair os CNPJs.
2. ### Consulta à API Receitaws:
      - Utiliza a biblioteca axios para realizar requisições assíncronas à API para obter informações detalhadas.
      - Aguarda um intervalo de 70 segundos a cada três consultas para respeitar limites de uso da API.
3.  ### Atualização dos Dados:
     - Coleta e armazena os dados obtidos da API em um array.
5. ### Criação da Nova Planilha:
      - Combina os dados originais do CNPJ com as informações atualizadas.
      - Utiliza a biblioteca xlsx para criar uma nova planilha e salva o arquivo ('Planilha_CNPJ.xlsx').

## Como Utilizar
1. #### Pré-requisitos:
     - Para o script Python, instale as dependências necessárias utilizando o comando: *pip install pandas.*
     - Para o script JavaScript, instale as dependências utilizando o comando: *npm install axios xlsx.*
2. ### Execução:
      - Execute o script Python *'atualizacao_cnpj.py'* para o script Python.
      - Execute o script JavaScript para o script JavaScript.
3.  ### Resultado:
     - Uma nova planilha Excel será gerada ('Planilha_CNPJ_Atualizada.xlsx') com as informações atualizadas.

## Observações
- Certifique-se de respeitar os limites de uso da API para evitar bloqueios.
- Os scripts aguardam intervalos específicos entre as consultas para evitar atingir o limite de requisições da API.

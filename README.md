# Dados das Eleições - Base dos Dados

## A visualização

A imagem a seguir mostra a visualização final criada para esse trabalho. Ao longo do README e dos notebooks deste repositório são fornecidos maiores detalhes do processo de sair dos dados até a visualização. 

<img src="images/viz_final.png" /> 

Toda a implementação da visualização foi desenvolvida em D3.js e pode ser encontrada no link: [https://observablehq.com/d/0dc3125f0d7dc851](https://observablehq.com/d/0dc3125f0d7dc851). Os códigos da visualização também podem ser encontrados na pasta `code/viz` deste repositório. Vizualizações auxiliares foram criadas no processo de entendimento dos dados. Estas foram criadas utilizando a biblioteca `plotly` e se encontram nos próprios notebooks.

## Base dos Dados

Os dados foram coletados diretamente do `datalake` do projeto Base dos Dados. O objetivo foi usar os dados das eleições para mostrar um perfil das candidaturas das câmaras municipais do estado de Sergipe nos últimos 20 anos. O enfoque foi mostrar aspectos relacionados ao gênero das pessoas candidatas e eleitas. A consulta utilizada foi a seguinte: 

```sql 
SELECT 
    b1.ano, b2.sigla_uf, b2.id_municipio, b3.nome as nome_municipio, b1.tipo_eleicao, 
    b1.id_candidato_bd, b1.nome_urna, b1.sigla_partido, 
    b1.cargo, b1.situacao, b2.resultado, b2.votos, b1.genero, b1.raca, b1.idade
FROM
    `basedosdados.br_tse_eleicoes.candidatos` b1,
    `basedosdados.br_tse_eleicoes.resultados_candidato` b2
INNER JOIN 
    `basedosdados.br_bd_diretorios_brasil.municipio` b3
ON 
    b3.id_municipio = b1.id_municipio
WHERE 
  b1.id_candidato_bd = b2.id_candidato_bd and 
  b1.ano = b2.ano and b2.sigla_uf = 'SE' and 
  b2.cargo = 'vereador'
ORDER BY 
    b1.ano, b1.id_candidato_bd
```

A consulta consulta dados de 3 tabelas: 

* `basedosdados.br_tse_eleicoes.candidatos`: utilizada para pegar a lista de candidatos que concorreram as eleições com as informações pessoais, como gênero, por exemplo.
* `basedosdados.br_tse_eleicoes.resultados_candidato`: utilizada para coletar os resultados obtidos pelos candidatos nas eleições. É nessa tabela que indica se a pessoa foi eleita ou não.
* `basedosdados.br_bd_diretorios_brasil.municipio`: utilizada para pegar os nomes dos municípios.

## Processamento e Análise dos Dados 

O processamento dos dados está no arquivo: `code/ProcessarDados.ipynb`. Neste documento é datalhado e executado todo processo de coleta e processamento para separar as informações de interesse para construção das visualizações. 

No documento `code/VisualizacaoDosDados.ipynb` é feita uma análise dos dados juntamente com algumas visualizações auxiliares que ajudam no entendimento das informações para a construção da visualização final. 

## Visualização dos Dados 

A visualização final foi construída utilizando a biblioteca d3.js. O código foi construído diretamente em notebooks do ObservableHQ, mas os códigos foram inseridos nesse repositório e a visualização pode ser vista também na pasta `code/viz`. Para tal, basta abrir o arquivo `index.html` no navegador. 

## Sobre mim

Sou brasileiro, nordestino e sergipano. Possuo mestrado em ciência da computação e atualmente atuo como professor dos cursos de computação da Universidade Tiradentes. Tenho interesse em projetos de pesquisa que envolvam análise de dados abertos, visualização de dados e machine learning. Acredito que a computação pode e deve ser utilizada em prol da sociedade. Atualmente coordeno o projeto Dados Abertos Sergipe (https://dadosabertossergipe.data2learning.com/).

Minhas redes:

* Github: https://github.com/adolfoguimaraes
* Twitter: https://www.twitter.com/adolfoguimaraes
* Instagram: https://www.instagram.com/profadolfoguimaraes

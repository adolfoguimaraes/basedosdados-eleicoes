# Dados das Eleições - Base dos Dados

## A visualização

A imagem a seguir mostra a visualização final criada para esse trabalho. Ao longo do README e do notebook na pasta `code` deste repositório são fornecidos maiores detalhes do processo de como foi sair dos dados coletados e chegar nesta visualização. 

<img src="images/viz_final.png" /> 

Toda a implementação da visualização foi desenvolvida em `D3.js` e pode ser encontrada no link: [https://observablehq.com/@adolfoguimaraes/basedosdados-eleicoes](https://observablehq.com/@adolfoguimaraes/basedosdados-eleicoes). Os códigos da visualização também podem ser encontrados na pasta `code/viz` deste repositório, onde se encontra instruções de como rodar para visualiza-las a partir deste código. Vizualizações auxiliares foram criadas no processo de entendimento dos dados. Neste caso, foi utilizada a biblioteca `plotly`.

## Base dos Dados

Os dados foram coletados diretamente do `datalake` do projeto Base dos Dados. O objetivo foi usar os dados das eleições para mostrar um perfil das candidaturas das câmaras municipais do estado de Sergipe nos últimos 20 anos. O enfoque foi mostrar aspectos relacionados ao gênero das pessoas candidatas e eleitas com alguns recortes da capital e dos demais municípios. 

A consulta utilizada foi a seguinte: 

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

São utilizados dados de 3 tabelas: 

* `basedosdados.br_tse_eleicoes.candidatos`: utilizada para pegar a lista de candidatos que concorreram as eleições com as informações pessoais, como gênero, por exemplo.
* `basedosdados.br_tse_eleicoes.resultados_candidato`: utilizada para coletar os resultados obtidos pelos candidatos nas eleições. É nessa tabela que indica se a pessoa foi eleita ou não.
* `basedosdados.br_bd_diretorios_brasil.municipio`: utilizada para pegar os nomes dos municípios.

## Processamento e visualização auxiliar dos Dados 

O processamento dos dados está no arquivo: `code/ProcessarDados.ipynb`. Neste documento é datalhado e executado todo processo de coleta e processamento para separar as informações de interesse para construção das visualizações. Ao longo da análise, foram criadas visualizações auxiliares que ajudam no entendimento dos dados para a construção da visualização final. 

## Visualização Final dos Dados 

A visualização final foi construída utilizando a biblioteca `D3.js`. O código foi construído diretamente em notebooks do [ObservableHQ](https://observablehq.com/@adolfoguimaraes/basedosdados-eleicoes), mas os códigos foram inseridos nesse repositório e a visualização pode ser vista também na pasta `code/viz`. Para tal, basta seguir as instruções contidas no README. A imagem em PNG da visualização está disponível na pasta `images`. Ao final do notebook de Processamento também é possível visualizar a mesma. 

A visualização é composta de 3 partes: 

* A primeira parte composta por `gráficos de barras` que ajudam a visualizar em mais detalhes a proporção de mulheres candidatas e eleitas ao longo dos últimos 20 anos. A opção de colocar essas informações em um mesmo sistema de eixos foi para facilitar a comparação. Associada a essa parte, foram colocados dois outros gráficos de barras para o agrupamento de raça. Os gráficos foram colocados de lado do gráfico principal para reforçar que é um recorte dos dados apresentados anteriormente. 
* A segunda parte é formada por um `Unit Chart`. Nesse tipo de gráfico, cada unidade representa uma informação dos dados. Nesse caso, cada quadrado é um candidato eleito para câmara municipal de Aracaju ordenados pelo total de votos. A proposta foi mostrar a posição em relação ao número de votos e ressaltar que em 2020 foi a primeira vez que uma mulher foir eleita como a candidata mais votada.
* Por fim, na terceira parte usei um `Scatter Plot` adapatado para dados categóricos no eixo Y. Isso permite verificar a posição de todos os municípios quando analisamos a % de mulheres eleitas. O objetivo foi mostrar que existe sim uma variação maior do que na média, mas ainda assim, as câmaras municipais se mantém majoritariamente formada por homens.

Ao longo da visualização foram adicionadas anotações e linhas para guiar o usuário no entendimento dos dados apresentados. As anotações tem o intuito de informar e facilitar a interpretação dos gráficos.

As cores escolhidas trabalham com um grau de contraste que permite diferencia-las entre si e destacar as informações de interesse. A combinação de cores foi testada para verificar se pessoas com alguma deficiência visual não conseguiriam distingui-las. O teste pode ser visto no site: https://projects.susielu.com/viz-palette?colors=[%22#d8b365%22,%22#5a6773%22,%22#7e8d9b%22]&backgroundColor=%22white%22&fontColor=%22black%22&mode=%22normal%22. Nenhum conflito foi encontrado entre as cores para diferentes tipos de deficiência visual.

Os arquivos de entrada para essas visualizações estão na pasta `output` e foram gerados no arquivo de Processamento dos Dados. Esses dados são carregados no ObervableHQ para alimentar as visualizações criadas. 
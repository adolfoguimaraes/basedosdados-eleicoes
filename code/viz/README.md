# Base dos Dados - Eleições

Visualização Final

Essa visualização foi criada diretamente no ObservableHQ utilizando `D3.js`. O código é todo em JavaScript e pode ser vizualizado no arquivo `0dc3125f0d7dc851@1189.js` ou acessado diretamente no notebook: https://observablehq.com/@adolfoguimaraes/basedosdados-eleicoes.

Se deseja visualizar no seu próprio navegador, basta rodar o comando a seguir nesta pasta: 

~~~sh
npx http-server
~~~

## Detalhando a visualização

A principal função é a `Chart` que cria toda visualização. Essa função chama as funções: 

* `BarChart`: para criar os gráficos de barra. 
* `BinChart`: para criar o gráfico de recorte de Aracaju. 
* `ScatterChar`: para criar o gráfico dos munícipios. 

Além disso, são utilizadas funções auxiliares para a criação de anotações e linhas. 

### Função Principal

```js
Chart = ({
  chartWidth = 1220,
  chartHeight = 1030,
  margin = { left: 20, top: 20, right: 0, bottom: 30 }
}) => {
  // Criação do SVG principal
  const svg = d3
    .create("svg")
    .attr("width", chartWidth)
    .attr("height", chartHeight)
    .attr("viewBox", [0, 0, chartWidth, chartHeight])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
    .style("background-color", "white");

  // Área total da visualização
  const allGraph = svg
    .append("g")
    .attr("id", "allGraph")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  //Área para o gráfico de barras do recorte

  const barSpaceExtra = allGraph
    .append("g")
    .attr("id", "barSpaceExtra")
    .attr("transform", `translate(${700},${80})`);

  BarChart({
    element: barSpaceExtra,
    data: data_vereadores_raca.filter((d) => d.ano === "2020"),
    x: "raca",
    y: "porcentagem",
    width: 350,
    height: 100,
    barMain: { color: colors.main, stroke: "#121212", opacity: 0.3 }
  });

  const barSpaceExtra2 = allGraph
    .append("g")
    .attr("id", "barSpaceExtra2")
    .attr("transform", `translate(${700},${250})`);

  BarChart({
    element: barSpaceExtra2,
    data: data_vereadores_eleitos_raca.filter((d) => d.ano === "2020"),
    x: "raca",
    y: "porcentagem",
    width: 350,
    height: 100,
    barMain: { color: colors.main, stroke: "#121212", opacity: 0.8 }
  });

  // Área para o gráfico de barras
  const barSpace = allGraph
    .append("g")
    .attr("id", "barSpace")
    .attr("transform", `translate(${0},${120})`);

  BarChart({
    element: barSpace,
    data: data_vereadores,
    data_aux: data_vereadores_eleitos,
    x: "ano",
    y: "porcentagem",
    width: 650,
    height: 250,
    barMain: { color: colors.main, stroke: "#121212", opacity: 0.3 },
    barAux: { color: colors.main, stroke: "#121212", opacity: 1 }
  });
  
  
  // Área para o Scatter Plot de receitas
  const scatterSpace = allGraph
    .append("g")
    .attr("id", "scatterSpace")
    .attr("transform", `translate(${500}, ${550})`);

  ScatterChart({
    element: scatterSpace,
    data: data_vereadores_eleitos_municipio_genero,
    x: "porcentagem",
    y: "ano",
    width: 600,
    height: 350,
    formatNumber: '.0%',
    mainColor: { color: colors.main, stroke: "#121212", opacity: 0.5 },
    highlightColor: { color: colors.secondary, stroke: "#121212", opacity: 0.5 }
  });
  

  // Área para o gráfico de bins
  const binSpace = allGraph
    .append("g")
    .attr("id", "binSpace")
    .attr("transform", `translate(${margin.left + 20}, ${500})`);

  const all_years = [...new Set(data_vereadores_eleitos_aju.map((d) => d.ano))];

  all_years.forEach((element, i) => {
    const bin = binSpace
      .append("g")
      .attr("transform", `translate(${0},${i * 70})`);

    const data_filter = data_vereadores_eleitos_aju.filter(
      (d) => d["ano"] === element
    );

    BinChart({
      element: bin,
      data: data_filter,
      field: "ano",
      value: element,
      countField: "genero",
      countValue: "feminino",
      mainColor: { color: colors.main, stroke: "#121212", opacity: 0.8 },
      highlightColor: { color: colors.secondary, stroke: "#121212", opacity: 1 }
    });
  });

  // Footer
  const foot_chart  = allGraph.append("g")
       .attr("transform", `translate(${chartWidth - 30}, ${chartHeight - 55})`)
  
  foot_chart.append("text")
      .attr("id", "chartFoot")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("text-anchor", "end")
      .attr("dy", 25)
      .attr("opacity", 0.8)
      .attr("fill", colors.secondaryText)
      .text("Fonte: Dados das eleições disponibilizados pelo site: basedosdados.org.")

  //Annotations

  Annotations({
    element: allGraph,
    text:
      "Enquanto a proporção de mulheres candidatas a vereadoras em Sergipe quase duplicou em 20 anos. Esse aumento não foi visto na proporção de mulheres eleitas.",
    x: 0,
    y: margin.top,
    width: 320,
    color: colors.mainText,
    anchor: "start",
    fontSize: 20,
    fontWeight: 'bold'
  });

  Annotations({
    element: barSpace,
    text:
      "No ano 2000, 19% das candidaturas foram de mulheres. Já dentre as pessoas eleitas, esse número foi de 17%",
    x: 0,
    y: 10,
    width: 190,
    color: colors.secondaryText,
    fontSize: 13
  });

  Annotations({
    element: barSpace,
    text:
      "Em 2020, apesar do aumento para 34% na proporção de mulheres candidatas, dentre as pessoas eleitas, apenas 16% eram mulheres.",
    x: 670,
    y: 300,
    width: 220,
    color: colors.secondaryText,
    anchor: "end",
    fontSize: 13
  });

  Annotations({
    element: barSpaceExtra,
    text:
      "Dentre as mulheres candidatas, a maioria está distribuída entre as raças branca e parda.",
    x: 0,
    y: 0,
    width: 150,
    color: colors.secondaryText,
    anchor: "start",
    fontSize: 13
  });

  Annotations({
    element: barSpaceExtra2,
    text:
      "A proporção de mulheres pretas cai quase pela metade quando se compara a % de mulheres eleitas com a % de candidatas.",
    x: 300,
    y: 10,
    width: 150,
    color: colors.secondaryText,
    anchor: "start",
    fontSize: 13
  });

  Annotations({
    element: binSpace,
    text:
      "Fazendo um recorte da capital Aracaju, é possível ver que a proporção de mulheres eleitas não mudou muito nos últimos 20 anos.",
    x: -30,
    y: -60,
    width: 220,
    color: colors.mainText,
    anchor: "start",
    fontSize: 16,
    fontWeight: 'bold'
  });

  Annotations({
    element: binSpace,
    text:
      "Em 20 anos, a primeira vez que uma mulher foi a pessoa mais votada nas eleições para câmara municipal de Aracaju foi em 2020.",
    x: -25,
    y: 420,
    width: 220,
    color: colors.secondaryText,
    anchor: "start",
    fontSize: 13
  });

  Annotations({
    element: scatterSpace,
    text:
      "Em 20 anos, apenas em 3 ocasiões as câmaras municipais do estado foram compostas majoritariamente por mulheres.",
    x: 460,
    y: -50,
    width: 160,
    color: colors.secondaryText,
    anchor: "start",
    fontSize: 13
  });

  Annotations({
    element: scatterSpace,
    text:
      "Em 2020, 8 municípios não elegeram nenhuma mulher para compor a câmara municipal. É o menor valor em 20 anos.",
    x: -30,
    y: 400,
    width: 270,
    color: colors.secondaryText,
    anchor: "start",
    fontSize: 13
  });

  Annotations({
    element: scatterSpace,
    text:
      "Quando se olha para os municípios, há uma maior variação na presença de mulheres nas câmeras municipais do estado. No entanto, as composições são majoritamente masculinas.",
    x: -50,
    y: -55,
    width: 280,
    color: colors.secondary,
    anchor: "start",
    fontSize: 16,
    fontWeight: 'bold'
  });

  

  // Lines

  Lines({ element: barSpaceExtra, y2: 120, positionX: -10, positionY: -10 });
  Lines({ element: barSpaceExtra2, y2: 120, positionX: -10, positionY: -10 });
  Lines({ element: barSpace, x2: 90, positionX: 605, positionY: -15 });
  Lines({ element: barSpace, x2: 80, positionX: 615, positionY: 140 });
  Lines({ element: barSpace, y2: 20, positionX: 592, positionY: 270}); 
  Lines({ element: binSpace, y2: 70, positionX: -35, positionY: 360})
  Lines({ element: scatterSpace, y2: 100, positionX: -42, positionY: 315})
  Lines({ element: barSpace, y2: 250, positionX: -10, positionY: 20})
  Lines({ element: barSpace, x2: 53, positionX: -10, positionY: 265})

  return svg.node();
}

```
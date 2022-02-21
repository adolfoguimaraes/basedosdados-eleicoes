export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["total_vereadores_por_ano_genero.csv",new URL("./files/3d4745cbcf0cd30dadd6447d9ac8af64a582118159f0fe6acdebe547df075b53c0f4cadd17fb4b3aa65e842cca2148afd40186c05829fff17fb7d9232f49e7e7",import.meta.url)],["total_vereadores_eleitos_por_ano_genero.csv",new URL("./files/bafdfb7af176d403307245f39016eea1cf3b50576967f055bae21fc144865c1acb70994fd8ccda7a9b9f8526e34fc8a80d1953f274d891a907e0123a20dd2467",import.meta.url)],["lista_vereadores_eleitos_aracaju_por_ano.csv",new URL("./files/5f9d94f9c440266c410924a77398fb5878e931a9034a785c6123dadbf51a7f4ab8f90775ab618816985c16abe57d6b0bb2136b57b1bb99aea4bdde968c5e0ae0",import.meta.url)],["total_vereadores_por_ano_genero_raca.csv",new URL("./files/9bca4d23f9489b050a7d71b86a9325cde8979940b0c4b4f7b49914820fdcda92dc64a3cd22226b9a520c11c22d964ae3531da73b051a7e1de473cf34569b06c0",import.meta.url)],["total_vereadores_eleitos_por_ano_genero_raca.csv",new URL("./files/5bf5b7f8b36ef4caa11938df5c2aebb49be2f7230e169c4d77df139a7bd999383273ace7d6b6aebb1745906dcdae38c97e6810f3ba64076766523d3ed43198f8",import.meta.url)],["total_vereadores_por_ano_municipio_genero@1.csv",new URL("./files/ce5b70bfc32291610a86a9320dc128a03e5ce76e4f0a0b61adc87f48cac809c003ec451c1fca33663eac546d77c4767e9a4a5c7514df2f728dc8d70acd90a7a1",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Base dos Dados - Eleições`
)});
  main.variable(observer()).define(["Chart"], function(Chart){return(
Chart({})
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Visualizações`
)});
  main.variable(observer("colors")).define("colors", function(){return(
new Object(
  {
    main: '#D8B365',
    secondary: '#5a6773',
    mainText: '#5a6773',
    secondaryText: '#7e8d9b'
  }
)
)});
  main.variable(observer("Chart")).define("Chart", ["d3","BarChart","data_vereadores_raca","colors","data_vereadores_eleitos_raca","data_vereadores","data_vereadores_eleitos","ScatterChart","data_vereadores_eleitos_municipio_genero","data_vereadores_eleitos_aju","BinChart","Annotations","Lines"], function(d3,BarChart,data_vereadores_raca,colors,data_vereadores_eleitos_raca,data_vereadores,data_vereadores_eleitos,ScatterChart,data_vereadores_eleitos_municipio_genero,data_vereadores_eleitos_aju,BinChart,Annotations,Lines){return(
({
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
)});
  main.variable(observer("Lines")).define("Lines", function(){return(
({element, positionX=0, positionY=0, x1 = 0, x2 = 0, y1 = 0, y2 = 0}) => {

  const line = element.append("g")
    .attr("transform", `translate(${positionX},${positionY})`)

  line.append("line")
    .attr("id", "lineAnnotation")
    .attr("x1", x1)
    .attr("x2", x2)
    .attr("y1", y1)
    .attr("y2", y2)
    .style("stroke", "grey")
    .style("stroke-width", 1)
    .style("opacity", 0.8)
    .style("stroke-dasharray","5,5")

  
}
)});
  main.variable(observer("Annotations")).define("Annotations", ["wrap_text","d3"], function(wrap_text,d3){return(
({
  text,
  element,
  x = 0,
  y = 0,
  width = 150,
  color = "#000000",
  anchor = 'start',
  fontSize = 12,
  fontWeight = 'normal'
}) => {

  const annotation = element.append("g")
    .attr("transform", `translate(${x},${y})`)

  
  annotation.append("text")
    .attr("font-family", "sans-serif")
    .attr("font-size", fontSize)
    .attr("text-anchor", anchor)
    .attr("font-weight", fontWeight)
    .attr("fill", color)
    .text(text);

  annotation.selectAll("text")
    .each(function(d, i) { wrap_text(d3.select(this), width ,0, 0, 0) });
  
}
)});
  main.variable(observer("BarChart")).define("BarChart", ["d3"], function(d3){return(
function BarChart({
  data,
  data_aux,
  element,
  width = 500,
  height = 250,
  x,
  y,
  barMain = {color: '#708090', stroke: '#121212', opacity: 0.3},
  barAux = {color: '#708090', stroke: '#121212', opacity: 0.8}
      
            
}) {
  const X = d3.map(data, (d) => d[x]);
  const Y = d3.map(data, (d) => d[y]);

  const xDomain = new d3.InternSet(X);
  const yDomain = [0, d3.max(Y)];

  const xRange = [0, width];
  const yRange = [height, 0];

  const xScale = d3.scaleBand(xDomain, xRange).padding(0.1);
  const yScale = d3.scaleLinear(yDomain, yRange);
  const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
  const yAxis = d3.axisLeft(yScale).ticks(height / 40, ".0%");

  const bars = element
    .append("g")
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("fill", barMain.color)
    .attr("stroke", barMain.stroke)
    .attr("stroke-width", 1)
    .attr("x", (d) => xScale(d[x]))
    .attr("y", (d) => yScale(d[y]))
    .attr("height", (d) => yScale(0) - yScale(d[y]))
    .attr("width", data_aux ? xScale.bandwidth() - 20 : xScale.bandwidth())
    .attr("opacity", barMain.opacity);

  if (data_aux) {
    const bars_aux = element
      .append("g")
      .selectAll("rect")
      .data(data_aux)
      .join("rect")
      .attr("fill", barAux.color)
      .attr("stroke", barAux.stroke)
      .attr("stroke-width", 1)
      .attr("x", (d) => xScale(d[x]) + 10)
      .attr("y", (d) => yScale(d[y]))
      .attr("height", (d) => yScale(0) - yScale(d[y]))
      .attr("width", xScale.bandwidth() - 20)
      .attr("opacity", barAux.opacity);
  }

  element
    .append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 11)
    .attr("text-anchor", "middle")
    .selectAll("text")
    .data(data)
    .join("text")
    .attr("x", (d) => xScale(d[x]))
    .attr("y", (d) => yScale(d[y]))
    .attr("dx", data_aux ? (xScale.bandwidth() - 20) / 2 : xScale.bandwidth() / 2)
    .attr("dy", -10)
    .text((d) => d3.format(".1%")(d[y]));

  if (data_aux) {
    element
      .append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 11)
      .attr("text-anchor", "middle")
      .attr("font-weight", "bold")
      .attr("fill", "#FFFFFF")
      .selectAll("text")
      .data(data_aux)
      .join("text")
      .attr("x", (d) => xScale(d[x]) + 10)
      .attr("y", (d) => yScale(d[y]))
      .attr("dx", (xScale.bandwidth() - 20) / 2)
      .attr("dy", +15)
      .text((d) => d3.format(".1%")(d[y]));
  }

  element.append("g").attr("transform", `translate(0,${height})`).call(xAxis);
}
)});
  main.variable(observer("BinChart")).define("BinChart", ["d3"], function(d3){return(
function BinChart({
  data,
  element,
  field,
  value,
  countField,
  countValue,
  breakPoint = 12,
  size = 15,
  mainColor = { color: '#708090', stroke: "#121212", opacity: 0.3 },
  highlightColor = { color: '#708090', stroke: "#121212", opacity: 0.8 },
}) {
  const rectSpace = element.append("g");

  var row = 0;
  var column = 0;
  const delta = size + 5;
  const space = 15;

  rectSpace
    .append("text")
    .attr("font-family", "sans-serif")
    .attr("font-size", 13)
    .attr("text-anchor", "end")
    .attr("fill", "#000000")
    .attr("dy", delta)
    .text(value);

  var totalCount = 0;
  var partialCount = 0;

  data.forEach((d, i) => {
    if (i % breakPoint === 0) {
      row += 1;
      column = 0;
    }

    totalCount += 1;

    if (d[countField] === countValue) partialCount += 1;

    if (i === 0 || i == data.length - 1) {
      rectSpace
        .append("text")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "middle")
        .attr("fill", "#000000")
        .attr("x", column * delta + space + size / 2)
        .attr("y", (row - 1) * delta + (row === 1 ? -5 : size + 12))
        .text(i + 1 + "º");
    }
    rectSpace
      .append("rect")
      .attr("fill", d.genero === "feminino" ? highlightColor.color : mainColor.color)
      .attr("stroke", "#121212")
      .attr("stroke-width", 1)
      .attr("x", column * delta + space)
      .attr("y", (row - 1) * delta)
      .attr("height", size)
      .attr("width", size)
      .attr("opacity", d.genero === "feminino" ? highlightColor.opacity : mainColor.opacity);

    column += 1;
  });

  rectSpace
    .append("text")
    .attr("font-family", "sans-serif")
    .attr("font-size", 18)
    .attr("font-weight", 'bold')
    .attr("text-anchor", "start")
    .attr("fill", highlightColor.color)
    .attr("dx", space + breakPoint * delta + 5)
    .attr("dy", delta)
    .text(d3.format(".0%")(partialCount / totalCount));
}
)});
  main.variable(observer("ScatterChart")).define("ScatterChart", ["d3"], function(d3){return(
function ScatterChart({
  data,
  element,
  width = 600,
  height = 150,
  x,
  y,
  formatNumber = ".0s",
  mainColor = { color: "#708090", stroke: "#121212", opacity: 0.3 },
  highlightColor = { color: "#708090", stroke: "#121212", opacity: 0.8 }
}) {
  const data_filtered = data.filter((d) => d);

  const X = d3.map(data_filtered, (d) => d[x]);
  const Y = d3.map(data_filtered, (d) => d[y]);

  const xDomain = [0, d3.max(X)];
  const yDomain = new d3.InternSet(Y);

  const xRange = [0, width];
  const yRange = [0, height];

  const xScale = d3.scaleLinear(xDomain, xRange);
  const yScale = d3.scaleBand(yDomain, yRange);

  const xAxis = d3.axisBottom(xScale).ticks(width / 80, formatNumber);
  const yAxis = d3.axisLeft(yScale).tickSizeOuter(0);

  element.append("g").attr("transform", `translate(0,${height})`).call(xAxis);

  const yAxisObject = element
    .append("g")
    .attr("transform", `translate(0,0)`)
    .call(yAxis);

  yAxisObject
    .selectAll(".tick")
    .attr("stroke-opacity", 0.3)
    .attr("stroke-dasharray", "2,2")
    .selectAll("line")
    .attr("x2", width)
    .attr("x1", -5);

  yAxisObject.select(".domain").attr("stroke-opacity", 0);

  yAxisObject.selectAll("text").attr("font-size", 12);

  const line = element.append("g");

  line
    .append("line")
    .attr("x1", xScale(0.5))
    .attr("x2", xScale(0.5))
    .attr("y1", -30)
    .attr("y2", height)
    .style("stroke", "grey")
    .style("stroke-width", 1)
    .style("opacity", 0.8)
    .style("stroke-dasharray", "5,5");

  const circles = element
    .append("g")
    .selectAll("circle")
    .data(data_filtered)
    .join("circle")
    .attr("fill", (d) => d.porcentagem > 0.5 ? highlightColor.color : mainColor.color)
    .attr("stroke", "none")
    .attr("stroke-width", 1)
    .attr("r", 6)
    .attr("cx", (d) => xScale(d[x]))
    .attr("cy", (d) => yScale(d[y]) + yScale.bandwidth() / 2)
    .attr("opacity", (d) => d.porcentagem > 0.5 ? highlightColor.opacity : mainColor.opacity);

  const labels = element
    .append("g")
    .selectAll("text")
    .data(data_filtered.filter((d) => d.porcentagem > 0.5))
    .join("text")
    .attr("font-family", "sans-serif")
    .attr("font-size", 12)
    .attr("text-anchor", "middle")
    .attr("fill", highlightColor.color)
    .attr("x", (d) => xScale(d[x]))
    .attr("y", (d) => yScale(d[y]) + yScale.bandwidth() / 2 - 10)
    .text((d) => d.nome_municipio);
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Leitura dos Dados`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Todos os Vereadores`
)});
  main.variable(observer("data_vereadores_temp")).define("data_vereadores_temp", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("total_vereadores_por_ano_genero.csv").csv()
)});
  main.variable(observer("data_vereadores")).define("data_vereadores", ["data_vereadores_temp"], function(data_vereadores_temp)
{ 
  const data_ = data_vereadores_temp.filter(d => {return d.genero == 'feminino'}).map(d => {
    d.total_por_genero = +d.total_por_genero
    d.total = +d.total
    d.porcentagem = +d.porcentagem
    return d
  })

  return data_
  
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`### Vereadores Eleitos`
)});
  main.variable(observer("data_vereadores_eleitos_temp")).define("data_vereadores_eleitos_temp", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("total_vereadores_eleitos_por_ano_genero.csv").csv()
)});
  main.variable(observer("data_vereadores_eleitos")).define("data_vereadores_eleitos", ["data_vereadores_eleitos_temp"], function(data_vereadores_eleitos_temp)
{ 
  const data_ = data_vereadores_eleitos_temp.filter(d => {return d.genero == 'feminino'}).map(d => {
    d.total_por_genero = +d.total_por_genero
    d.total = +d.total
    d.porcentagem = +d.porcentagem
    return d
  })

  return data_
  
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`### Vereadores de Aracaju`
)});
  main.variable(observer("data_vereadores_eleitos_aju_temp")).define("data_vereadores_eleitos_aju_temp", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("lista_vereadores_eleitos_aracaju_por_ano.csv").csv()
)});
  main.variable(observer("data_vereadores_eleitos_aju")).define("data_vereadores_eleitos_aju", ["data_vereadores_eleitos_aju_temp"], function(data_vereadores_eleitos_aju_temp)
{
  const data_ = data_vereadores_eleitos_aju_temp.map(d => {
    d.votos = +d.votos
    d.idade = +d.idade
    d.ano = +d.ano 
    
    return d
  })

  return data_
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`### Vereadores por Raça - Todos`
)});
  main.variable(observer("data_vereadores_raca_temp")).define("data_vereadores_raca_temp", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("total_vereadores_por_ano_genero_raca.csv").csv()
)});
  main.variable(observer("data_vereadores_raca")).define("data_vereadores_raca", ["data_vereadores_raca_temp"], function(data_vereadores_raca_temp)
{ 
  const data_ = data_vereadores_raca_temp.filter(d => {return d.genero == 'feminino'}).map(d => {
    d.total_por_genero = +d.total_por_genero
    d.total = +d.total
    d.porcentagem = +d.porcentagem
    return d
  })

  return data_
  
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`### Vereadores por Raça - Eleitos`
)});
  main.variable(observer("data_vereadores_eleitos_raca_temp")).define("data_vereadores_eleitos_raca_temp", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("total_vereadores_eleitos_por_ano_genero_raca.csv").csv()
)});
  main.variable(observer("data_vereadores_eleitos_raca")).define("data_vereadores_eleitos_raca", ["data_vereadores_eleitos_raca_temp"], function(data_vereadores_eleitos_raca_temp)
{ 
  const data_ = data_vereadores_eleitos_raca_temp.filter(d => {return d.genero == 'feminino'}).map(d => {
    d.total_por_genero = +d.total_por_genero
    d.total = +d.total
    d.porcentagem = +d.porcentagem
    return d
  })

  return data_
  
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`### Vereadores por Gênero e Município`
)});
  main.variable(observer("data_vereadores_eleitos_municipio_genero_temp")).define("data_vereadores_eleitos_municipio_genero_temp", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("total_vereadores_por_ano_municipio_genero@1.csv").csv()
)});
  main.variable(observer("data_vereadores_eleitos_municipio_genero")).define("data_vereadores_eleitos_municipio_genero", ["data_vereadores_eleitos_municipio_genero_temp"], function(data_vereadores_eleitos_municipio_genero_temp)
{ 
  const data_ = data_vereadores_eleitos_municipio_genero_temp.filter(d => {return d.genero == 'feminino'}).map(d => {
    d.total_por_genero = +d.total_por_genero
    d.total = +d.total
    d.porcentagem = +d.porcentagem
    return d
  })

  return data_
  
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`## Funções de Suporte

`
)});
  main.variable(observer("wrap_text")).define("wrap_text", ["measure_width"], function(measure_width){return(
(text_element, max_width, line_height, dxText, dxAnnotation, unit = "em") => {
  // word parameters
  let words = text_element.text().split(/\s+/).reverse(),
      word,
      line = [],
      line_number = 0;
  
  // styling parameters
  const x = text_element.attr("x"),
        y = text_element.attr("y");
  if (!line_height) line_height = 1.1;
  
  // clear text_elements text
  text_element.text(null);
  
  // append first tspan element (to fill as we build the lines)
  let tspan = text_element.append("tspan")
    .attr("x", x)
    .attr("y", y)
    .attr("dy", text_element.attr("id") === 'titleAnnotation' ? '0.5em' : dxAnnotation);
  
  // loop through all words and make new lines when we exceed our max_width
  while (word = words.pop()) {
    line.push(word);
    tspan.text(line.join(" "));
    if (measure_width(tspan.text()) > max_width) {
      line.pop()
      tspan.text(line.join(" "));
      line = [word];
      tspan = text_element.append("tspan")
        .attr("x", dxText)
        .attr("y", y)
        .attr("dy", `${line_height}${unit}`)
        .text(word);
    }
  }
}
)});
  main.variable(observer("measure_width")).define("measure_width", function()
{
  const context = document.createElement("canvas").getContext("2d");
  return text => context.measureText(text).width;
}
);
  return main;
}

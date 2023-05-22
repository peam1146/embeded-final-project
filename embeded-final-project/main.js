import * as d3 from 'd3'
import {db,getData,writeUserData,readUserData} from './data.js';
const data = await getData(db);



(function() {
  
  (function() {
    var ANIM_DELAY, ANIM_DURATION, BAR_HEIGHT, COLORS, COLORS_G, DATA, H, INITIAL_WIDTH, M, MAX_VALUE, NAME, TOTAL_VALUE, W, container, g, highlight, highlightClear, host, oH, oW, percentScale, randomize, resize, svg, update, xScale, yScale;
    const lastData = [      {
      value: 0,
      desc: 'Dust',
      unit: 'ppm'
    }, {
      value: 0,
      desc: 'Humidity',
      unit: '%'
    }, {
      value: 0,
      desc: 'Temperature',
      unit: '°C'
    }, {
      value: 10,
      desc: 'Carbonmonoxide',
      unit: 'ppm'
    }]
    NAME = 'horizontal-bar';
    M = 0;
    COLORS = ['#eaa54b', '#66a1e2', '#8065e4', '#48cb80'];
    COLORS_G = ['#b5b5b5', '#8c8c8c', '#6b6b6b', '#565656'];
    DATA = [
      {
        value: 0,
        desc: 'Dust',
        unit: 'ppm'
      }, {
        value: 0,
        desc: 'Humidity',
        unit: '%'
      }, {
        value: 0,
        desc: 'Temperature',
        unit: '°C'
      }, {
        value: 0,
        desc: 'Carbonmonoxide',
        unit: 'ppm'
      }
    ];
    var dust = [

    ]
    var humi = [

    ]
    var temp = [

    ]
    var carb = [

    ]
    randomize = function(data) {
      var l = data.length;
      
      // console.log(data);
      dust=[];
      humi=[];
      temp=[];
      carb=[];
      var dustC =false;
      var humiC =false;
      var tempC =false;
      var carbC =false;
      
      var dustL = -1;
      var humiL = -1;
      var tempL = -1;
      var carbL = -1;
      for(var i = 0 ;i<l;i++){
        if(isNaN(data[i][0].value)||isNaN(data[i][1].value)||isNaN(data[i][2].value)||isNaN(data[i][3].value)){
        }
        else{
          //Change dust
          if(!dustC && dustL == -1){
            dustL = data[i][0].value;
          }
          else if(dustL!=data[i][0].value){
            dustC = true;
          }
          dust.push([560-i*(560/l),data[i][0].value])
  

          //Change Humid
          if(!humiC && humiL == -1){
            humiL = data[i][1].value;
          }
          else if(humiL!=data[i][1].value){
            humiC = true;
          }

          humi.push([560-i*(560/l),data[i][1].value])


  
        
          //Change Temp
          if(!tempC && tempL == -1){
            tempL = data[i][2].value;
          }
          else if(tempL!=data[i][2].value){
            tempC = true;
          }
          console.log('1',[560-i*(560/l),data[i][2].value])
          const t = [560-i*(560/l),data[i][2].value];
          console.log('2',[t[0],t[1]]);
          temp.push([t[0],t[1]])
          // console.log(temp);

  
        
          //Change CO
          if(!carbC && carbL == -1){
            carbL = data[i][3].value;
          }
          else if(carbL!=data[i][3].value){
            carbC = true;
          }
          
          carb.push([560-i*(560/l),data[i][3].value])
        }
      }
      
      if(!carbC){
        carb[carb.length-1][1] = carb[carb.length-1][1]+1
      }
      if(!humiC){
        humi[humi.length-1][1] = humi[humi.length-1][1]+1
      }
      if(!tempC){
        temp[temp.length-1][1] = temp[temp.length-1][1]+1
      }
      if(!dustC){
        dust[dust.length-1][1] = dust[dust.length-1][1]+1
      }
      
      DATA = data[0];
      return DATA;
      
    };
    function modifiedData(data){
      // const s Array.from(Object.values(data));
      // console.log(data);
      const lDATA = [];
      const last = Object.values(data)[Object.keys(data).length-1];
      // console.log(Object.keys(last).length);
      for(var i = 1; i <= 100;i++){
        if(Object.keys(last).length < i){
          lDATA.push([
            {
              value: 0,
              desc: 'Dust',
              unit: 'ppm'
            }, {
              value: 0,
              desc: 'Humidity',
              unit: '%'
            }, {
              value: 0,
              desc: 'Temperature',
              unit: '°C'
            }, {
              value: 0,
              desc: 'Carbonmonoxide',
              unit: 'ppm'
            }
          ])
        }
        else{
          const lastten = Object.values(last)[Object.keys(last).length-i];
          lDATA.push([
            {
              value: parseInt(lastten.Pm),
              desc: 'Dust',
              unit: 'ppm'
            }, {
              value: parseInt(lastten.Humid),
              desc: 'Humidity',
              unit: '%'
            }, {
              value: parseInt(lastten.temp),
              desc: 'Temperature',
              unit: '°C'
            }, {
              value: parseInt(lastten.CO)+0.5,
              desc: 'Carbonmonoxide',
              unit: 'ppm'
            }
          ])
        }

      }
      // console.log(lDATA);
      return lDATA;
      // for(const key in data){
      //   console.log(key);
      // }

    }

    //Chart ======================================
    (function() {
      var load_chart1;
      var load_chart2;
      var load_chart3;
      var load_chart4;

      function hide(){
        console.log("Hide");
        document.getElementById("DChart").style.display = "none";
        document.getElementById("HChart").style.display = "none";
        document.getElementById("TChart").style.display = "none";
        document.getElementById("CChart").style.display = "none";
        document.getElementById("vD").style.display = "none";
        document.getElementById("vH").style.display = "none";
        document.getElementById("vT").style.display = "none";
        document.getElementById("vC").style.display = "none";
        document.getElementById("chart").style.display = "block";
        
      }
      load_chart1 = function() {
        d3.select(".DChart").classed("loaded", false);
        console.log("refresh");
        return setTimeout(function() {
          return d3.select(".DChart").classed("loaded", true);
        }, 500);
        
      };
      load_chart2 = function() {
        d3.select(".DChart").classed("loaded", false);
        console.log("refresh");
        return setTimeout(function() {
          return d3.select(".DChart").classed("loaded", true);
        }, 500);
        
      };
      load_chart3 = function() {
        d3.select(".DChart").classed("loaded", false);
        console.log("refresh");
        return setTimeout(function() {
          return d3.select(".DChart").classed("loaded", true);
        }, 500);
        
      };
      load_chart4 = function() {
        d3.select(".DChart").classed("loaded", false);
        console.log("refresh");
        return setTimeout(function() {
          return d3.select(".DChart").classed("loaded", true);
        }, 500);
        
      };

      d3.selectAll(".js-do-it-again").on('click', hide);
      // $(".js-do-it-again").on("click", function() {
      //   return load_chart();
      // });
      load_chart1();
      load_chart2();
      load_chart3();
      load_chart4();
      hide();

    }).call(this);


    function makeChart(){
      // console.log(open);
      function castToGraph(points,max){
        var i;
        for(i = 0;i<points.length;i++){
          points[i][1] = (points[i][1]/max)*260;
        }
        return points;
      }
  
      function makeReverse(points){
        var i;
        for(i = 0;i<points.length;i++){
          points[i][1] = 260-points[i][1];
        }
        return points;
      }
  
      const svgPath = (points, command,num,open) => {
        // build the d attributes by looping over the points
        const d = points.reduce((acc, point, i, a) => i === 0
          ? `M ${point[0]},${point[1]}`
          : `${acc} ${command(point, i, a)}`
        , '')
        if(true){
          if(num==1){
            return `<path d="${d}"  fill = "none" stroke="#eaa54b" stroke-width="3"/>`
          }
          else if(num==2){
            return `<path d="${d}"  fill = "none" stroke="#66a1e2" stroke-width="3" />`
          }
          else if(num==3){
            return `<path d="${d}"  fill = "none" stroke="#8065e4" stroke-width="3"/>`
          }
          return `<path d="${d}"  fill = "none" stroke="#48cb80" stroke-width="3"/>`
        }
        else{
          if(num==1){
            return `<path  class = "dataset" d="${d}"  fill = "none" stroke="#eaa54b" stroke-width="3"/>`
          }
          else if(num==2){
            return `<path  class = "dataset" d="${d}"  fill = "none" stroke="#66a1e2" stroke-width="3" />`
          }
          else if(num==3){
            return `<path class = "dataset"  d="${d}"  fill = "none" stroke="#8065e4" stroke-width="3"/>`
          }
          return `<path  class = "dataset" d="${d}"  fill = "none" stroke="#48cb80" stroke-width="3"/>`
        }

        
      }
  
  
      const lineCommand = point => `L ${point[0]} ${point[1]}`
  
      const line = (pointA, pointB) => {
        
        const lengthX = pointB[0] - pointA[0]
        const lengthY = pointB[1] - pointA[1]
        return {
          length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
          angle: Math.atan2(lengthY, lengthX)
        }
      }
  
      const controlPoint = (current, previous, next, reverse) => {
  
        const p = previous || current
        const n = next || current
        // The smoothing ratio
        const smoothing = 0.2
        // Properties of the opposed-line
        const o = line(p, n)
        // If is end-control-point, add PI to the angle to go backward
        const angle = o.angle + (reverse ? Math.PI : 0)
        const length = o.length * smoothing
        // The control point position is relative to the current point
        const x = current[0] + Math.cos(angle) * length
        const y = current[1] + Math.sin(angle) * length
        return [x, y]
      }
  
      const bezierCommand = (point, i, a) => {
        // start control point
        const [cpsX, cpsY] = controlPoint(a[i - 1], a[i - 2], point)
        // end control point
        const [cpeX, cpeY] = controlPoint(point, a[i - 1], a[i + 1], true)
        return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point[0]},${point[1]}`
      }
      // console.log("======================")
      // console.log(dust);
      // console.log(humi);
      // console.log(temp);
      // console.log(carb);
      // console.log("======================")
      const svg1 = document.querySelector('.datasets1')
      castToGraph(dust,600);
      makeReverse(dust);
      svg1.innerHTML = svgPath(dust, lineCommand,1)
  
      const svg2 = document.querySelector('.datasets2')
      castToGraph(humi,100);
      makeReverse(humi);
      svg2.innerHTML = svgPath(humi, lineCommand,2)
  
      const svg3 = document.querySelector('.datasets3')
      castToGraph(temp,64);
      makeReverse(temp);
      svg3.innerHTML = svgPath(temp, lineCommand,3)
  
      const svg4 = document.querySelector('.datasets4')
      castToGraph(carb,100);
      makeReverse(carb);
      svg4.innerHTML = svgPath(carb, lineCommand,4)
    }


    // End of Chart =========================
    
    async function show1(){
      console.log("Show1");
      makeChart();
      document.getElementById("vD").style.display = "flex";
      document.getElementById("DChart").style.display = "block";
      document.getElementById("chart").style.display = "none";
      
      
    }
    function show2(){
      console.log("Show2");
      
      document.getElementById("vH").style.display = "flex";
      document.getElementById("HChart").style.display = "block";
      document.getElementById("chart").style.display = "none";
      makeChart();
      
    }
    function show3(){
      
      console.log("Show3");
      document.getElementById("vT").style.display = "flex";
      document.getElementById("TChart").style.display = "block";
      document.getElementById("chart").style.display = "none";
      makeChart();
      
    }
    function show4(){
      console.log("Show4");
      
      document.getElementById("vC").style.display = "flex";
      document.getElementById("CChart").style.display = "block";
      document.getElementById("chart").style.display = "none";
      makeChart();
    }

    highlight = function(seldata, seli) {
      d3.event.stopPropagation();
      svg.selectAll('.bar').attr('fill', function(d, i) {
        if (i === seli) {
          return COLORS[i];
        } else {
          return COLORS_G[i];
        }
      });
      return d3.select(this).attr('x', 15).attr('y', function() {
        return +this.getAttribute('y') + 15;
      }).attr('width', function(d) {
        return xScale(d.value) - 30;
      }).attr('height', BAR_HEIGHT - 30).transition().duration(500).ease('elastic').attr('x', 0).attr('y', function() {
        return +this.getAttribute('y') - 15;
      }).attr('height', BAR_HEIGHT).attr('width', function(d) {
        return xScale(d.value);
      });
    };

    highlightClear = function(seldata, seli) {
      // d3.event.stopPropagation();
      console.log(
        "Click"
      )
      return svg.selectAll('.bar').attr('fill', function(d, i) {
        return COLORS[i];
      });
    };
    MAX_VALUE = d3.max(DATA, function(d) {
      return d.value;
    });
    TOTAL_VALUE = DATA.reduce(function(p, c) {
      if (typeof p === 'object') {
        return p.value + c.value;
      } else {
        return p + c.value;
      }
    });
    ANIM_DURATION = 750;
    ANIM_DELAY = 300;
    oW = window.innerWidth;
    oH = window.innerHeight;
    W = oW - M - M;
    H = oH - M - M;
    BAR_HEIGHT = H / DATA.length;
    INITIAL_WIDTH = 15;
    // svg = d3.select('#chart').append('svg').on('click', show).attr('class', NAME).attr('width', oW).attr('height', oH);
    svg = d3.select('#chart').append('svg').attr('class', NAME).attr('width', oW).attr('height', oH);
    xScale = d3.scaleLinear().domain([0, MAX_VALUE * 1.5]).range([INITIAL_WIDTH, oW]);
    percentScale = d3.scaleLinear().domain([0, TOTAL_VALUE]).range([0, 100]);
    yScale = d3.scaleLinear().domain([0, DATA.length]).range([0, oH]);
    g = svg.selectAll('g').data(DATA);
    container = g.enter().append('g');
    //ColorAnimation
    container.attr('id',function(d, i) {
      return 'c'+i;
    })
    svg.selectAll("#c0").on('click', show1).style('cursor','pointer');
    svg.selectAll("#c1").on('click', show2).style('cursor','pointer');
    svg.selectAll("#c2").on('click', show3).style('cursor','pointer');
    svg.selectAll("#c3").on('click', show4).style('cursor','pointer');
    container.append('rect').attr('class', 'bar').attr('x', 0).attr('y', function(d, i) {
      return i * BAR_HEIGHT;
    }).attr('width', INITIAL_WIDTH).attr('height', BAR_HEIGHT).attr('fill', function(d, i) {
      return COLORS[i % DATA.length];
    }).transition().duration(ANIM_DURATION).delay(function(d, i) {
      return i * 100;
    }).attr('width', function(d) {
      return xScale(d.value);
    });
    //Line
    container.append('line').style('stroke', '#767676').style('fill', 'none').style('stroke-width', '1px').attr('x1', 0).attr('y1', function(d, i) {
      return yScale(i);
    }).attr('x2', oW).attr('y2', function(d, i) {
      return yScale(i);
    });
    //Value
    container.append('text').attr('pointer-events', 'none').attr('class', 'portion').attr('x', function(d, i) {
      return BAR_HEIGHT * 0.8;
    }).attr('y', function(d, i) {
      return yScale(i) + BAR_HEIGHT / 2;
    }).attr('dy', ".35em").attr('font-size', (BAR_HEIGHT / 2.5) + "px").attr('text-anchor', 'end').attr('fill', '#fff').text("0").transition().duration(ANIM_DURATION).tween('text', function(d) {
      var i;
      i = d3.interpolate(this.textContent, d.value);
      return function(t) {
        return this.textContent = i(t).toFixed(0);
      };
    });
    // Percent Sign
    container.append('text').attr('pointer-events', 'none').attr('class', 'portion_sign').attr('x', function(d, i) {
      return BAR_HEIGHT * 0.8 + 5;
    }).attr('y', function(d, i) {
      return yScale(i) + BAR_HEIGHT / 2;
    }).attr('dy', ".7em").attr('font-size', (BAR_HEIGHT / 5) + "px").attr('text-anchor', 'start').attr('fill', '#fff').text(function(d) {
      return d.unit;
    });
    //ItemName
    container.append('text').attr('pointer-events', 'none').attr('class', 'desc').attr('x', function(d, i) {
      return BAR_HEIGHT * 1.3;
    }).attr('y', function(d, i) {
      return yScale(i) + BAR_HEIGHT / 2;
    }).attr('dy', "0em").attr('font-size', (BAR_HEIGHT / 4.7) + "px").attr('fill', '#fff').text(function(d) {
      if(d.desc=="Humidity"){
        return d.desc+" 💦";
      }
      else if(d.desc=="Dust"){
        return d.desc+" 😷";
      }
      else if(d.desc=="Temperature"){
        return d.desc+ " 🌡";
      }
      else if(d.desc=="Carbonmonoxide"){
        return d.desc+" 💨";
      }
      return d.desc;
    });
    //item Unit
    container.append('text').attr('pointer-events', 'none').attr('class', 'item_count').attr('x', function(d, i) {
      return BAR_HEIGHT * 1.3;
    }).attr('y', function(d, i) {
      return yScale(i) + BAR_HEIGHT / 2;
    }).attr('dy', "1.4em").attr('font-size', (BAR_HEIGHT / 7.1) + "px").attr('fill', '#fff').style('opacity', .7).text(function(d) {
      return "";
    });
    //arrow
    // container.append('path').attr('class', 'arrow').attr('d', 'M15 9l-2.12 2.12L19.76 18l-6.88 6.88L15 27l9-9z').attr('viewBox', '0 0 36 36').attr('transform', function(d, i) {
    //   return "translate(" + (oW - 60) + ", " + (yScale(i) + BAR_HEIGHT / 2 - 18) + ")";
    // }).style('fill', '#fff');
    g.exit().remove();
    resize = function() {
      oW = window.innerWidth;
      oH = window.innerHeight;
      W = oW - M - M;
      H = oH - M - M;
      BAR_HEIGHT = H / DATA.length;
      svg.attr('width', oW).attr('height', oH);
      xScale.range([INITIAL_WIDTH, oW]);
      yScale.range([0, oH]);
      g = svg.selectAll('g');
      g.select('.bar').attr('y', function(d, i) {
        return i * BAR_HEIGHT;
      }).attr('height', BAR_HEIGHT).transition().duration(ANIM_DURATION).delay(function(d, i) {
        return i * 100;
      }).attr('width', function(d) {
        return xScale(d.value);
      });
      g.select('line').attr('y1', function(d, i) {
        return yScale(i);
      }).attr('x2', oW).attr('y2', function(d, i) {
        return yScale(i);
      });
      g.select('.portion').attr('x', function(d, i) {
        return BAR_HEIGHT * 0.8;
      }).attr('y', function(d, i) {
        return yScale(i) + BAR_HEIGHT / 2;
      }).attr('pointer-events', 'none').attr('font-size', (BAR_HEIGHT / 2.5) + "px");
      g.select('.portion_sign').attr('x', function(d, i) {
        return BAR_HEIGHT * 0.8 + 5;
      }).attr('y', function(d, i) {
        return yScale(i) + BAR_HEIGHT / 2;
      }).attr('pointer-events', 'none').attr('font-size', (BAR_HEIGHT / 5) + "px");
      g.select('.desc').attr('x', function(d, i) {
        return BAR_HEIGHT * 1.3;
      }).attr('y', function(d, i) {
        return yScale(i) + BAR_HEIGHT / 2;
      }).attr('pointer-events', 'none').attr('font-size', (BAR_HEIGHT / 4.7) + "px");
      g.select('.item_count').attr('x', function(d, i) {
        return BAR_HEIGHT * 1.3;
      }).attr('y', function(d, i) {
        return yScale(i) + BAR_HEIGHT / 2;
      })
      // .attr('pointer-events', 'none').attr('font-size', (BAR_HEIGHT / 7.1) + "px");
      // return g.select('.arrow').attr('pointer-events', 'none').attr('transform', function(d, i) {
      //   return "translate(" + (oW - 60) + ", " + (yScale(i) + BAR_HEIGHT / 2 - 18) + ")";
      // });
    };
    // show1();
    update = function(data) {
      // data = data[0];
      // console.log(data);
      console.log(DATA);
      for(var i in data){
        // console.log(data);
        // console.log(data[i])
        if(isNaN(data[i].value)){
          data[i].value = lastData[i].value;
          
        }
        else{
          lastData[i].value = data[i].value;
        }
      }
      
      MAX_VALUE = d3.max(DATA, function(d) {
        return d.value;
      });
      TOTAL_VALUE = DATA.reduce(function(p, c) {
        if (typeof p === 'object') {
          return p.value + c.value;
        } else {
          return p + c.value;
        }
      });
      BAR_HEIGHT = H / DATA.length;
      xScale.domain([0, MAX_VALUE * 1.5]);
      yScale.domain([0, DATA.length]);
      percentScale.domain([0, TOTAL_VALUE]);
      g = svg.selectAll('g').data(data);
      g.select('.bar').transition().duration(ANIM_DURATION).delay(function(d, i) {
        return i * 100;
      }).attr('width', function(d) {
        return xScale(d.value);
      }).attr('fill', function(d, i) {
        return COLORS[i];
      });
      g.select('.portion').transition().duration(ANIM_DURATION).tween('text', function(d) {
        var i;
        i = d3.interpolate(this.textContent, d.value);
        return function(t) {
          return this.textContent = i(t).toFixed(0);
        };
      });
      return g.select('.item_count').text(function(d) {
        return "";
      });
    };
    d3.select(window).on('resize', resize);
    host = window.location.hostname;
    if (host === 'localhost') {
      return setInterval((async function() {
        const data = await getData(db);
        update(randomize(modifiedData(data)));
        makeChart();
        return ;
      }), 1000);
    }
    
  })(window);

}).call(this);






//button========================
var toggle1 = await readUserData();
// console.log(toggle1);
if (toggle1 === 0) {
  document.getElementById('Toggle').style.color = "orange"; //play music
  document.getElementById('Toggle').innerText = "Close";
  document.getElementById('Toggle').conten
}
else if (toggle1 === 1) {
  document.getElementById('Toggle').style.color = 'red'; //pause music
  document.getElementById('Toggle').innerText = "Open";
}
else if (toggle1 === -1) {
  document.getElementById('Toggle').style.color = 'black'; //stop music
  document.getElementById('Toggle').innerText = "Auto";
}

function Toggle(){
  
  if (toggle1 === 0) {
		document.getElementById('Toggle').style.color = "orange"; //play music
    document.getElementById('Toggle').innerText = "Open";
		toggle1 = 1;
    writeUserData(1);
	}
	else if (toggle1 === 1) {
		document.getElementById('Toggle').style.color = 'red'; //pause music
    document.getElementById('Toggle').innerText = "Auto";
		toggle1 = -1;
    writeUserData(-1);
	}
	else if (toggle1 === -1) {
		document.getElementById('Toggle').style.color = 'black'; //stop music
    document.getElementById('Toggle').innerText = "Close";
		toggle1 = 0;
    writeUserData(0);
	}
}
document.getElementById("Toggle").addEventListener("click",Toggle)












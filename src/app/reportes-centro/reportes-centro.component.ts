import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-reportes-centro',
  templateUrl: './reportes-centro.component.html',
  styleUrls: ['./reportes-centro.component.scss']
})
export class ReportesCentroComponent implements OnInit {

  minimoPerroCachorro: number;
  promedioPerroCachorro: any;
  maximoPerroCachorro: any;
  minimoPerroAdulto: any;
  promedioPerroAdulto: any;
  maximoPerroAdulto: any;

  minimoGatoCachorro: any;
  promedioGatoCachorro: any;
  maximoGatoCachorro: any;
  minimoGatoAdulto: any;
  promedioGatoAdulto: any;
  maximoGatoAdulto: any;

  minimos:any;
  promedios:any;
  maximos:any;

  flagNoData: number = 0;

  // Gráfico de tiempos mínimos
  public barChartOptionsMin: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public barChartLabelsMin: Label[];
  public barChartTypeMin: ChartType = 'bar';
  public barChartLegendMin = true;
  public barChartDataMin: ChartDataSets[];

    // Gráfico de tiempos promedios
    public barChartOptionsProm: ChartOptions = {
      responsive: true,
      // We use these empty structures as placeholders for dynamic theming.
      scales: { xAxes: [{}], yAxes: [{}] },
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end',
        }
      }
    };
    public barChartLabelsProm: Label[];
    public barChartTypeProm: ChartType = 'bar';
    public barChartLegendProm = true;
  
    public barChartDataProm: ChartDataSets[] = [
      { data: [65], label: 'Perros cachorros' },
      { data: [28], label: 'Perros adultos' },
      { data: [0], label: 'Gatos cachorros' },
      { data: [27], label: 'Gatos adultos' }
    ];


    // Gráfico de tiempos máximos
    public barChartOptionsMax: ChartOptions = {
      responsive: true,
      // We use these empty structures as placeholders for dynamic theming.
      scales: { xAxes: [{}], yAxes: [{}] },
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end',
        }
      }
    };
    public barChartLabelsMax: Label[];
    public barChartTypeMax: ChartType = 'bar';
    public barChartLegendMax = true;
  
    public barChartDataMax: ChartDataSets[] = [
      { data: [65], label: 'Perros cachorros' },
      { data: [28], label: 'Perros adultos' },
      { data: [30], label: 'Gatos cachorros' },
      { data: [27], label: 'Gatos adultos' }
    ];


  constructor() { }

  ngOnInit(): void {
    this.barChartLabelsMin = ['Últimos 3 meses'];
    this.barChartLabelsProm = ['Últimos 3 meses'];
    this.barChartLabelsMax = ['Últimos 3 meses'];

    // Datos del backend:
  
    var jsonTiempos = [{
      "categoria":"perroCachorro",
      "minimo":15,
      "promedio":15,
      "maximo":15
      },
      {
      "categoria":"perroAdulto",
      "minimo":23,
      "promedio":67,
      "maximo":90
      },
      {
      "categoria":"gatoCachorro",
      "minimo":2,
      "promedio":50,
      "maximo":98
      },
      {
      "categoria":"gatoAdulto",
      "minimo":10,
      "promedio":20,
      "maximo":34
      }
      ]
    
    for (let x = 0; x < jsonTiempos.length; x++){
      if (jsonTiempos[x].categoria === "perroCachorro"){
        this.minimoPerroCachorro = jsonTiempos[x].minimo;
        this.promedioPerroCachorro = jsonTiempos[x].promedio;
        this.maximoPerroCachorro = jsonTiempos[x].maximo;
      } else if (jsonTiempos[x].categoria === "perroAdulto"){
        this.minimoPerroAdulto = jsonTiempos[x].minimo;
        this.promedioPerroAdulto = jsonTiempos[x].promedio;
        this.maximoPerroAdulto = jsonTiempos[x].maximo;
      } else if (jsonTiempos[x].categoria === "gatoCachorro") {
        this.minimoGatoCachorro = jsonTiempos[x].minimo;
        this.promedioGatoCachorro = jsonTiempos[x].promedio;
        this.maximoGatoCachorro = jsonTiempos[x].maximo;
      } else if (jsonTiempos[x].categoria === "gatoAdulto"){
        this.minimoGatoAdulto = jsonTiempos[x].minimo;
        this.promedioGatoAdulto = jsonTiempos[x].promedio;
        this.maximoGatoAdulto = jsonTiempos[x].maximo;
      }
    }

    this.minimos = [
      { data: [this.minimoPerroCachorro], label: 'Perros cachorros' },
      { data: [this.minimoPerroAdulto], label: 'Perros adultos' },
      { data: [this.minimoGatoCachorro], label: 'Gatos cachorros'},
      { data: [this.minimoGatoAdulto], label: 'Gatos adultos'}
    ];

    var minimosPositivos = [];
    for (let x = 0; x < this.minimos.length; x++){
      if (this.minimos[x].data != 0){
        minimosPositivos.push(this.minimos[x]);
      }
    }
    this.barChartDataMin = minimosPositivos;

    if (this.barChartDataMin.length === 0){
      this.flagNoData = 1;
    }


    this.promedios = [
      { data: [this.promedioPerroCachorro], label: 'Perros cachorros' },
      { data: [this.promedioPerroAdulto], label: 'Perros adultos' },
      { data: [this.promedioGatoCachorro], label: 'Gatos cachorros'},
      { data: [this.promedioGatoAdulto], label: 'Gatos adultos'}
    ];
    var promediosPositivos = [];
    for (let x = 0; x < this.promedios.length; x++){
      if (this.promedios[x].data != 0){
        promediosPositivos.push(this.promedios[x]);
      }
    }
    this.barChartDataProm = promediosPositivos;

    this.maximos = [
      { data: [this.maximoPerroCachorro], label: 'Perros cachorros' },
      { data: [this.maximoPerroAdulto], label: 'Perros adultos' },
      { data: [this.maximoGatoCachorro], label: 'Gatos cachorros'},
      { data: [this.maximoGatoAdulto], label: 'Gatos adultos'}
    ];

    var maximosPositivos = [];
    for (let x = 0; x < this.maximos.length; x++){
      if (this.maximos[x].data != 0){
        maximosPositivos.push(this.maximos[x]);
      }
    }
    this.barChartDataMax = maximosPositivos;

  }




  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


}
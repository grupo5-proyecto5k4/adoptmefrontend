import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reportes-centro',
  templateUrl: './reportes-centro.component.html',
  styleUrls: ['./reportes-centro.component.scss']
})
export class ReportesCentroComponent implements OnInit {

  // Date picker ------------------
  today = new Date();

  // default 30 days before
  numberOfDaysToSubstract = 30;
  prior = new Date().setDate(this.today.getDate() - this.numberOfDaysToSubstract);

  // defaults
  range = new FormGroup({
    start: new FormControl(new Date(this.prior)),
    end: new FormControl(this.today)
  });

  // validations
  reportesFlag: boolean = false;
  yearAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 1))
  // -----------------------

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
  graficoPerro: any = {perrosCachorrosAdoptadosPorSuProvisorio: 0, perrosAdultosAdoptadosPorSuProvisorio: 0, perrosCachorrosAdoptadosPorOtro: 0, perrosAdultosAdoptadosPorOtro: 0, totalPerrosAdoptados : 0}
  graficoGato: any = {gatosCachorrosAdoptadosPorSuProvisorio: 0, gatosAdultosAdoptadosPorSuProvisorio: 0, gatosCachorrosAdoptadosPorOtro: 0, gatosAdultosAdoptadosPorOtro: 0, totalGatosAdoptados : 0}

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


    // Gráfico de Perros que habiendo estado en provisorio fueron adoptados por la misma persona que les dió provisorio alguna vez

  public pieChartPerrosAdoptados: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    plugins: {
      datalabels: {
        color: "black",
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public barChartLabelsPerro: Label[] = ['Adoptante fue su provisorio', 'Adoptante no le dió provisorio'];
  public barChartPerros: ChartType = 'doughnut';
  public barChartLegendPerro = true;
  public barChartDataPerro: ChartDataSets[] = [
    { data: [28, 61] },
  ];

  // Gráfico de Gatos que habiendo estado en provisorio fueron adoptados por la misma persona que les dió provisorio alguna vez
  public pieChartGatosAdoptados: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public barChartLabelsGato: Label[] = ['Adoptante fue su provisorio', 'Adoptante no le dió provisorio'];
  public barChartGatos: ChartType = 'doughnut';
  public barChartLegendGato = true;
  public barChartDataGato: ChartDataSets[] = [
    { data: [15, 52] },
  ];


  constructor() { }

  ngOnInit(): void {

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

    //Datos para el grafico de mascotas adoptadas
    var jsonMascotas = [{
      "tipoMascota":"0",
      "perrosCachorrosAdoptadosPorSuProvisorio":4,
      "perrosAdultosAdoptadosPorSuProvisorio":10,
      "perrosCachorrosAdoptadosPorOtro":5,
      "perrosAdultosAdoptadosPorOtro":5,
      "totalPerrosAdoptados":24
      },
      {
        "tipoMascota":"1",
        "gatosCachorrosAdoptadosPorSuProvisorio":15,
        "gatosAdultosAdoptadosPorSuProvisorio":12,
        "gatosCachorrosAdoptadosPorOtro":8,
        "gatosAdultosAdoptadosPorOtro":2,
        "totalGatosAdoptados":37
        },
      ]


      for (let x = 0; x < jsonMascotas.length; x++){
        if (jsonMascotas[x].tipoMascota === "0"){
          this.graficoPerro.perrosCachorrosAdoptadosPorSuProvisorio = jsonMascotas[x].perrosCachorrosAdoptadosPorSuProvisorio;
          this.graficoPerro.perrosAdultosAdoptadosPorSuProvisorio = jsonMascotas[x].perrosAdultosAdoptadosPorSuProvisorio;
          this.graficoPerro.perrosCachorrosAdoptadosPorOtro = jsonMascotas[x].perrosCachorrosAdoptadosPorOtro;
          this.graficoPerro.perrosAdultosAdoptadosPorOtro = jsonMascotas[x].perrosAdultosAdoptadosPorOtro;
          this.graficoPerro.totalPerrosAdoptados = jsonMascotas[x].totalPerrosAdoptados;
        } else if (jsonMascotas[x].tipoMascota === "1"){
          this.graficoGato.gatosCachorrosAdoptadosPorSuProvisorio = jsonMascotas[x].gatosCachorrosAdoptadosPorSuProvisorio;
          this.graficoGato.gatosAdultosAdoptadosPorSuProvisorio = jsonMascotas[x].gatosAdultosAdoptadosPorSuProvisorio;
          this.graficoGato.gatosCachorrosAdoptadosPorOtro = jsonMascotas[x].gatosCachorrosAdoptadosPorOtro;
          this.graficoGato.gatosAdultosAdoptadosPorOtro = jsonMascotas[x].gatosAdultosAdoptadosPorOtro;
          this.graficoGato.totalGatosAdoptados = jsonMascotas[x].totalGatosAdoptados;
        }
      }


  }

  async generarReportes(desde, hasta){
    this.reportesFlag = true;
    var desdeBack = this.convertEnviarBack(desde);
    var hastaBack = this.convertEnviarBack(hasta);
    console.log("desde", desdeBack, "hasta", hastaBack);
    //TODO: Agregar Llamadas al backend
    await new Promise(r => setTimeout(r, 3000));
    this.reportesFlag = false;
  }

  convertEnviarBack(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return (date.getFullYear().toString() + mnth + day)
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


}
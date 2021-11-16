import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { FormControl, FormGroup } from '@angular/forms';
import { ReportesService } from 'src/services/reportes.service';
import { AuthService } from '../auth.service';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-reportes-admin',
  templateUrl: './reportes-admin.component.html',
  styleUrls: ['./reportes-admin.component.scss']
})
export class ReportesAdminComponent implements OnInit {

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
  yearAgo = new Date(new Date().setMonth(new Date().getMonth() - 3));
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

  minimos: any;
  promedios: any;
  maximos: any;
  flagNoData: number = 0;
  reporteProvisorio: any;
  chartOptions: any;

  cantidadTotalPromedioProvi: any;
  cantidadTotalPromedioAdopcion: any;

  // Gráfico de tiempos mínimos
  public barChartOptionsMin: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [{}],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          stepSize: 1,
          min: 0
        },
        scaleLabel: {
          display: true,
          labelString: 'Días'
        }
      }]
    },
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
    scales: {
      xAxes: [{}],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          stepSize: 1,
          min: 0
        },
        scaleLabel: {
          display: true,
          labelString: 'Días'
        }
      }]
    },
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

    scales: {
      xAxes: [{}],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          stepSize: 1,
          min: 0
        },
        scaleLabel: {
          display: true,
          labelString: 'Días'
        }
      }]
    }
    ,
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
    { data: [65], label: 'Perros cachorros', backgroundColor: "red" },
    { data: [28], label: 'Perros adultos', backgroundColor: "purple" },
    { data: [30], label: 'Gatos cachorros', backgroundColor: "blue" },
    { data: [27], label: 'Gatos adultos', backgroundColor: "#222222", }
  ];


  constructor(private dateAdapter: DateAdapter<Date>, private reporteService: ReportesService, private authService: AuthService) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  ngOnInit(): void {

    this.barChartLabelsMin = ['Solicitudes'];
    this.barChartLabelsProm = ['Solicitudes'];
    this.barChartLabelsMax = ['Solicitudes'];

    // Reporte tiempos minimo,maximo,promedio
    this.generarReportes(this.prior, this.today);

  }

  async generarReportes(desde, hasta) {
    this.reportesFlag = true;
    var desdeBack = this.convertEnviarBack(desde);
    var hastaBack = this.convertEnviarBack(hasta);
    //TODO: Agregar Llamadas al backend
    await this.reporteService.getSolicitudesTimeArray(desdeBack, hastaBack, this.authService.getToken()).subscribe(dataAdoption => {
      this.reporteTiempoAdopcion(dataAdoption);
      console.log("dataAdoption", dataAdoption);
      console.log("cantidadTotalAdopcion", dataAdoption[0].cantidadTotalAdopcion);
      
      this.cantidadTotalPromedioProvi = dataAdoption[1].cantidadTotalProvisorio;
      this.cantidadTotalPromedioAdopcion = dataAdoption[0].cantidadTotalAdopcion;
      
    })
    err => {
    }
    await new Promise(r => setTimeout(r, 3000));
    this.reportesFlag = false;
  }

  convertEnviarBack(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return (date.getFullYear().toString() + mnth + day)
  }

  reporteTiempoAdopcion(jsonData) {
    this.flagNoData = 0;
    var jsonTiempos = jsonData
    // FUNCION -> que le mando el json.


    this.minimoPerroCachorro = jsonTiempos[0].MinimoTiempoAdopcion; //cachorro = adopcion
    this.promedioPerroCachorro = jsonTiempos[0].PromedioTiempoAdopcion;
    this.maximoPerroCachorro = jsonTiempos[0].MaximoTiempoAdopcion;
    this.minimoPerroAdulto = jsonTiempos[1].MinimoTiempoProvisorio; //adulto = provisorio
    this.promedioPerroAdulto = jsonTiempos[1].PromedioTiempoProvisorio;
    this.maximoPerroAdulto = jsonTiempos[1].maximoTiempoProvisorio;


    this.minimos = [
      { data: [this.minimoPerroCachorro], label: "Adopción", backgroundColor: "#C50FA1", hoverBackgroundColor: "#C50FA1" },
      { data: [this.minimoPerroAdulto], label: "Provisorio", backgroundColor: "#990089", hoverBackgroundColor: "#990089" },
    ];

    var minimosPositivos = [];
    for (let x = 0; x < this.minimos.length; x++) {
      minimosPositivos.push(this.minimos[x]);
    }

    this.barChartDataMin = minimosPositivos;

    if (this.barChartDataMin.length === 0) {
      this.flagNoData = 1;
    }


    this.promedios = [
      { data: [this.promedioPerroCachorro], label: "Adopción", backgroundColor: "#C50FA1", hoverBackgroundColor: "#C50FA1" },
      { data: [this.promedioPerroAdulto], label: "Provisorio", backgroundColor: "#990089", hoverBackgroundColor: "#990089" },
    ];

    var promediosPositivos = [];
    for (let x = 0; x < this.promedios.length; x++) {
      promediosPositivos.push(this.promedios[x]);
    }

    this.barChartDataProm = promediosPositivos;

    this.maximos = [
      { data: [this.maximoPerroCachorro], label: "Adopción", backgroundColor: "#C50FA1", hoverBackgroundColor: "#C50FA1" },
      { data: [this.maximoPerroAdulto], label: "Provisorio", backgroundColor: "#990089", hoverBackgroundColor: "#990089" },
    ];

    var maximosPositivos = [];
    for (let x = 0; x < this.maximos.length; x++) {
      maximosPositivos.push(this.maximos[x]);
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
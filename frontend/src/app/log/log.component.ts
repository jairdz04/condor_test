import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Ng2SmartTableModule} from 'ng2-smart-table';
import { LocalDataSource,ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {



// Start
//i left this data here to test line chart. As my browser exploded, i can't prove that the data i receive from api makes the line chart works
  public lineChartData:Array<any> = [
    [65, 59, 80, 81, 56, 55, 40]
  ];
  public lineChartLabels:Array<any> = ['Day1', 'Day2', 'Day3', 'Day4', 'Day5', 'Day6', 'Day7'];
// End


  public lineChartType:string = 'line';
  public pieChartType:string = 'pie';

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public dataM:any[] = [{data: []}];
  public dataC:any[]= [{data: []}];

  logs:any[];
  btnName:String;
  states:any[];
  start:String;
  end:String;
  state:String;
  message:String;
  flag:Boolean;
  responseT:number;

  public labelsC:any[];
  public labelsM:any[];

  constructor(private http:HttpClient) { 
      this.btnName = "Search";
      this.states = [{name:""},{name: "FL"} , { name: "OH"} ,{name: "GA" },{name: "LA"}];
      this.labelsC = ["IN_PROG", "COMPL", "NO_CE_REQ", "NOT_FOUND"];
      this.labelsM = ["JAX01", "BDU02", "BDU01"];   
      this.start = "";
      this.end = "";
      this.state = "";
      this.message = "";
      this.flag = false;
  }

  ngOnInit() {    
    this.getDataOnLoad();
  }

  connectionLimit(headers: HttpHeaders) {
    headers.append('Content-Length', ''); 
  }

  getLogs(url){
    let headers = new HttpHeaders();
    this.connectionLimit(headers);

    this.http.get(url, {headers: headers }).subscribe(
    (response:any[])=>{   
      console.log(response); 
      this.logs = response;  
      this.sortData('dt_Start_Log');
      if(this.logs.length == 0){ this.flag = true; this.message = "No records Found";}
      else{ this.flag = false; this.message = "";}
      this.perMachine(this.logs);
      this.perCompliance(this.logs);
      this.responseT =   this.responseTime(this.logs) ? this.responseTime(this.logs) : 0.0 ;
      this.responsePerDay(this.logs);
    });
  }

  getFullUrl(start,end, state?){
    return `https://api.cebroker.com/v1/cerenewaltransactions/GetLogsRecordData?startdate=${start}&enddate=${end}&state=${state}`;
  }

  getCurrentDay(){
    const today = new Date(); 
    var day = String(today.getDate());
    var month = String(today.getMonth()+1);
    var year =  today.getFullYear();
    return String(day + "/" + month + "/" + year);

  }

  getDataOnLoad(){
    const today = this.getCurrentDay();
    const url = this.getFullUrl(today,today, "GA");
    this.getLogs(url);
  }

  search(){
    const url = this.getFullUrl(this.start,this.end, this.state);
    this.getLogs(url);
  }

  perMachine(logs){
    let labelsMachine = [];
    let valuesMachine = [];
    for(let i = 0; i< logs.length; i++){
      const machine = logs[i].cd_machine;
      if(labelsMachine.indexOf(machine) == -1){
        const data = logs.filter(j=> j.cd_machine === machine);
        valuesMachine.push(data.length);
        labelsMachine.push(machine);
      }
    }

    //this.labelsC = labelsMachine;
    this.dataM = [{data: valuesMachine, label:"Total request per machine"}]
  }

  perCompliance(logs){
    let lablesCompliance = [];
    let valuesCompliance = [];
    for(var i = 0; i < logs.length; i++){
      const compliance = logs[i].​ds_compl_status_returned;
      if(lablesCompliance.indexOf(compliance) == -1){
        const data = logs.filter(j=> j.​ds_compl_status_returned === compliance);
        valuesCompliance.push(data.length);
        lablesCompliance.push(compliance);
      }
    }
  
    //this.labelsC = lablesCompliance;
    this.dataC = [{data: valuesCompliance, label:"Total request per compliance status"}]
  }

  responseTime(logs){
    let count = 0.0;
    for(var i = 0; i < logs.length; i++){
      count += (Date.parse(logs[i].dt_end_log) - Date.parse(logs[i].dt_Start_Log));
    }
    return ((count/ logs.length)/10000*60);
  }


  /* my browser exploded. I don´t have the security it´s work */
  responsePerDay(logs){
    let labelsDay = [];
    let valuesPerDay = [];
    let count = 0.0;
    for(var i = 0; i < logs.length; i++){
      const day = this.getFullDate(logs[i].dt_Start_Log);
      if(labelsDay.indexOf(day) == -1){
        const results = logs.filter(j=> this.getFullDate(j.dt_Start_Log) === day);
        for(var k=0; k< results.length; i++){
          count += (Date.parse(results[k].dt_end_log) - Date.parse(results[k].dt_Start_Log));
        }        
        labelsDay.push(day);
        valuesPerDay.push(count);
      }
      count = 0.0
    }

    if(labelsDay.length > 0 ){
      this.lineChartLabels = labelsDay;    
      this.lineChartData.push(valuesPerDay); 
    }
  }
  
  getFullDate(dt){
    const fullDay = new Date(dt);  
    var day = String(fullDay.getDate());
    var month = String(fullDay.getMonth()+1);
    var year =  fullDay.getFullYear();
    return String(day + "/" + month + "/" + year);
  }

  sortData(property){
    this.logs.sort((a,b)=>{
      return a.property - b.property;
    });
   // console.log("logs sorted: ", this.logs);
  }

}

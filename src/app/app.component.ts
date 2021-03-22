import { Component, ViewChild, ElementRef } from "@angular/core";

import * as jspreadsheet from "jspreadsheet-ce";
import { ApiService } from "./api.service";
 
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})

export class AppComponent {
  @ViewChild("spreadsheet") spreadsheet: ElementRef;
  title = "CodeSandbox";
  data = null;
  myTable = null;

  constructor(private apiService: ApiService) {
  }
  
  ngOnInit()
  {
    this.apiService.readUsers().subscribe(data =>{
      this.data = data;
      console.log("Les donnees de l'API ", this.data);
      this.myTable.setData(this.data);
    })
  }
 
  ngAfterViewInit() {
    var test2 = 2;
    console.log("The actual data : " + this.data);
    this.myTable = jspreadsheet(this.spreadsheet.nativeElement, { 
      data: [[]],
      rows:{ 
        0: { height:'45px' }, 
        1: { height:'45px' }, 
        2: { height:'45px' }, 
        3: { height:'45px' }, 
        4: { height:'45px' } 
      },
      rowResize: true,
      columns:[
          { title:'id', width:80, name:'id' },
          { title:'Nom', width:100, name:'nom' },
          { title:'Login', width:100, name:'login' },
          { title:'Password', width:150, name:'password'},
          { title:'Profil', width:100, type:'dropdown', source:['admin', 'editeur', 'abonne'], name:'profil' }
      ]
    });
  }

 
  createOrUpdateUsers(form){
    var tableData = this.myTable.getJson();


    // Transformation du json en string
    var myTableString = JSON.stringify(tableData);

    // input du formulaire
    var users = (<HTMLInputElement>document.getElementById('users'));

    // Recuperation des donnees dans le champ users
    users.value = myTableString;


    console.log("Val table : ", tableData)
    console.log("Val form : ", form.value);
    console.log("Val input : ", users.value);
    
    this.apiService.createOrUpdateUsers(users.value).subscribe(data=>{
      console.log("Table modifiee !");
      alert("Modification effectuée !");
      location.reload();
    }
      
    )
  }
}

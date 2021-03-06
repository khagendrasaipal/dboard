import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DboardService } from './dboard.service';
import { ChartjsModule } from '@coreui/angular-chartjs';

@Component({
  selector: 'app-dboard',
  templateUrl: './dboard.component.html',
  styleUrls: ['./dboard.component.scss']
})
export class DboardComponent implements OnInit {

  cForm: FormGroup

  model: any = {};
  disabled = false;
  error = '';
  lists: any;
  perPages = [10, 20, 50, 100];
  pagination = {
    total: 0,
    currentPage: 0,
    perPage: 0
  };
  searchTerm: string = '';
  column: string = '';
  isDesc: boolean = false;

  srchForm: FormGroup;
  formLayout: any;
  program:any;
  indicators:any;
  ddata:any;
  sindicator:any;
  ctype="bar";
  letters = '0123456789ABCDEF';
  composites:any;
  range = new Array();
  caption = new Array();
  cdata = new Array();
  myArray=new Array();
  f=new Array();

  // months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  months=["Shrawn","Bhadra","Ashoj","Kartik","Mangsir","Poush","Magh","Falgun","Chaitra","Baishakh","Jestha","Ashar"];
  
  chartBarData = {
    labels: [...this.months].slice(0, 12),
    datasets: [
      {
        label: 'Hmis Indicator',
        backgroundColor: '#f87979',
        height: '50px',
        data: []
      }
    ]
  };

  chartPieData = {
    labels:[...this.months].slice(0, 12),
    datasets: [
      {
        data: [],
        backgroundColor: ['#fde23e','#f16e23', '#57d9ff','#937e88','#3de23e','#416e23', '#c9de53','#c5b2d8','#ec8888','#5957da','#f90303','#d6aa64'],
        hoverBackgroundColor: ['#fde23e','#f16e23', '#57d9ff','#937e88','#3de23e','#416e23', '#c9de53','#c5b2d8','#ec8888','#5957da','#f90303','#d6aa64'],
      }
    ]
  };

  chartLineData = {
    labels: [...this.months].slice(0, 12),
    datasets: [
      {
        label: 'HMIS Indicator',
        backgroundColor: 'rgba(220, 220, 220, 0.2)',
        borderColor: 'rgba(220, 220, 220, 1)',
        pointBackgroundColor: 'rgba(220, 220, 220, 1)',
        pointBorderColor: '#fff',
        data:[]
      }
     
    ]
  };

  chartDoughnutData = {
    labels:  [...this.months].slice(0, 12),
    datasets: [
      {
        backgroundColor: ['#fde23e','#f16e23', '#57d9ff','#937e88','#3de23e','#416e23', '#c9de53','#c5b2d8','#ec8888','#5957da','#f90303','#d6aa64'],
        data: []
      }
    ]
  };

  chartLineData2 = {
    labels: ['2076/77','2077/78','2078/79'],
    datasets: [
      {
        label: 'Average MSS score (Availability and readiness)',
        backgroundColor: 'rgba(220, 220, 220, 0.2)',
                borderColor: '#198754',
                pointBackgroundColor: '#e55353',
                pointBorderColor: '#6610f2',
        data: [10,20,12]
      },
      {
        label: 'Aggregate LEAF score (Leadership and performance)',
        backgroundColor: 'rgba(220, 220, 220, 0.2)',
        borderColor: '#6f42c1',
        pointBackgroundColor: '#f9b115',
        pointBorderColor: '#f9b115',
        data: [9,16,17]
      }
    ]
  };

  // chartLineOptions = {
  //   maintainAspectRatio: false,
  // };


  constructor(private RS: DboardService, private toastr: ToastrService, private fb: FormBuilder) { 
    
    this.formLayout = {
      id:[],
      program: ['1',Validators.required],
      indicator: ['vH9Mm6o3LKn'],
      dyear: ['2076'],
      charttype: ['bar'],
    }
    
    this.cForm =fb.group(this.formLayout)

    this.srchForm = new FormGroup({
      entries: new FormControl('10'),
      srch_term: new FormControl(''),
      
    })

  }

  ngOnInit(): void {
    // this.pagination.perPage = this.perPages[0];
    // this.getList();
    this.getProgram();
    this.sindicator="";
    this.getComposite();
    this.getIndicators(1);
    this.getData('vH9Mm6o3LKn',2076)
  }

  getProgram(){
    this.RS.getProgram().subscribe({
      next: (result:any) => {
           this.program = result.data; 
       },
       error : err => {
         this.toastr.error(err.error, 'Error');
       }
       
     }
     );
  }
 
  getComposite(){
    let i=0;
    let c1=['#198754','#6f42c1','red','blue','#f9b115','#6610f2'];
    let c2=['#f9b115','#6610f2','blue','red','#198754','#6f42c1'];
    
    this.RS.getComposite().subscribe({
      next: (result:any) => {
           this.composites = result.data; 
           for(i=0;i<this.composites.length;i++){
            this.range.push(this.composites[i].fys);
            this.caption.push(this.composites[i].indicator);
            this.cdata.push(this.composites[i].value);
           }
           
           var mySet = new Set(this.range);
            this.range = [...mySet];
         
           var cap=new Set(this.caption);
           this.caption=[...cap];
           for(i=0;i<this.caption.length;i++){
            this.myArray.push({label: this.caption[i], backgroundColor: 'rgba(220, 220, 220, 0.2)',
                      borderColor: c1[i],
                      pointBackgroundColor: c2[i],
                      pointBorderColor: c1[i],
                      data:[this.cdata[i],this.cdata[i+2]]});
           }
          //  console.log(this.myArray);
           this.chartLineData2 = {
            labels: this.range,
            datasets: this.myArray,
            // [
              
              // {
              //   label: 'Average MSS score (Availability and readiness)',
              //   backgroundColor: 'rgba(220, 220, 220, 0.2)',
              //           borderColor: '#198754',
              //           pointBackgroundColor: '#e55353',
              //           pointBorderColor: '#6610f2',
              //   data: [10,20,12]
              // },
              // {
              //   label: 'Aggregate LEAF score (Leadership and performance)',
              //   backgroundColor: 'rgba(220, 220, 220, 0.2)',
              //   borderColor: '#6f42c1',
              //   pointBackgroundColor: '#f9b115',
              //   pointBorderColor: '#f9b115',
              //   data: [9,16,17]
              // }
            // ]
          };
       },
       error : err => {
         this.toastr.error(err.error, 'Error');
       }
       
     }
     );
  }

  getIndicators(pid:any){
    this.RS.getIndicators(pid).subscribe({
      next: (result:any) => {
           this.indicators = result.data; 
       },
       error : err => {
         this.toastr.error(err.error, 'Error');
       }
       
     }
     );
  }

  getData(iid:any,fy:any){
    this.ddata=[];
    this.RS.getDashboardData(iid,fy).subscribe({
      next: (result:any) => {
           this.ddata = result.data; 
           console.log(this.ddata);
           if(this.ctype=="bar"){
           this.chartBarData = {
            labels: [...this.months].slice(0, 12),
            datasets: [
              {
                label: this.sindicator,
                backgroundColor: '#f87979',
                height:'200',
                data: this.ddata
              }
            ]
          };
        }
        if(this.ctype=="pie"){
          this.chartPieData = {
            labels:[...this.months].slice(0, 12),
            datasets: [
              {
                data: this.ddata,
                backgroundColor:['#fde23e','#f16e23', '#57d9ff','#937e88','#3de23e','#416e23', '#c9de53','#c5b2d8','#ec8888','#5957da','#f90303','#d6aa64'],
                hoverBackgroundColor: ['#fde23e','#f16e23', '#57d9ff','#937e88','#3de23e','#416e23', '#c9de53','#c5b2d8','#ec8888','#5957da','#f90303','#d6aa64']
              }
            ]
          };
        }

        if(this.ctype=="line"){
          this.chartLineData = {
            labels: [...this.months].slice(0, 12),
            datasets: [
              {
                label: this.sindicator,
                backgroundColor: 'rgba(220, 220, 220, 0.2)',
                borderColor: '#198754',
                pointBackgroundColor: '#e55353',
                pointBorderColor: '#6610f2',
                data:this.ddata
              }
             
            ]
          };
        }

        if(this.ctype=='doughnut'){
          this.chartDoughnutData = {
            labels:  [...this.months].slice(0, 12),
            datasets: [
              {
                backgroundColor: ['#fde23e','#f16e23', '#57d9ff','#937e88','#3de23e','#416e23', '#c9de53','#c5b2d8','#ec8888','#5957da','#f90303','#d6aa64'],
                data: this.ddata
              }
            ]
          };
        }
       },
       error : err => {
        //  this.toastr.error(err.error, 'Error');
       }
       
     }
     );
  }

  updateInd(ind:String,iid:any,fy:any){
    this.sindicator=ind;
    this.getData(iid,fy);

  }

  updateCtype(ct:any,iid:any,fy:any){
    this.ctype=ct;
    this.getData(iid,fy);
  }

  cFormSubmit(){
    if (this.cForm.valid) {
      this.model = this.cForm.value;
      this.createItem(this.cForm.value.id);
    } else {
      Object.keys(this.cForm.controls).forEach(field => {
        const singleFormControl = this.cForm.get(field);
        singleFormControl?.markAsTouched({onlySelf: true});
      });
    }
  }

 
  // createItem(id = null) {

  //   let upd = this.model;
  //   if (id != "" && id != null) {
  //     this.RS.update(id, upd).subscribe(result => {
  //       this.toastr.success('Item Successfully Updated!', 'Success');
  //       //this.cForm.reset();
  //       this.cForm =this.fb.group(this.formLayout);
  //       this.getList();
  //     }, error => {
  //       this.toastr.error(error.error, 'Error');
  //     });
  //   } else {
  //     this.RS.create(upd).subscribe(result => {
  //       this.toastr.success('Item Successfully Saved!', 'Success');
  //       //this.cForm.reset();
  //       this.cForm =this.fb.group(this.formLayout);
  //       this.getList();
  //     }, error => {
  //       this.toastr.error(error.error, 'Error');
  //     });
  //   }

  // }

  createItem(id = null) {

    let upd = this.model;
    if (id != "" && id != null) {

      this.RS.update(id, upd).subscribe({
        next: (result :any) => {
        this.toastr.success('Item Successfully Updated!', 'Success');
        this.cForm = this.fb.group(this.formLayout)
        this.getList();
      }, error :err=> {
        this.toastr.error(err.error.message, 'Error');
      }
      });
    } else {
      this.RS.create(upd).subscribe({
        next:(result:any) => {
        this.toastr.success('Item Successfully Saved!', 'Success');
        this.cForm = this.fb.group(this.formLayout)
        this.getList();
      }, error:err => {
        this.toastr.error(err.error.message, 'Error');
      }
      });
    }

  }
  getList(pageno?: number | undefined) {
    const page = pageno || 1;
    this.RS.getList(this.pagination.perPage, page, this.searchTerm, this.column, this.isDesc).subscribe({
      next:(result: any) => {
        this.lists = result.data;
        this.pagination.total = result.total;
        this.pagination.currentPage = result.currentPage;
        ///console.log(result);
      },
      error:err => {
        this.toastr.error(err.error, 'Error');
      }
    });
  }

  resetForm(){
    this.cForm =this.fb.group(this.formLayout);
  }

  

  paginatedData($event: { page: number | undefined; }) {
    this.getList($event.page);
  }

  changePerPage(perPage: number) {
    this.pagination.perPage = perPage;
    this.pagination.currentPage = 1;
    this.getList();
  }

  search() {
    this.pagination.perPage=this.srchForm.value.entries;
    this.searchTerm=this.srchForm.value.srch_term;
    this.getList();

  }

  resetFilters() {
    this.isDesc = false;
    this.column = '';
    this.searchTerm = '';
    this.pagination.currentPage = 1;
    this.getList();
  }

  getUpdateItem(id: any) {
   
    this.RS.getEdit(id).subscribe({
      next:(result: any) => {
        this.model = result;
        this.cForm.patchValue(result);
       

      },
      error:(err: any) => {
        this.toastr.error(err.error, 'Error');
      }
    }
    );
  }

  deleteItem(id: any) {
    if (window.confirm('Are sure you want to delete this item?')) {
      this.RS.remove(id).subscribe({
        next:(result: any) => {
        this.toastr.success('Item Successfully Deleted!', 'Success');
        this.getList();
      }, error:(error: { error: any; }) => {
        this.toastr.error(error.error, 'Error');
      }});
    }
  
  }
}

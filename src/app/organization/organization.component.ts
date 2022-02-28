import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgModel } from '@angular/forms';
import { OrganizationService } from './organization.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {

  organizationForm: FormGroup;
  srchForm: FormGroup;

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
  adminlvls: any;
  federals: any;
  parents: any;
  orglevels: any;
  provinces: any;
  districts: any;
  palikas: any;
  wards = new Array(33);
  searchTerm: string = '';
  column: string = '';
  isDesc: boolean = false;
  adminstr: any;


  formLayout: any;
  slct: any;

  constructor(private toastr: ToastrService, private RS: OrganizationService, private fb: FormBuilder) {

    this.formLayout = {
      adm_level: ['1', Validators.required],
      adm_id: ['1', Validators.required],
      parent: [''],
      name: ['', Validators.required],
      code: [''],
      orgidint:['']

    };

  //   this.organizationForm = fb.group({
  //     'adminlevel': ['0',Validators.required],
  //     'orgidint': ['']
  // });


    this.organizationForm = fb.group(this.formLayout);

    this.srchForm = fb.group({
      'entries': new FormControl('10'),
      'srch_term': new FormControl(''),

    })
  }

  ngOnInit(): void {
    this.pagination.perPage = this.perPages[0];
    this.getList();
    this.getAdminlevel();
    this.getFederal();
    // this.getParent();
    this.getOrglevel();
    this.getProvince();
  }

  getProvince() {

    this.RS.getProvinces().subscribe(
      (result: any) => {
        this.provinces = result.data;
        // console.log(this.provinces);
      },
      error => {
        this.toastr.error(error.error, 'Error');
      }
    );


  }

  resetForm() {
    this.organizationForm = this.fb.group(this.formLayout);
    this.districtSelected = false;
    this.stahinayaSelected = false;
    this.adminstr = null;
  }

  getDistricts() {
    this.RS.getDistricts(this.organizationForm.value.provinceid).subscribe(
      {
        next: (v) => {
          console.log(v),
          this.districts = v},
        error: (e) =>{
          console.error(e),
          this.toastr.error(e.error, 'Error');
        } ,
        complete: () => {
          // this.districts = result.data;
        }
    }
      // (result: any) => {
      //   this.districts = result.data;
      //   // console.log(this.provinces);
      // },
      // error => {
      //   this.toastr.error(error.error, 'Error');
      // }
    );
  }

  getDistrictperProvince(id: any) {
    this.RS.getDistricts(id).subscribe({
     next: (result:any) => {
        if(this.organizationForm.value.adminlevel=='99518012939305441'){
          this.adminstr = result.data;
        }else{
          this.distr = result.data;
        }
        
      },
      error : err => {
        this.toastr.error(err.error, 'Error');
      }
      
    }
    );
  }


  getPalika() {
    this.RS.getPalikas(this.organizationForm.value.districtid).subscribe(
      (result: any) => {
        this.palikas = result.data;
        // console.log(this.provinces);
      },
      error => {
        this.toastr.error(error.error, 'Error');
      }
    );
  }

  distr:any;

  getPalikaByDistrict(id: any){
    this.RS.getPalikas(id).subscribe(
      (result: any) => {
        this.adminstr = result.data;
        // console.log(this.provinces);
      },
      error => {
        this.toastr.error(error.error, 'Error');
      }
    );
  }

  districtSelected = false;
  stahinayaSelected = false;
  getAdminStr() {

    if (this.organizationForm.value.adminlevel == "99518012939305441") {
      this.districtSelected = true;
      this.stahinayaSelected = false;
    }

    else if (this.organizationForm.value.adminlevel == "99518012939305442") {
      this.districtSelected = true;
      this.stahinayaSelected = true;
    }

    else {
      this.districtSelected = false;
      this.stahinayaSelected = false;
    }
    this.slct = this.organizationForm.value.adminlevel;
    this.RS.getAdminStr(this.organizationForm.value.adminlevel).subscribe(
      (result: any) => {
        this.adminstr = result.data;
      },
      error => {
        this.toastr.error(error.error, 'Error');
      }
    );
  }

  getAdminlevel() {

    this.RS.getAdminLevel().subscribe(
      (result: any) => {
        this.adminlvls = result.data;
        // console.log(this.provinces);
      },
      error => {
        this.toastr.error(error.error, 'Error');
      }
    );


  }

  getFederal() {

    this.RS.getFederal().subscribe(
      (result: any) => {
        this.federals = result.data;
        // console.log(this.provinces);
      },
      error => {
        this.toastr.error(error.error, 'Error');
      }
    );
  }

  getParent(adminid:any,levelid:any) {

    this.RS.getParentFilter(adminid,levelid).subscribe(
      (result: any) => {
        this.parents = result.data;
        // console.log(this.provinces);
      },
      error => {
        this.toastr.error(error.error, 'Error');
      }
    );
  }

  getOrglevel() {

    this.RS.getOrglevel().subscribe(
      (result: any) => {
        this.orglevels = result.data;
        // console.log(this.provinces);
      },
      error => {
        this.toastr.error(error.error, 'Error');
      }
    );
  }



  organizationFormSubmit() {
    if (this.organizationForm.valid) {
      this.model = this.organizationForm.value;
      this.createItem(this.organizationForm.value.orgidint);
    } else {
      Object.keys(this.organizationForm.controls).forEach(field => {
        const singleFormControl = this.organizationForm.get(field);
        singleFormControl!.markAsTouched({ onlySelf: true });
      });
    }
  }

  createItem(id = null) {

    let upd = this.model;
    if (id != "" && id != null) {

      this.RS.update(id, upd).subscribe(result => {
        this.toastr.success('Item Successfully Updated!', 'Success');
        //this.organizationForm.reset();
        this.organizationForm = this.fb.group(this.formLayout)
        this.getList();
      }, error => {
        this.toastr.error(error.error.message, 'Error');
      });
    } else {
      this.RS.create(upd).subscribe(result => {
        this.toastr.success('Item Successfully Saved!', 'Success');
        //this.organizationForm.reset();
        this.organizationForm = this.fb.group(this.formLayout)
        this.getList();
      }, error => {
        // console.log(error.error.message);
        this.toastr.error(error.error.message, 'Error');
      });
    }

  }
  getList(pageno?: number | undefined) {
    const page = pageno || 1;
    this.RS.getList(this.pagination.perPage, page, this.searchTerm, this.column, this.isDesc).subscribe(
      (result: any) => {
        this.lists = result.data;
        this.pagination.total = result.total;
        this.pagination.currentPage = result.currentPage;
        ///console.log(result);
      },
      error => {
        this.toastr.error(error.error, 'Error');
      }
    );
  }

  search() {
    this.pagination.perPage = this.srchForm.value.entries;
    this.searchTerm = this.srchForm.value.srch_term;
    this.getList();
  }

  paginatedData($event: { page: number | undefined; }) {
    this.getList($event.page);
  }

  changePerPage(perPage: number) {
    this.pagination.perPage = perPage;
    this.pagination.currentPage = 1;
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
    this.RS.getEdit(id).subscribe(
      (result: any) => {
        this.model = result;
        this.organizationForm.patchValue(result);
        this.getAdminStr();
        this.getDistricts();
        this.organizationForm.patchValue(result);
        this.getPalika();
        this.organizationForm.patchValue(result);

      },
      (error: any) => {
        this.toastr.error(error.error, 'Error');
      }
    );
  }

  deleteItem(id: any) {
    if (window.confirm('Are sure you want to delete this item?')) {
      this.RS.remove(id).subscribe((result: any) => {
        this.toastr.success('Item Successfully Deleted!', 'Success');
        this.getList();
      }, (error: { error: any; }) => {
        this.toastr.error(error.error, 'Error');
      });
    }
  }

}

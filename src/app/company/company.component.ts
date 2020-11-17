import { TokenStorageService } from './../auth/token-storage.service';
import { Company } from './../models/company';
import { Router } from '@angular/router';
import { CompanyService } from './../services/company.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  form: any = {};
  companies: Company[];
  companyInfo: Company;
  modalContent = {
    modalTitle: '',
  };

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies() {
    this.companies = [];
    this.companyService.getCompanies().subscribe(
      (res: Company[]) => {
        this.companies = res;

        setTimeout(() => {
          $('#tbl_companies').DataTable();
        }, 500);
      },
      (error) => {
        this.router.navigate(['login']);
      }
    );
  }

  AddCompany(content) {
    this.modalContent.modalTitle = 'Add';
    this.form = {};
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          //this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  onSubmit() {
    if (this.form.companyId === undefined) {
      this.companyInfo = new Company();
      this.companyInfo.companyName = this.form.companyName;
      this.companyInfo.companyEmail = this.form.companyEmail;
      this.companyInfo.companyContact = this.form.companyContact;
      this.companyInfo.isActive = this.form.companyStatus;

      this.companyService.AddCompany(this.companyInfo).subscribe(
        (data) => {
          //console.log(data);
          this.modalService.dismissAll();
          $('#tbl_companies').DataTable().destroy();
          this.getCompanies();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.companyInfo = new Company();
      this.companyInfo.companyId = this.form.companyId;
      this.companyInfo.companyName = this.form.companyName;
      this.companyInfo.companyEmail = this.form.companyEmail;
      this.companyInfo.companyContact = this.form.companyContact;
      this.companyInfo.isActive = this.form.companyStatus;

      this.companyService.UpdateCompany(this.companyInfo).subscribe(
        (data) => {
          //console.log(data);
          this.modalService.dismissAll();
          $('#tbl_companies').DataTable().destroy();
          //this.getCompanies();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  EditCompany(content, company) {
    this.modalContent.modalTitle = 'Edit';
    this.form.companyName = company.companyName;
    this.form.companyEmail = company.companyEmail;
    this.form.companyContact = company.companyContact;
    this.form.companyStatus = company.isActive;
    this.form.companyId = company.companyId;
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          //this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  DeleteCompany(content, companyId) {
    this.form.companyId = companyId;
    this.modalContent.modalTitle = 'Delete';
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          //this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  onSubmitDelete() {
    this.companyService.DeleteCompany(this.form.companyId).subscribe(
      (data) => {
        //console.log(data);
        this.modalService.dismissAll();
        $('#tbl_companies').DataTable().destroy();
        this.getCompanies();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

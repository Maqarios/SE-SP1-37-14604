import { Component } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { LocalDataSource } from 'ng2-smart-table';
import { ItemsService } from '../../../items.service';
import { UserService } from '../../../user.service';
import { Product } from '../product';
import { isString, isNumber } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class SmartTableComponent {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      name: {
        title: 'Name',
        type: 'string',
        addable: true,
        editable: true,
      },
      price: {
        title: 'Price',
        type: 'number',
        addable: true,
        editable: true,
        valuePrepareFunction: (price) => {
          return (price) ? this.currencyPipe.transform(price, '') : 'N/A';
        }
      },
      createdAt: {
        title: 'Created',
        type: 'string',
        addable: false,
        editable: false,
        valuePrepareFunction: (date) => {
          return (date) ? this.datePipe.transform(new Date(date), 'EEEE, MMMM d, y') : 'N/A';
        }
      },
      updatedAt: {
        title: 'Updated',
        type: 'string',
        addable: false,
        editable: false,
        valuePrepareFunction: (date) => {
          return (date) ? this.datePipe.transform(new Date(date), 'EEEE, MMMM d, y') : 'N/A';
        }
      },
      sellerName: {
        title: 'Seller Name',
        type: 'string',
        addable: true,
        editable: true,
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private datePipe: DatePipe, private currencyPipe: CurrencyPipe, private itemsService: ItemsService, private userService: UserService) {
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.itemsService.getProducts().subscribe(res => this.source.load(res.data));
  }

  onCreateConfirm(event): void {
    if (!this.isValid(event)) {
      alert("Make Sure You Entered Correct Values!");
    } else {
      let user = this.userService.user;
      if (!user || user.userType == 'viewer') {
        event.confirm.reject();
      } else {
        this.itemsService.createProduct(event.newData).subscribe(function (res) {
          event.confirm.resolve(res.data);
        });
      }
    }
  }

  onEditConfirm(event): void {
    if (!this.isValid(event)) {
      alert("Make Sure You Entered Correct Values!");
    } else {
      let user = this.userService.user;
      if (!user || user.userType == 'viewer') {
        event.confirm.reject();
      } else {
        this.itemsService.updateProduct(event.newData).subscribe(function (res) {
          event.confirm.resolve(res.data);
        });
      }
    }
  }

  onDeleteConfirm(event): void {
    let user = this.userService.user;
    if (!user || user.userType == 'viewer' || user.userType == 'manager') {
      event.confirm.reject();
    } else {
      this.itemsService.deleteProduct(event.data).subscribe(function (res) {
        event.confirm.resolve((res.data) ? null : res.data);
      });
    }
  }

  isValid(event): boolean {
    return isString(event.newData.name)
      && isNumber(event.newData.price)
      && isString(event.newData.sellerName);
  }
}

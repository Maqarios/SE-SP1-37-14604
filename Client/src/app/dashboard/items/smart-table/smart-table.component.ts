import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ItemsService } from '../../../items.service';
import { Product } from '../product';

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
      },
      createdAt: {
        title: 'Created',
        type: 'string',
        addable: false,
        editable: false,
      },
      updatedAt: {
        title: 'Updated',
        type: 'string',
        addable: false,
        editable: false,
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
  asd: any;

  constructor(private itemsService: ItemsService) {
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.itemsService.getProducts().subscribe(owsa => this.source.load(owsa.data));
  }

  onCreateConfirm(event): void {
    let product: Product = {
      _id: null, // USELESS
      name: event.newData.name,
      price: event.newData.price,
      created: null,
      updated: null,
      sellerName: event.newData.sellerName,
    }
    
    this.itemsService.createProduct(product).subscribe(function (owsa) { });
    event.confirm.resolve();
  }

  onEditConfirm(event): void {
    let product: Product = {
      _id: event.data._id,
      name: event.newData.name,
      price: event.newData.price,
      created: null,
      updated: null,
      sellerName: event.newData.sellerName,
    }

    this.itemsService.updateProduct(product).subscribe(function (owsa) { });
    event.confirm.resolve();
  }

  onDeleteConfirm(event): void {
    let product: Product = {
      _id: event.data._id,
      name: null,
      price: null,
      created: null,
      updated: null,
      sellerName: null,
    }

    this.itemsService.deleteProduct(product).subscribe(function (owsa) { });
    event.confirm.resolve();
  }
}

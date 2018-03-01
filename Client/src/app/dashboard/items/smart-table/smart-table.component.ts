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
      },
      price: {
        title: 'Price',
        type: 'number',
      },
      createdAt: {
        title: 'Created At',
        type: 'string',
      },
      updateAt: {
        title: 'Updated At',
        type: 'string',
      },
      sellerName: {
        title: 'Seller Name',
        type: 'string',
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
    console.log(event.newData.name);
    let product: Product = {
      _id: 0, // USELESS
      name: event.newData.name,
      price: event.newData.price,
      created: Date(),
      updated: Date(),
      sellerName: event.newData.sellerName,
    }
    
    this.itemsService.createProduct(product).subscribe(function (owsa) { });
    event.confirm.resolve();
  }

  onEditConfirm(event): void {
    let product: Product = {
      _id: event.data._id,
      name: event.data.name,
      price: event.data.price,
      created: event.data.createdAt,
      updated: Date(),
      sellerName: event.data.sellerName,
    }

    this.itemsService.updateProduct(product).subscribe(function (owsa) { });
    event.confirm.resolve();
  }

  onDeleteConfirm(event): void {
    let product: Product = {
      _id: event.data._id,
      name: event.data.name,
      price: event.data.price,
      created: event.data.createdAt,
      updated: event.data.updateAt,
      sellerName: event.data.sellerName,
    }

    this.itemsService.deleteProduct(product).subscribe(function (owsa) { });
    event.confirm.resolve();
  }
}

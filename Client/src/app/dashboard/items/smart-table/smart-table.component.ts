import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ItemsService } from '../../../items.service';

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

  constructor(private itemsService: ItemsService) {
  }

  onCreateConfirm(event): void {
    // TODO
    event.confirm.resolve();
  }
  onEditConfirm(event): void {
    // TODO
    event.confirm.resolve();
  }
  onDeleteConfirm(event): void {
    // TODO
    event.confirm.resolve();
  }
}

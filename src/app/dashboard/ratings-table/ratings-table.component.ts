import {Component, Input} from '@angular/core';
import {DashboardComponent} from "../dashboard.component";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-ratings-table',
  templateUrl: './ratings-table.component.html',
  styleUrls: ['./ratings-table.component.css']
})
export class RatingsTableComponent {
  @Input() ratings: any = [];
  @Input() userIdMap = new Map();

  constructor(private dashboardComponent: DashboardComponent,
              private snackbarService: SnackbarService) {}

  getProperty(obj: any, key: string, subKey?: string): any {
    return this.dashboardComponent.getProperty(obj, key, subKey);
  }

  getUserId(userToken: string) {
    if (!this.userIdMap.has(userToken)) {
      return '0';
    }

    return this.userIdMap.get(userToken);
  }

  deleteRating(index: number, id: string) {
    if (window.confirm('Are you sure you want to delete this rating?')) {
      this.ratings.splice(index, 1);
      this.dashboardComponent.serverCommunicationService.deleteRating(id).subscribe(
        response => {
          this.snackbarService.onSuccess("Eintrag wurde erfolgreich gelöscht!");
        },
        error => {
          this.snackbarService.onError("Eintrag konnte nicht gelöscht werden!");
        }
      );
    } else {
      this.snackbarService.onWarning("Löschen des Eintrags wurde abgebrochen!");
    }
  }

  protected readonly String = String;
}

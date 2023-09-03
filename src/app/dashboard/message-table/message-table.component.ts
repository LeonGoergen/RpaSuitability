import {Component, Input} from '@angular/core';
import {DashboardComponent} from "../dashboard.component";

@Component({
  selector: 'app-message-table',
  templateUrl: './message-table.component.html',
  styleUrls: ['./message-table.component.css']
})
export class MessageTableComponent {
  @Input() messages: any = [];
  @Input() userIdMap = new Map();

  constructor(private dashboardComponent: DashboardComponent) {}

  getProperty(obj: any, key: string, subKey?: string): any {
    return this.dashboardComponent.getProperty(obj, key, subKey);
  }

  getUserId(userToken: string) {
    if (!this.userIdMap.has(userToken)) {
      return '0';
    }

    return this.userIdMap.get(userToken);
  }

  protected readonly String = String;
}

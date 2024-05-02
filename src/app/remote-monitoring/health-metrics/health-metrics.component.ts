import { Component, OnInit, Input } from '@angular/core';
import { GraphqlService } from 'src/app/graphql-service/GraphqlService';
import { GET_REMOTE_MONITORING_HEALTH_METRICS } from 'src/app/graphql.module';

@Component({
  selector: 'app-health-metrics',
  templateUrl: './health-metrics.component.html',
  styleUrl: './health-metrics.component.scss'
})
export class HealthMetricsComponent implements OnInit {

  @Input() rmdata;

  healthMetrics: any;

  constructor(
    private graphqlService: GraphqlService
  ) { }

  ngOnInit(): void {
    console.log('this is rmdata', this.rmdata);
    this.getHealthMetrics();
  }

  get remainingDays() {
    const today = new Date(); // Get the current date
    today.setHours(0, 0, 0, 0); // Normalize the time to midnight

    // Normalize the target date to midnight
    const target = new Date(this.rmdata?.endDate);
    target.setHours(0, 0, 0, 0);

    // Calculate the difference in milliseconds
    const diffInMillis = target.getTime() - today.getTime();

    // Calculate the difference in days
    const diffInDays = Math.ceil(diffInMillis / (1000 * 60 * 60 * 24));

    // If the target date is in the past, return 0
    return diffInDays < 0 ? 0 : diffInDays;
  }

  async getHealthMetrics() {
    const result: any = await this.graphqlService.getGraphqlData({
      showLoader: true,
      definition: {
        query: GET_REMOTE_MONITORING_HEALTH_METRICS,
        variables: {
          rmId: this.rmdata?.id,
        },
      },
    });
    if (result) {
      this.healthMetrics = result?.data?.getRemoteMonitoringSetTarget;
    }
  }

}

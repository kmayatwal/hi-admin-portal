import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StateService } from '../../stateService';
import { ToastrService } from 'ngx-toastr';
import { GraphqlService } from 'src/app/graphql-service/GraphqlService';
import { CREATE_REMOTE_MONITORING_NOTES } from 'src/app/graphql.module';
import { UtilityService } from '../../_services/utility.service';

@Component({
  selector: 'app-remote-monitoring-add-notes',
  templateUrl: './remote-monitoring-add-notes.component.html',
  styleUrls: ['../../common.style.scss', './remote-monitoring-add-notes.component.scss']
})
export class RemoteMonitoringAddNotesComponent implements OnInit {

  @Input() data;
  title = '';
  description = '';
  dataloading = false;

  constructor(
    public activeModal: NgbActiveModal,
    public stateService: StateService,
    private toastr: ToastrService,
    private graphqlService: GraphqlService,
    private utilityService: UtilityService,
  ) {
  }

  ngOnInit(): void {
  }

  close() {
    this.activeModal.close();
  }

  onKey(event) {
    this.title = event.target.value;
  }
  onDescriptionKey(event) {
    this.description = event.target.value;
  }

  async createRemoteMonitoringNotes() {
    this.dataloading = true;
    const user = this.utilityService.getCurrentUser();
    console.log(user);
    const result: any = await this.graphqlService.getGraphqlData({
      showLoader: true,
      definition: {
        mutation: CREATE_REMOTE_MONITORING_NOTES,
        variables: {
          rmId: this.data.that?.remoteMonitoringData?.id,
          content: { userId: user?.doctorId || user?.id, profileType: user?.doctorI ? 'DOCTOR' : 'CARE_TEAM', title: this.title, desciption: this.description, userName: user?.firstName }
        },
      },
    });

    if(result.data.createRemoteMonitoringNotes) {
      this.data.that.getRemoteMonitoringNotes();
      this.toastr.success('Note Added successfully');
      this.close();
    }
    this.dataloading = false;
  }
}

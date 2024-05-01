import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
// import * as OT from '@opentok/client';

@Injectable({ providedIn: 'root' })
export class StateService {
  public token$: string;
  public sessionId$: string;
  // public session$: OT.Session = null;
  // public publisher$: OT.Publisher = null;
  public apiKey$: string;
  // public subscribingStreams$: OT.Stream[] = [];
  public callType$: string;
  public appointment$: any;
  public timer$: number = 0;
  public notificationData$: any;
  public archiveId$: string;
  public callRecording$: boolean;
  public doctorProfile$: any;
  public userName$: string;
  public userId$: string;
  public prescription$: boolean;
  public prescriptionData$: any;
  public prescriptionMedicines$: any;
  public prescriptionPreview$: boolean;
  public prescriptionView$: boolean;
  public patientFile$: any;
  public doctorData$: any;
  public clinicData$: any;
  public country$: any;
  public clinicWalletFee$: any;
  public virtualWalletFee$: any;
  public treatmentFee$: any;
  public clinicAssessment$: any;
  public selectedClinic$: any;
  public appointmentTreatment$: any;
  public vitalIds$: any;
  public userData$: any;
  public labOrderPreviewData$: any;
  public showMiniVideoCall$: boolean;
  public bodyPartSelected$: string;
  public bodyCanvas$: any;
  public selectedPhysicalExam$: any;
  public physicalExaminationImages$: any;
  public appointmentBillingDetail$: any;
  public speechText$: string;
  private dataSubject = new Subject<any>();

  public hiCommunity: any;
  public hiCommunityUser: any;

  public articleDescription$: any;

  constructor() { }

  sendData(data: any) {
    this.dataSubject.next(data);
  }

  getData() {
    return this.dataSubject.asObservable();
  }
}

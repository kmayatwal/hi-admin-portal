import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbTypeahead, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-reminder',
  templateUrl: './add-reminder.component.html',
  styleUrls: ['./add-reminder.component.scss']
})
export class AddReminderComponent implements OnInit {

  @Input() data;

  reminderForm: FormGroup;

  reminderError: string = '';

  readingDateError: string = '';
  readingTimeError: string = '';

  month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  maxDate = new Date();

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.initReminderForm();
  }

  initReminderForm() {
    this.reminderForm = this.formBuilder.group({
      reminder: ['', [Validators.required]],

      reading_date: ['', [Validators.required]],
      reading_time: ['', [Validators.required]],
    });
  }

  checkReminderStyleError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required') || formControl.hasError('pattern')) {
        return true;
      }
  }

  checkReminderError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required')) {
        this.reminderError = 'This field is required.';
        return true;
      }
  }

  checkReadingDateStyleError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required') || formControl.hasError('pattern')) {
        return true;
      }
  }

  checkReadingDateError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required')) {
        this.readingDateError = 'This field is required.';
        return true;
      }
  }

  checkReadingTimeStyleError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required') || formControl.hasError('pattern')) {
        return true;
      }
  }

  checkReadingTimeError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required')) {
        this.readingTimeError = 'This field is required.';
        return true;
      }
  }

  saveReminder() {
    if (this.reminderForm.valid) {
      let tempData = {
        ... this.reminderForm.value
      }
      let reminder = this.reminderForm.get('reminder').value;
      let date = new Date(this.reminderForm.get('reading_date').value);
      let time = this.reminderForm.get("reading_time").value;
      tempData['time'] = new Date(`${this.month[date.getMonth()]} ${date.getDate()} ${date.getFullYear()} ${time}:00`);

      let tempReminderList = this.data.that.reminderList;

      if (tempReminderList.findIndex(item => item.reminder === reminder) > -1)
        tempReminderList.splice(tempReminderList.findIndex(item => item.reminder === reminder), 1);
      tempReminderList.push(tempData);

      this.data.that.reminderList = tempReminderList;
      this.close();
    } else {
      this.reminderForm.markAllAsTouched();
      this.toastr.error('Please fill all the mandatory fields');
    }
  }

  get rf() { return this.reminderForm.controls; }

  close() {
    this.activeModal.close();
  }

}

import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/api.service';
import { StateService } from '../../stateService';
import { Router } from '@angular/router';
import { CREATE_BLOG } from 'src/app/graphql.module';
import { GraphqlService } from 'src/app/graphql-service/GraphqlService';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss', '../../common.style.scss']
})
export class CreateArticleComponent implements OnInit {

  @Output('back') back: EventEmitter<any> = new EventEmitter();

  createArticleForm: FormGroup;

  blogTitleError: string = '';
  videoURLError: string = '';
  referenceURLError: string = '';
  postedByError: string = '';

  tempFeaturedURL: any;
  featuredURL: string = '';
  featuredImageName: string = '';

  showPreviewArticle: boolean = false;
  showDraftPreview: boolean = true;
  previewArticleData: any;


  showBlogCategoryList: boolean = false;
  blogCategoryDataList = [
    {
      id: 1,
      value: 'Cardiology',
    },
    {
      id: 2,
      value: 'Diet',
    },
    {
      id: 3,
      value: 'Infection',
    },
    {
      id: 4,
      value: 'Lifestyle',
    },
    {
      id: 5,
      value: 'Skincare',
    },
    {
      id: 6,
      value: 'Oncology',
    },
    {
      id: 7,
      value: 'Ophthalmology',
    },
    {
      id: 8,
      value: 'Women’s health',
    },
    {
      id: 9,
      value: 'Urology',
    },
  ];
  blogCategoryFieldWidth = '';

  constructor(
    private spinner: NgxSpinnerService,
    private apiService: ApiService,
    private stateService: StateService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private graphqlService: GraphqlService,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.initCreateArticleForm();
  }

  initCreateArticleForm() {
    this.createArticleForm = this.formBuilder.group({
      blogTitle: new FormControl('', [Validators.required]),
      videoURL: new FormControl(''),
      blogCategory: new FormControl('', [Validators.required]),
      referenceURL: new FormControl(''),
      postedBy: new FormControl(''),
    });
  }

  checkBlogTitleStyleError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required') || formControl.hasError('blogTitle')) {
        return true;
      }
  }

  checkBlogTitleError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required')) {
        this.blogTitleError = 'This field is required.';
        return true;
      }
  }

  checkVideoURLStyleError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required') || formControl.hasError('videoURL')) {
        return true;
      }
  }

  checkVideoURLError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required')) {
        this.videoURLError = 'This field is required.';
        return true;
      }
  }

  checkReferenceURLStyleError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required') || formControl.hasError('referenceURL')) {
        return true;
      }
  }

  checkReferenceURLError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required')) {
        this.referenceURLError = 'This field is required.';
        return true;
      }
  }

  checkPostedByStyleError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required') || formControl.hasError('postedBy')) {
        return true;
      }
  }

  checkPostedByError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required')) {
        this.postedByError = 'This field is required.';
        return true;
      }
  }

  openBlogCategoryList() {
    let blogCategoryField = document.getElementById('blogCategoryField') as HTMLDivElement;
    let blogCategoryInputField = document.getElementById('blogCategoryInputField') as HTMLInputElement;
    blogCategoryInputField.focus();
    this.blogCategoryFieldWidth = `${blogCategoryField.offsetWidth}px`;
    this.showBlogCategoryList = true;
  }

  setBlogCategory($event) {
    let blogCategoryInputField = document.getElementById('blogCategoryInputField') as HTMLInputElement;
    blogCategoryInputField.blur();
    this.createArticleForm.get('blogCategory').setValue($event.value);
    this.showBlogCategoryList = false;
  }

  uploadImageFileDND(files: Array<any>, funcName) {
    let tempEvent = {
      target: {
        files: files
      }
    }
    this[funcName](tempEvent);
  }

  onSelectFeaturedImagesFile(event) {

    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    let imgFile = <File>event.target.files[0];

    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.tempFeaturedURL = reader.result;
      }
    }
    if (imgFile) {
      this.spinner.show();
      this.apiService.imgUpload(imgFile, 'single').subscribe((data: any) => {
        this.featuredURL = data[0].url;
        this.featuredImageName = this.featuredURL.split('/')[this.featuredURL.split('/').length - 1];
        this.spinner.hide();
      },
        error => {
          this.spinner.hide();
          if (error.statusText == 'Unauthorized') {
            this.toastr.error('user session has been expired please relogin');
            this.router.navigateByUrl('/login');
          }
        });
    }
  }

  removeFeaturedImages(url, index) {
  }

  publish() {
    this.createArticle();
  }

  async createArticle() {
    if (this.createArticleForm.valid) {
      if (!this.tempFeaturedURL) {
        this.toastr.error('Please add featured image');
        return;
      }

      if (!this.stateService.articleDescription$ || this.stateService.articleDescription$ === '') {
        this.toastr.error('Please add content in article description');
        return;
      }

      let content = {
        images: this.featuredURL,
        title: this.createArticleForm.get('blogTitle').value,
        description: this.stateService.articleDescription$,
        videoUrls: this.createArticleForm.get('videoURL').value,
        categories: this.createArticleForm.get('blogCategory').value,
        referenceUrls: this.createArticleForm.get('referenceURL').value,
        username: this.createArticleForm.get('postedBy').value
      }

      const result: any = await this.graphqlService?.getGraphqlData({
        showLoader: true,
        definition: {
          mutation: CREATE_BLOG,
          variables: {
            content
          },
        },
      });
      if (result)
        this.back.emit('');
    } else {
      this.createArticleForm.markAllAsTouched();
      this.toastr.error('Please fill all the mandatory fields');
    }

  }

  cancel() {
    this.back.emit('');
  }

  preview() {
    let blogData = {}
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    const readTime = Math.ceil(this.stateService.articleDescription$.length / 200);

    if (!Boolean(this.tempFeaturedURL)) {
      blogData = {
        // ...getFeedById,
        formattedDate,
        readTime,
        images: "/assets/images/dha-logo.svg",
      };
    }


    blogData = { images: this.tempFeaturedURL, formattedDate, readTime, username: this.createArticleForm.get('postedBy').value };
    const htmlContentFromApi = this.stateService.articleDescription$;
    let safeHtml = this.sanitizer.bypassSecurityTrustHtml(htmlContentFromApi);
    let article = {
      blogData,
      safeHtml
    }
    this.showPreviewArticle = true;
    this.previewArticleData = article;
  }

  goBack() {
    this.showPreviewArticle = false;
    this.previewArticleData = null;
  }

  get caf() { return this.createArticleForm.controls; }

  @HostListener('document:click', ['$event'])
  clickout(event) {

    if (document.getElementById('blogCategoryField') && !document.getElementById('blogCategoryField').contains(event.target)) {
      this.showBlogCategoryList = false;
    }

  }

}

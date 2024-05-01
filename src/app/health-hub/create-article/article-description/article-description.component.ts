import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { StateService } from '../../../stateService';

@Component({
  selector: 'app-article-description',
  templateUrl: './article-description.component.html',
  styleUrl: './article-description.component.scss'
})
export class ArticleDescriptionComponent implements OnInit {

  // description: string = '';
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '15rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    showToolbar: true,
    toolbarHiddenButtons: [
      ['insertImage', 'subscript', 'superscript', 'indent', 'outdent', 'link', 'unlink', 'insertVideo', 'insertHorizontalRule', 'clearFormatting', 'toggleEditorMode']
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  constructor(public stateService: StateService) { }

  ngOnInit(): void {

  }

}

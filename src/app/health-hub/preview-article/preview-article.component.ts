import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GraphqlService } from "src/app/graphql-service/GraphqlService";
import { GET_BLOG } from "src/app/graphql.module";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
  selector: 'app-preview-article',
  templateUrl: './preview-article.component.html',
  styleUrl: './preview-article.component.scss'
})
export class PreviewArticleComponent implements OnInit {

  @Output('goBack') goBack: EventEmitter<any> = new EventEmitter();
  @Input() blogId: any;

  blogData: any = [];
  featuredBlog: any = [];
  formattedData: any = {};
  public safeHtml: SafeHtml;

  constructor(
    private graphqlService: GraphqlService,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.getBlog(this.blogId);
  }

  async getBlog(id: any) {
    const result: any = await this.graphqlService?.getGraphqlData({
      showLoader: true,
      definition: {
        query: GET_BLOG,
        variables: {
          id,
        },
      },
    });
    const { getFeedById } = result.data;

    const date = new Date(getFeedById.createdAt);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    const readTime = Math.ceil(getFeedById.description.length / 200);

    if (!Boolean(getFeedById.images)) {
      this.blogData = {
        ...getFeedById,
        formattedDate,
        readTime,
        images: "/assets/images/profile/hi-logo.svg",
      };
    }

    this.blogData = { ...getFeedById, formattedDate, readTime };
    const htmlContentFromApi = getFeedById.description;
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(htmlContentFromApi);
  }

  back() {
    this.goBack.emit();
    // this.router.navigate(["/blogs"]);
  }
}

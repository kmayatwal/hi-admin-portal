import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GET_BLOGS } from "../../graphql.module";
import { GraphqlService } from "../../graphql-service/GraphqlService";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss', '../../common.style.scss']
})
export class ArticleListComponent implements OnInit {

  @Output('readMore') readMore: EventEmitter<any> = new EventEmitter();

  blogLists: any[] = [];
  searchText: string = '';

  constructor(
    private graphqlService: GraphqlService,
  ) { }

  ngOnInit(): void {
    this.getBlogs('');
  }

  async getBlogs(searchText) {
    const result: any = await this.graphqlService?.getGraphqlData({
      showLoader: true,
      definition: {
        query: GET_BLOGS,
        variables: {
          searchTerm: searchText || undefined,
          page: {
            pageNumber: 1,
            perPage: 12
          },
        },
      },
    });
    this.blogLists = result.data?.getFeeds?.response || [];
    console.log('this is blogLists', this.blogLists);
  }

  serachCommunity(val) {
    this.getBlogs(val);
  }

  setReadMore(blog) {
    this.readMore.emit(blog?.id);
  }

}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleDescriptionComponent } from './article-description.component';

describe('ArticleDescriptionComponent', () => {
  let component: ArticleDescriptionComponent;
  let fixture: ComponentFixture<ArticleDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleDescriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArticleDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

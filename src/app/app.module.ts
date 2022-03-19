import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostComponent } from './posts/post/post.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

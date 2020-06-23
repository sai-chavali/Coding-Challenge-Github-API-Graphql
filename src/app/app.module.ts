import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from "apollo-link";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { RepoComponent } from './repo/repo.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    RepoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(apollo:Apollo, httpLink: HttpLink){
    const middlewareLink = new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: {
          authorization: `bearer `+ '0bfee4b086418306bf1513b0b397b93d1dd937ad'
        }
      });
      return forward(operation);
    });
    apollo.create({
      link: middlewareLink.concat(httpLink.create({uri : 'https://api.github.com/graphql'})),
      cache: new InMemoryCache()
    })
  }
}

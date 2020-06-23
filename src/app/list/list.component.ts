import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import gql from 'graphql-tag';

import { Node, Query } from '../types'
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  repos: Observable<Node[]>
  constructor(private apollo:Apollo) { }

  ngOnInit() {
    this.repos = this.apollo.watchQuery<Query>({
      query: gql`
        query publicRepos{
          search(query: "is:public", type: REPOSITORY, first: 10) {
            edges {
              node {
                ... on Repository {
                  name
                  owner{
                    ... on User {
                      login
                      name
                    }
                    ... on Organization{
                      login
                      name
                    }
                  }
                  url
                }
              }
            }
          }
        }
      `
    }).valueChanges
    .pipe(map(result => result.data.search.edges))
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import ApolloClient from "apollo-client";
import { HttpLink } from 'apollo-angular-link-http';
import gql from 'graphql-tag';

import { RepoInfo } from '../types'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.css']
})
export class RepoComponent implements OnInit {
  name: string;
  owner: string;
  repoData:object = {};

  constructor(private route: ActivatedRoute, private apollo:Apollo, private httpLink:HttpLink) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.name = params['name']
      this.owner = params['owner']
    })
    const middlewareLink = new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: {
          authorization: `bearer `+ '0bfee4b086418306bf1513b0b397b93d1dd937ad'
        }
      });
      return forward(operation);
    });
    const client = new ApolloClient({
      link: middlewareLink.concat(this.httpLink.create({uri:'https://api.github.com/graphql'})),
      cache: new InMemoryCache()
    })
    client.query({
      query: gql`
        query getRepoInfo($name:String!,$owner:String!){
          repository(name:$name,owner:$owner){
          url
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
          description
          languages(first:5){
            nodes{
              name
            }
          }
          stargazers(first:1){
            totalCount
          }
          nameWithOwner
        }
      }
      `,variables:{name: this.name, owner: this.owner}
    }).then(res =>this.repoData = res.data.repository)
  }

}
          // collaborators(first:10){
          //   nodes{
          //     name
          //   }
          // }
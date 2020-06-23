export type Query = {
    search: search
}

export type Repo = {
    name: string;
    owner: Owner;
    url: string;
}

export type Owner = {
    name:string;
    login:string;
}

export type RepoQuery = {
    repository: RepoInfo
}

export type RepoInfo = {
    url: string;
    description: string;
    languages: object;
    stars: object;
    collaborators: object;
}

export type search = {
    edges: Node[]
}

export type Node = {
    node: Repo
}

export type Contributor = {
    name: string;
    email: string;
}
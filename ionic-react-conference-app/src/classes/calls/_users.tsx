/* tslint:disable interface-name jsx-no-lambda */


// https://docs.strapi.io/developer-docs/latest/development/plugins/graphql.html


import { useMutation, useQuery } from "@apollo/react-hooks"
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonRow,
  IonText
} from "@ionic/react"
import { gql } from "apollo-boost"
import React from "react"

const STRAPI_REGISTER = gql`mutation {
  register(input: { username: "username", email: "email", password: "password" }) {
    jwt
    user {
      username
      email
    }
  }
}`

const STRAPI_LOGIN = gql`mutation {
  login(input: { identifier: "email", password: "password" }) {
    jwt
  }
}
`

const STRAPI_QUERY = gql`query {
  user(id: "5aafe871ad624b7380d7a224") {
    username
    email
  }
}
`

const STRAPI_UPDATE = gql`mutation {
  updateUser(
    input: {
      where: { id: "5b28f1747c739e4afb48605c" }
      data: { username: "John", email: "john@doe.com" }
    }
  ) {
    user {
      username
      email
    }
  }
}
`

const STRAPI_DELETE = gql`mutation {
  deleteUser(input: { where: { id: "5b28f1747c739e4afb48605c" } }) {
    user {
      username
      email
    }
  }
}
`
const USER_QUERY = gql`query {
  users(limit: 10, start: 10, sort: "username:asc", where: { email_contains: "@strapi.io" }) {
    username
    email
  }
  restaurants(
    limit: 10
    where: { _id_nin: ["5c4dad1a8f3845222ca88a56", "5c4dad1a8f3845222ca88a57"] }
  ) {
    _id
    name
  }
}
`


/*
import "./home.css"

const NEW_VARIABLES = {
  variables: {
    author: "New",
    id: 4,
    postid: 4,
    title: "New Post"
  }
}

const UPDATE_VARIABLES = {
  variables: {
    id: 4,
    title: "Updated Post"
  }
}

const DELETE_VARIABLES = {
  variables: {
    id: 1
  }
}

const ALL_POSTS = gql`
  {
    allPosts {
      id
      postid
      title
      author
    }
  }
`

const ADD_POST = gql`
  mutation($id: ID!, $postid: Int!, $title: String!, $author: String!) {
    createPost(id: $id, postid: $postid, title: $title, author: $author) {
      id
      postid
      title
      author
    }
  }
`

const UPDATE_POST = gql`
  mutation($id: ID!, $title: String!) {
    updatePost(id: $id, title: $title) {
      id
      postid
      title
      author
    }
  }
`

const DELETE_POST = gql`
  mutation($id: ID!) {
    removePost(id: $id)
  }
`

interface Post {
  id: string
  postId: number
  title: string
  author: string
}

interface Data {
  allPosts: Post[]
}

function Home() {
  const { loading, error, data } = useQuery<Data>(ALL_POSTS)

  const [addPost] = useMutation(ADD_POST, {
    update(cache, { data: { createPost } }) {
      const queryResult = cache.readQuery<Data>({ query: ALL_POSTS })
      const allPosts = queryResult?.allPosts
      cache.writeQuery({
        data: { allPosts: allPosts?.concat([createPost]) },
        query: ALL_POSTS
      })
    }
  })

  const [updatePost] = useMutation(UPDATE_POST)

  const [deletePost] = useMutation(DELETE_POST, {
    update(cache) {
      const queryResult = cache.readQuery<Data>({ query: ALL_POSTS })
      const allPosts = queryResult?.allPosts
      const {
        variables: { id }
      } = DELETE_VARIABLES
      allPosts?.splice(id - 1, 1)
      cache.writeQuery({
        data: { allPosts },
        query: ALL_POSTS
      })
    }
  })

  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>`Error! ${error.message}`</p>
  }

  return (
    <IonContent>
      <div className="ion-padding">
        <h1>Ionic React GraphQL Example</h1>
      </div>
      <div className="ion-padding">
        <IonButton onClick={() => addPost(NEW_VARIABLES)}>Add Post</IonButton>
        <IonButton onClick={() => updatePost(UPDATE_VARIABLES)}>
          Update Post
        </IonButton>
        <IonButton onClick={() => deletePost(DELETE_VARIABLES)}>
          Delete Post
        </IonButton>
      </div>
      <IonGrid className="ion-padding">
        <IonRow>
          <IonCol sizeMd="2" className="col-border bgcolor ion-text-center">
            <IonText color="primary">Id</IonText>
          </IonCol>
          <IonCol sizeMd="2" className="col-border bgcolor ion-text-center">
            <IonText color="primary">Title</IonText>
          </IonCol>
          <IonCol sizeMd="2" className="col-border bgcolor ion-text-center">
            <IonText color="primary">Author</IonText>
          </IonCol>
        </IonRow>
        {data!.allPosts!.map(post => (
          <IonRow key={post.id}>
            <IonCol sizeMd="2" className="col-border ion-text-center">
              {post.id}
            </IonCol>
            <IonCol sizeMd="2" className="col-border ion-text-center">
              {post.title}
            </IonCol>
            <IonCol sizeMd="2" className="col-border ion-text-center">
              {post.author}
            </IonCol>
          </IonRow>
        ))}
      </IonGrid>
    </IonContent>
  )
}

export default Home

*/
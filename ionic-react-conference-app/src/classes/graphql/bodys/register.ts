export const register = ()=>{
    return `mutation {
        register(input: { username: "alloyuser", email: "email@gmail.com", password: "password" }) {
            jwt
            user {
                username
                email
            }
    }`;
  }
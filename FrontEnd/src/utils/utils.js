import authHeader from "../components/auth/authHeader";

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function isEmpty(value) { return (value.trim().length === 0) ? true : false }

export function isEmail(value) { return emailRegex.test(value) ? true : false }


const APIURL= "http://localhost:3001/"
export function getUrl(){return "http://localhost:3001/"}

export function setValidate(element) {
  if (element.length > 0) {
    return 'is-invalid'
  }
  else {
    return 'is-valid'
  }
}

export async function postData(url='', data = {}) {
  // Default options are marked with *
  // var myHeaders = new Headers();
  // myHeaders.append("Content-Type", "application/json");
  // myHeaders.append(data.header);

  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: authHeader(),
    // headers:myHeaders,
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response; // parses JSON response into native JavaScript objects
}

export async function getData(url = '',data) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'GET',
    headers: authHeader(),
    // headers: {
    //   'Content-Type': 'application/json',
    //   "Authorization": `Bearer ${token}`
    // },
     redirect: 'follow'
  })
  return response.json(); // parses JSON response into native JavaScript objects
}

export async function putData(url = '', data = {}) {
  // const myHeaders = new Headers();
  // myHeaders.append("Content-Type", "application/json");
  // myHeaders.append("Authorization", `Bearer ${data.token}`);


  const requestOptions = {
    method: 'PUT',
    headers: authHeader(),
    body: JSON.stringify(data),
    redirect: 'follow'
  };

  const response = await fetch(url, requestOptions)
  // .then(response => response.text())
  // .then(result => console.log(result))
  // .catch(error => console.log('error', error));
  return response.json()
}

export async function deleteData(url = '',data) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'DELETE',
    headers: authHeader(),
    // headers: {
    //   'Content-Type': 'application/json',
    //   "Authorization": `Bearer ${token}`
    // },
     redirect: 'follow'
  })
  return response.json(); // parses JSON response into native JavaScript objects
}
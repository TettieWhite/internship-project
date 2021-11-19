export default async function requestApi(url, method, data = null) {
  try {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
    headers.append('Origin', 'http://localhost:3000');

    let body;
    if (data) {
      headers.append('Content-Type', 'application/json');
      body = JSON.stringify(data);
    }

    const response = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
      method,
      headers,
      body,
    });

    if (!response.ok) {
      console.log(response.error);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
}

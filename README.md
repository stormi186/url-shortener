# URL Shortener Microservice

This service will shorten URL to random number and store it in database.

A Full-stack JavaScript application built using Node, Express, MongoDB, Mongoose, JavaScript, HTML, CSS and Bootstrap

## User Stories

- I can POST a URL to [project_url]/new and I will receive a shortened URL in the JSON response.
- If I pass an invalid URL that doesn't follow the http(s) format, the JSON response will contain an error: {"error":"invalid URL"}.
- When I visit the shortened URL, it will redirect me to my original link.

## Example Usage
```
https://my-short-url.herokuapp.com/new/www.google.com
```

## Example Output

```javascript
{ 
  "original_url":"www.google.com",
  "short_url":"25535"
}
```
Visiting https://my-short-url.herokuapp.com/25535 will then redirect you to www.google.com.

## Live Preview

[https://my-short-url.herokuapp.com/](https://my-short-url.herokuapp.com/)

## URL Shortener

This service takes a valid URL and return a shortened URL version of it and redirects the user to the orignal URL

Also keeps track of user clicks

### Routes

- POST /url -> generates a new short url
- GET  /url/:id -> redirects user to orignal url
- GET  /url/analytics/:id -> return number of clicks

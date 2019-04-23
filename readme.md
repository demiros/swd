# swd
Support guy tool
> This is a simple support tool for na easy access to templates and tickets records.
The application is made to be customized by every user, and cannot be actually used out-of-the-box.


**Requirements:**
- MongoDB
- NodeJS

**Installation:**
```
git clone
npm cache clear
npm install package.json
```
**Configs:**

*Express port:*
```
[~/sgm]: grep -n 'var port' bin/www
15:var port = normalizePort(process.env.PORT || '3000');
```
*Mongo connection string:*
```
[~/sgm]: grep -n mongoDB app.js
18:var mongoDB = 'mongodb://localhost:27017/sgm';
```
**How to Run:**
1. Start MongoDB server, e.g.
- $ mongod

2. The app
- $ node bin/www

# Smart Bid Node.js Sails Application

a [Sails v1](https://sailsjs.com) application


### Links

+ [Sails framework documentation](https://sailsjs.com/get-started)
+ [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](https://sailsjs.com/support)
+ [Professional / enterprise options](https://sailsjs.com/enterprise)


### Production Deployment

+ Current location on server: **/var/www/nodebackend**
+ Recomended tool to run Node app on production: **pm2**
+ To start PRODUCTION pm2: **NODE_ENV=production pm2 start app.js**
+ Please be sure to setup proper ENV to run in produciton mode.
+ Be sure to setup DB credentials and other local config: *config/local.js*

+ To check current pm2 process log: **pm2 log**
+ To check log file: **tail -400 /root/.pm2/logs/app-error.log**
+ To restart pm2 after updating app files with *git pull* or other: **pm2 restart all** or pm2 process ID

### Local Deployment

To start nodemon, just run in the project root: **nodemon app.js**
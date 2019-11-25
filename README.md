# uploader

## 1. Environment values
### Wasabi Configuration
#### 1. [Create Wasabi Account](https://wasabi.com/wp-content/themes/wasabi/docs/User_Guide/topics/Signing_Up_for_a_Trial_Account.htm)
#### 2. [Create new bucket](https://wasabi.com/wp-content/themes/wasabi/docs/User_Guide/topics/Creating_a_Bucket.htm)
*note:* We are using **us-east-2** region on our project.
#### 3. [Create a Root Access Key and Secret Key](https://wasabi-support.zendesk.com/hc/en-us/articles/360019677192-Creating-a-Root-Access-Key-and-Secret-Key)
#### 4. Add Access keys and bucket name into `.env.local`
```dotenv
VUE_APP_WASABI_ACCESS_KEY_ID = ''
VUE_APP_WASABI_SECRET_ACCESS_KEY = ''
VUE_APP_WASABI_BUCKET = ''
```
### Add Stellar Secret Key
```dotenv
VUE_APP_STELLAR_SECRET_KEY = ''
```
## 2. Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run electron:serve
```

### Compiles and minifies for production
```
npm run electron:build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

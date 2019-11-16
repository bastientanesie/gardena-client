# gardena-pwa

## Install

Generate VAPID key with [web-push](https://www.npmjs.com/package/web-push), then :

```bash
docker-compose build
cp docker-compose.override.yml.dist docker-compose.override.yml
nano docker-compose.override.yml
cp .env.dist .env
nano .env
docker-compose up -d --remove-orphans
```

## Usage

- Build : `docker-compose build`
- Start : `docker-compose up -d --remove-orphans`
- Stop : `docker-compose down --remove-orphans`
- Logs : `docker-compose logs --tail=50 --timestamps`

## Docker permissions

The app must write files inside the `./data` folder. To match a specific host user inside Docker, copy the override file and edit it with the needed user ids :

```bash
cp docker-compose.override.yml.dist docker-compose.override.yml
nano docker-compose.override.yml
```

## Documentation

### Web Push

- [Push API - Web APIs MDN](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)
- [web-push - NPM](https://www.npmjs.com/package/web-push)
- [🚀🔔Beginners guide to Web Push Notifications using Service Workers](https://medium.com/izettle-engineering/beginners-guide-to-web-push-notifications-using-service-workers-cb3474a17679)

### Service Workers

- https://developer.mozilla.org/en-US/docs/Web/API/Worker/postMessage
- https://serviceworke.rs/immediate-claim.html
- https://love2dev.com/blog/how-to-uninstall-a-service-worker/
- https://developers.google.com/web/fundamentals/primers/service-workers
- Firefox :
    - about:serviceworkers
    - about:debugging#/runtime/this-firefox

Vue-specific :

- https://github.com/yyx990803/register-service-worker/issues/6#issuecomment-467950072
- https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa

## Development setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

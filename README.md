# Connected Kingston - Backend
This is a [Vue.js](https://vuejs.org/) SPA (Single Page App) using [Vue Router](https://router.vuejs.org) for the routing. Therefore, a good knowledge of both Vue.js and Vue Router is expected when working on this project.

This is a static site that is intended to be hosted on an amazon S3 bucket.

All logic is handled by [the API](https://github.com/royalBoroughKingston/ck-api) - so you can think of this app as purely an interface for the API.

## Installation
```bash
# Copy the example .env and fill in the empty variables.
cp .env.example .env

# Install the NPM dependencies.
npm install
```

### Development
```bash
# Start a development server with hot-reload.
npm run serve
```

### Test
```bash
# Run the linter and automatically fix any issues.
npm run lint --fix

# Run unit tests (no tests currently written).
npm run test:unit

# Run end-to-end tests (no tests currently written).
npm run test:e2e
```

## Deploy
Deployment is handled automatically with CI/CD using TravisCI.
Below is the commands that TraviCI uses to build the application.

```bash
npm run build
```

## Built With
* [Vue.js](https://vuejs.org/) - The JavaScript Framework Used

## Contributing
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning
We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/RoyalBoroughKingston/ck-backend/tags).

## Authors
* [Ayup Digital](https://ayup.agency/)

See also the list of [contributors](https://github.com/RoyalBoroughKingston/ck-backend/contributors) who participated in this project.

## License
This project is licensed under the GNU AGPLv3 License - see the [LICENSE.md](LICENSE.md) file for details.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in development mode.\
Open [http://localhost:52051](http://localhost:52051) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn dev:production`

Runs the app in production mode.\
Open [http://localhost:52051](http://localhost:52051) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn cypress`

Launches the cypress test runner. This project does not have unit tests, just end to end.

Make sure both the server and the UI are running.

You will need a `cypress.env.json` file with the following:
- apiURL
- email
- password
- baseURL
- jwtTokenName
- userFirstName

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# ios notes

## Creating app in app store

1. Go [here](https://developer.apple.com/account/resources/identifiers/bundleId/add/bundle) to create a bundle certificate.
2. Go [here](https://appstoreconnect.apple.com/apps) to create the new app.

## Creating assets

- Add files named `icon.png` and `splash.png` to the `/resources` folder, then run:
  ```
  yarn create:assets && npx cap run ios
  ```
- Open Xcode and go to LaunchScreen -> View Controller -> splash, in the right hand menu panel:
  - Set Content Mode to "Aspect Fit"
  - Set the Background to the same background-color as the splash screen image

## Associated Domains

Setting these will allow your app to open with universal linking, [read more here](https://developer.apple.com/documentation/xcode/supporting-associated-domains).

- Open your project in Xcode:
  - Select the top level app on the left hand menu
  - Click the sub navigation link "Signing & Capabilities"
  - Click the `"+"` sign next to `All` in the Signing & Capabilities window
  - Search for "Associated Domains" and double click it to add
  - Add the domains you would like to open the app when navigated to in a browser in the form of `applinks:YOUR_DOMAIN_HERE`
  - Ensure those domains have a folder in their root `/.well-known` with the `apple-app-site-association` file inside

## Settings

- Generic versioning
  - Under Build Settings, set the `Current Project Version` to `1` if not already set
  - Set `Versioning System` to `Apple Generic`

## Deployment

The app deploys whenever the `dev` or `main` branches are updated. These are protected branches so you must create a PR to update them.

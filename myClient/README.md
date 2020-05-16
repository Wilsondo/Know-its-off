This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Author's Notes

Development for this project was done largely using the yarn commands listed below, running the react on its own development server. This was done on a personal computer and used with nginx to connect it all together. To run the development server on OSU engr flip servers you will have to use npm as yarn is not available. There may be some errors relates to the version of npm on the servers, you might try running a virtual enviornment with a different version of npm.

### To Build

You should be able to build the static files for the flask server with either yarn or npm. On engr you will have to use npm as yarn isnt avilable. First run `npm install` to build the node_modules, also remove node_modules and run `npm install` if you have issues. Then do `npm run build`.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!


### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## React Resources

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Other Links

DnD Grid based on: https://medium.com/better-programming/how-to-build-a-drag-and-drop-grid-in-react-3008c5384b29
This is where I started on the drag-and-drop style reactive home page for the scouts using cards.

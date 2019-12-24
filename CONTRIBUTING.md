# Contributing

## Setting up Dev Environment

### Cloning the Repository:

Using SSH
```
git clone git@github.com:Codebrahma/react-flexible-sliding-menu.git
```
or Using HTTPS
```
git clone https://github.com/Codebrahma/react-flexible-sliding-menu.git
```

### Installing Dependencies:

```
cd react-flexible-sliding-menu
npm install
```

### Create Testing App:
Testing App should be present outside `react-flexible-sliding-menu`, we suggest create `testing-app` as a sibling folder.
```
npx create-react-app testing-app
```
If you followed the steps correctly your folder structure should look like this:
```
react-flexible-sliding-menu/
testing-app/
```

### Linking `react` and `react-dom` to `testing-app`:
```
cd react-flexible-sliding-menu
npm link ../testing-app/node_modules/react
npm link ../testing-app/node_modules/react-dom
```
Now you should be able to simply import `react-flexible-sliding-menu` in your `testing-app`.

## Contributing to Library Code:

Run the Library Server:
```
cd react-flexible-sliding-menu/
npm start
```

Run the Testing App:
```
cd testing-app
npm start
```
Now you can edit the code of library and see the changes in the `testing-app`.

## Contributing to Docs:

Run the Docs Server:
```
cd react-flexible-sliding-menu/
npm run docz:dev
```
Now you can edit the `md/mdx` files present inside the `docs` folder and see the changes on the server.

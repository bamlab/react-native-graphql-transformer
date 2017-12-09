# react-native-graphql-transformer
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

Seamlessly use GraphQL files with react-native >= 0.45

## Foreword

This package is inspired by the
[react-native-typescript-transform](https://github.com/ds300/@bam.tech/react-native-graphql-transformer)
repository.

## Goal

Use `.gql`or `.graphql` files with React Native packager for better readability
and separation of concerns.

**Exemple of a `.gql` file with import statement:**

```gql
#import "fragments/BasePost.gql"

query PostListItemQuery($id: ID) {
  Post(id: $id) {
    ...BasePost
  }
}
```

## Usage

### Step 1: Install

    yarn add -D @bam.tech/react-native-graphql-transformer

### Step 2: Configure the react native packager

Add this to your rn-cli.config.js (make one if you don't have one already):

```js
module.exports = {
  getTransformModulePath() {
    return require.resolve("@bam.tech/react-native-graphql-transformer");
  },
  getSourceExts() {
    return ["gql", "graphql"];
  }
};
```

If you need to run the packager directly from the command line, run the
following

    react-native start --transformer node_modules/@bam.tech/react-native-graphql-transformer/index.js --sourceExts gql,graphql

### Step 3: Write GraphQL code!

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars1.githubusercontent.com/u/16262904?v=4" width="100px;"/><br /><sub><b>Thomas Pucci</b></sub>](https://github.com/tpucci)<br />[💻](https://github.com/bamlab/react-native-graphql-transformer/commits?author=tpucci "Code") [📖](https://github.com/bamlab/react-native-graphql-transformer/commits?author=tpucci "Documentation") [💡](#example-tpucci "Examples") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->
## License

MIT

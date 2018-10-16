const gqlLoader = require('graphql-tag/loader');
const semver = require('semver');

let upstreamTransformer = null;

const reactNativeVersionString = require('react-native/package.json').version;

const reactNativeMinorVersion = semver(reactNativeVersionString).minor;

if (reactNativeMinorVersion >= 56) {
  upstreamTransformer = require('metro/src/reactNativeTransformer')
} else if (reactNativeMinorVersion >= 52) {
  upstreamTransformer = require('metro/src/transformer');
} else if (reactNativeMinorVersion >= 0.47) {
  upstreamTransformer = require('metro-bundler/src/transformer');
} else if (reactNativeMinorVersion === 0.46) {
  upstreamTransformer = require('metro-bundler/build/transformer');
} else {
  // handle RN <= 0.45
  const oldUpstreamTransformer = require('react-native/packager/transformer');
  upstreamTransformer = {
    transform({ src, filename, options }) {
      return oldUpstreamTransformer.transform(src, filename, options);
    },
  };
}

const gqlTransform = gqlLoader.bind({
  cacheable: () => null,
});

function transform(src, filename, options) {
  if (typeof src === 'object') {
    // handle RN >= 0.46
    ({ src, filename, options } = src);
  }

  // Do custom transformations
  let result = src;
  if (filename.endsWith('.gql') || filename.endsWith('.graphql')) {
    result = gqlTransform(result);
  }

  const babelCompileResult = upstreamTransformer.transform({
    src: result,
    filename,
    options,
  });

  // Pass the transformed source to the original react native transformer
  return babelCompileResult;
}

module.exports.transform = transform;

const gqlLoader = require('graphql-tag/loader');

let rnTransform = null;

try {
  // handle RN >= 0.47
  rnTransform = require('metro-bundler/src/transformer').transform;
} catch (e) {
  try {
    // handle RN 0.46
    rnTransform = require('metro-bundler/build/transformer').transform;
  } catch (e2) {
    // handle RN <= 0.45
    const oldrnTransform = require('react-native/packager/transformer').transform;
    rnTransform = {
      transform({ src, filename, options }) {
        return oldrnTransform.transform(src, filename, options);
      },
    };
  }
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

  const babelCompileResult = rnTransform({
    src: result,
    filename,
    options,
  });

  // Pass the transformed source to the original react native transformer
  return babelCompileResult;
}

module.exports.transform = transform;

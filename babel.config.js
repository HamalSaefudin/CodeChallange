module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@src': './src',
          '@constants': './src/constants',
          '@pages': './src/pages',
          '@redux': './src/redux',
          '@assets': './src/assets',
          '@routes': './src/routes',
          '@types': './src/types',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};

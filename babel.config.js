// @generated: @expo/next-adapter@2.0.0-beta.9
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#shared-steps

module.exports = {
    presets: [
        '@expo/next-adapter/babel'],
    "plugins": [
        [
            "styled-components",
            {
                "ssr": false,
                "displayName": true,
                "preprocess": false
            }
        ]
    ]
};

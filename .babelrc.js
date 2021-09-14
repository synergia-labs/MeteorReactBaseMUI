const plugins = [
    [
        'babel-plugin-import',
        {
            'libraryName': '@mui/material',
            // Use "'libraryDirectory': ''," se o seu bundler não suportar módulos ES
            'libraryDirectory': 'esm',
            'camel2DashComponentName': false
        },
        'core'
    ],
    [
        'babel-plugin-import',
        {
            'libraryName': '@mui/icons-material',
            // Use "'libraryDirectory': ''," se o seu bundler não suportar módulos ES
            'libraryDirectory': 'esm',
            'camel2DashComponentName': false
        },
        'icons'
    ],
    [
        'babel-plugin-import',
        {
            'libraryName': '@material-ui/lab',
            // Use "'libraryDirectory': ''," se o seu bundler não suportar módulos ES
            'libraryDirectory': 'esm',
            'camel2DashComponentName': false
        },
        'lab'
    ],
    [
        'babel-plugin-import',
        {
            'libraryName': '@material-ui/styles',
            // Use "'libraryDirectory': ''," se o seu bundler não suportar módulos ES
            'libraryDirectory': 'esm',
            'camel2DashComponentName': false
        },
        'styles'
    ],
    [
        'babel-plugin-import',
        {
            'libraryName': '@material-ui/pickers',
            // Use "'libraryDirectory': ''," se o seu bundler não suportar módulos ES
            'libraryDirectory': 'esm',
            'camel2DashComponentName': false
        },
        'pickers'
    ],
    [
        'babel-plugin-import',
        {
            "libraryName": "lodash",
            "libraryDirectory": "",
            "camel2DashComponentName": false,  // default: true
        },
        "lodash"
    ]
];

module.exports = {plugins};
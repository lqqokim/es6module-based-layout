const gridData = [{
        name: '(name)',
        value: 'Properties Grid'
    },
    {
        name: 'autoFitColumns',
        value: true
    },
    {
        name: 'borderWidth',
        value: 1
    },
    {
        name: 'created',
        value: '10/15/2006'
    },
    {
        name: 'grouping',
        value: false
    },
    {
        name: 'productionQuality',
        value: false
    }, {
        name: 'tested',
        value: false
    },
    {
        name: 'version',
        value: 0.01
    },
];

export default {
    getGridData() {
        return new Promise(res => {
            res(gridData);
        });
    }
}
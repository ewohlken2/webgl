var mustache = require('mustache');
var fs = require('fs');
var path = require('path');
const argv = require('minimist')(process.argv.slice(2));

var cmpName = argv['name'].split('-')
    .map(str => str.slice(0, 1).toUpperCase() + str.slice(1))
    .join('');


fs.readFile(path.resolve(__dirname, './templates/domComponent.mustache'), (err, data) => {
    if(err) throw err;


    var output = mustache.render(data.toString(), {
        name: argv['name'],
        cmpName: cmpName
    })

        
    fs.mkdirSync(path.resolve(process.cwd(), 'src/components', argv['name']));
    fs.writeFileSync(path.resolve(process.cwd(), 'src/components/', argv['name'], argv['name'] + '.component.js'), output);
});
    
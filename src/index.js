const path = require('path');
const npm = require(path.resolve('package.json'));
const cmd = require('node-cmd');
const writeFile = require('write');
const ProgressBar = require('progress');
const fs = require('fs');

let completed = 0;

const keys = ['dependencies', 'devDependencies'];
const total = keys.reduce((value, key) => Object.keys(npm[key]).length + value, 0);
const bar = new ProgressBar(':bar', {total: total + 3});

const isYarn = fs.existsSync(path.join(process.cwd(), 'yarn.lock'));

cmd.get((isYarn ? 'yarn' : 'npm') + ' list --depth 0', function (err, data, stderr) {
    keys.forEach(dep => {
        bar.tick();

        Object.keys(npm[dep]).sort().forEach(key => {

            const pattern = new RegExp('[├└]─ ' + key + '@([0-9\\.-a-zA-Z_]+)', 'i');
            const matches = pattern.exec(data);

            if (!matches) {
                console.warn('Could not find', key);
                return;
            }

            npm[dep][key] = matches[1].trim();
            completed++;

            bar.tick();
            if (completed === total) writeToFile();
        });
    });
});

function writeToFile() {
    writeFile('./package.json', JSON.stringify(npm, null, 2))
        .then(() => {
            bar.tick();
            console.log('\nSuccessfully removed carrots...');
        });
}

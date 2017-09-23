const path = require('path');
const npm = require(path.resolve('package.json'));
const cmd = require('node-cmd');
const writeFile = require('write');
const ProgressBar = require('progress');

let completed = 0;

const keys  = ['dependencies', 'devDependencies'];
const total = keys.reduce((value, key) => Object.keys(npm[key]).length + value, 0);
const bar   = new ProgressBar(':bar', { total: total + 3 });

keys.forEach(dep => {
  bar.tick();

  Object.keys(npm[dep]).sort().forEach(key => {

    cmd.get('npm show ' + key + ' version', function (err, data, stderr) {
      npm[dep][key] = data.replace('\n', '').trim();
      completed++;

      bar.tick();

      if (completed === total) writeToFile();
    });
  });
});

function writeToFile () {
  writeFile('./package.json', JSON.stringify(npm, null, 4))
    .then(() => {
      bar.tick();
      console.log('\nSuccessfully removed carrots...');
    });
}

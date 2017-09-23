const npm = require('./package.json');
const cmd = require('node-cmd');
const writeFile = require('write');
const ProgressBar = require('progress');

let total = 0;
let completed = 0;

const bar = new ProgressBar(':bar', { total: 10 });

['dependencies', 'devDependencies'].forEach(dep => {
  Object.keys(npm[dep]).sort().forEach(key => {
    total++;

    cmd.get('npm show ' + key + ' version', function (err, data, stderr) {
      npm[dep][key] = data.replace('\n', '').trim();
      completed++;

      bar.tick({
        ':total': total + 1
      });

      if (completed === total) writeToFile();
    });
  });
});


function writeToFile () {
  writeFile('./package.json', JSON.stringify(npm, null, 4))
    .then(() => {
      bar.tick();
      console.log('Successfully removed carrots...');
    });
}

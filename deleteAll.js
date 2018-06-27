const fs = require('fs');

module.exports = function() {
  fs.writeFileSync('./static/percentageData.txt', null)
};
    

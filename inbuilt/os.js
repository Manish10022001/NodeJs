let os = require('os');
console.log(os.platform()); //os 
console.log(os.arch());     //os architecture
console.log(os.cpus().length); //cpus numbers
console.log(os.freemem());    //free memory
console.log(os.uptime());   //os uptime
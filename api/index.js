//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { Country, Activity } = require('./src/db');
const { dbLoader } = require('./src/controllers/utils');

// Syncing all the models at once.
conn.sync({ force: false }).then(async () => {
  //Precarga de base de datos

    const allInfo = await Country.findAll({ include: Activity });
    if (!allInfo.length) {
      dbLoader();
    }

    var port = process.env.PORT || 3000;
  server.listen(port, "0.0.0.0", () => {
    console.log('%s listening at 3000'); // eslint-disable-line no-console
  });

});

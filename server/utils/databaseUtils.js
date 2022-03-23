const oracledb = require('oracledb');
const dbConfig = require('../config/config');

//define global attribute
//Might add some more later when needed
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;


module.exports.executeProcedure = async (PgkName = "", DBtype = "", DBPara = {}) => {
   let querySQL = ''
      , paraInsert = ''
      , conn
      , binds = {};

   try {
      conn = await oracledb.getConnection(dbConfig.connectionPool);
      console.log("Connected to database successfully!")
      paraInsert = [...Object.keys(DBPara).map(k => `:${k}`), ":cv_1"].join(", ");// Convert to format`:[key(s)], :cv_1` 
      switch (DBtype.toLowerCase()) {
         case 'stored': case 'store': case 's':
            querySQL = `BEGIN ${PgkName}(${paraInsert}); END;`
            break;
         //More type here
         default: break;
      }

      binds = {
         ...DBPara,
         'cv_1': {
            dir: oracledb.BIND_OUT,
            type: oracledb.DB_TYPE_CURSOR || oracledb.CURSOR
         }
      }
      const dataSet = await conn.execute(querySQL, binds)
         , cursor = dataSet.outBinds['cv_1']
         , rows = await cursor.getRows();
         await cursor.close(); //close result set
      return rows;
   } catch (error) {
      console.log(error)
   }
   finally {
      // eslint-disable-next-line no-unsafe-finally
      if (!conn) return false;
      try {
         await conn.close(); // close connection
         console.log("Connections are closed!");
      } catch (error) {
         console.log(error);
      }

   }
}

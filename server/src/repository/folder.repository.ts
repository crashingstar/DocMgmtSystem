import { PoolConnection, QueryError, QueryResult } from "mysql2";
import { connection } from "../config/db";
import { Folder } from "../model/folder";

const selectAll = (): Promise<Folder[]> => {
  const query = `
    select * from folders WHERE parent_id = ? OR (parent_id IS NULL AND ? IS NULL)`;
  return new Promise((resolve, reject) => {
    connection.getConnection((err: QueryError, conn: PoolConnection) => {
      conn.query(query, [null, null], (err, resultSet) => {
        conn.release();
        if (err) {
          return reject(err);
        }
        return resolve(resultSet as Folder[]);
      });
    });
  });
};

const addFolder = (folder: Folder): Promise<QueryResult> => {
  return new Promise((resolve, reject) => {
    const { name, parent_id, owner_name } = folder;
    const query = `
        INSERT INTO folders (name, parent_id, owner_name)
        VALUES (?, ?, ?)`;

    const values = [name, parent_id ?? null, owner_name];

    connection.getConnection((error: QueryError, conn: PoolConnection) => {
      conn.query(query, values, (err, result) => {
        conn.release(); // Release the connection back to the pool

        if (err) {
          return reject(err); // Reject if there's an error with the query
        }

        return resolve(result);
      });
    });
  });
};
export default { selectAll, addFolder };

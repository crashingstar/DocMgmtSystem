import { PoolConnection, QueryError, QueryResult } from "mysql2";
import { connection } from "../config/db";
import { Folder } from "../model/folder";

const getOne = (folder_id: string): Promise<QueryResult> => {
  const query = `select * from folders WHERE id = ? `;
  return new Promise((resolve, reject) => {
    connection.getConnection((err: QueryError, conn: PoolConnection) => {
      conn.query(query, [folder_id], (err, resultSet) => {
        conn.release();
        if (err) {
          console.error(err);
          return reject(err);
        }
        return resolve(resultSet);
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
        conn.release();

        if (err) {
          console.error(err);
          return reject(err);
        }

        return resolve(result);
      });
    });
  });
};
export default { addFolder, getOne };

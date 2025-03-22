import { PoolConnection, QueryError, QueryResult } from "mysql2";
import { connection } from "../config/db";
import { Document } from "../model/document";

const selectAll = (): Promise<Document[]> => {
  return new Promise((resolve, reject) => {
    const query = `
    select * from documents WHERE folder_id = ? OR (folder_id IS NULL AND ? IS NULL)`;
    connection.getConnection((err: QueryError, conn: PoolConnection) => {
      conn.query(query, [null, null], (err, resultSet) => {
        conn.release();
        if (err) {
          return reject(err);
        }
        return resolve(resultSet as Document[]);
      });
    });
  });
};

const addDocument = (document: Document): Promise<QueryResult> => {
  return new Promise((resolve, reject) => {
    const { name, file_size, folder_id, owner_name } = document;
    const query = `
        INSERT INTO documents (name, file_size, folder_id, owner_name)
        VALUES (?, ?, ?, ?)`;

    const values = [name, file_size, folder_id ?? null, owner_name];

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
export default { selectAll, addDocument };

import { PoolConnection, QueryError } from "mysql2";
import { connection } from "../config/db";
import { Document } from "../model/document";

const selectAll = (folder_id?: string): Promise<Document[]> => {
  return new Promise((resolve, reject) => {
    const query = `
    -- Get folders
    (SELECT id, name, 'folder' AS file_type, created_at, owner_name,NULL AS file_size
     FROM folders 
     WHERE parent_id = ? OR (parent_id IS NULL AND ? IS NULL))
    
    UNION ALL
    
    -- Get documents
    (SELECT id, name, 'document' AS file_type, created_at, owner_name, file_size  
     FROM documents 
     WHERE folder_id = ? OR (folder_id IS NULL AND ? IS NULL))
  `;
    connection.getConnection((err: QueryError, conn: PoolConnection) => {
      conn.query(
        query,
        [folder_id, folder_id, folder_id, folder_id],
        (err, resultSet) => {
          conn.release();
          if (err) {
            console.error(err);
            return reject(err);
          }
          return resolve(resultSet as Document[]);
        }
      );
    });
  });
};

const addDocument = (document: Document): Promise<Document[]> => {
  return new Promise((resolve, reject) => {
    const { name, file_size, folder_id, owner_name } = document;
    const query = `
        INSERT INTO documents (name, file_size, folder_id, owner_name)
        VALUES (?, ?, ?, ?)`;

    const values = [name, file_size, folder_id ?? null, owner_name];

    connection.getConnection((error: QueryError, conn: PoolConnection) => {
      conn.query(query, values, (err, result) => {
        conn.release();

        if (err) {
          return reject(err);
        }

        return resolve(result as Document[]);
      });
    });
  });
};

export default { selectAll, addDocument };

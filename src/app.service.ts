import { Injectable } from '@nestjs/common';
import { BigQuery } from '@google-cloud/bigquery';
import * as Chave_Bq from "../chave_bigquery/chave_teste.json";

@Injectable()
export class AppService {
  async getQuery() {
 
    try {
      const bigquery = new BigQuery({
        credentials: Chave_Bq,
        projectId: Chave_Bq.project_id
      });

      const query = "SELECT * FROM `bigquery-public-data.usa_names.usa_1910_2013` WHERE state = 'TX' LIMIT 100";
    
      // For all options, see https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query
      const options = {
        query: query
      };
    
      // Run the query as a job
      const [job] = await bigquery.createQueryJob(options);
    
      // Wait for the query to finish
      const [rows] = await job.getQueryResults();
    
      console.log('Total Rows: ' + rows.length )
      
      return { MaxLength: rows.length };
    } catch (error) {
      console.log('Erro na consulta');
      return { error: error };
    }
  }
}

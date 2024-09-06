/*
 *    Copyright 2016-2024 the original author or authors.
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */
package com.kazuki43zoo.jpetstore.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;

import java.io.File;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class DataBaseExportService {

    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    //   The api calls this method, converts the table into json and passes it to the frontend
    public void exportAllTables(String directoryPath) {
        List<String> tableNames = getAllTableNames();
        for(String tableName:tableNames){
            exportTableToJson(tableName, directoryPath);
        }
    }

    //    Get all table names from the database
    private List<String> getAllTableNames() {
        List<String> tableNames = new ArrayList<>();
        try{
            DatabaseMetaData metaData = namedParameterJdbcTemplate.getJdbcTemplate().getDataSource().getConnection().getMetaData();
            ResultSet tables = metaData.getTables(null, null, "%", new String[]{"TABLE"});
            while (tables.next()) {
                tableNames.add(tables.getString("TABLE_NAME"));
            }
        }catch(SQLException e){
            e.printStackTrace();
        }
        return tableNames;
    }

    //    Get the table data and then convert it to json
    private void exportTableToJson(String tableName, String directoryPath) {
        String query = "SELECT * FROM " + tableName;
        List<Map<String, Object>> rows;
        try {
            rows = namedParameterJdbcTemplate.queryForList(query, (Map<String, ?>) null);
            File file = new File(directoryPath + File.separator + tableName + ".json");
            objectMapper.writeValue(file, rows);
        } catch (Exception e) {
            System.err.println("Error while exporting table " + tableName + ": " + e.getMessage());
        }
    }
}

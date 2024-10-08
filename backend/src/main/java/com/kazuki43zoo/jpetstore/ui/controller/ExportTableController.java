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
package com.kazuki43zoo.jpetstore.ui.controller;

import com.kazuki43zoo.jpetstore.service.DataBaseExportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ExportTableController {

    @Autowired
    private DataBaseExportService dataBaseExportService;

    @GetMapping("/export-db")
    public String exportDb() {
        // The path in frontend
        String directoryPath = "/Users/chengyen/Desktop/Lab/jpetstore-jamstack/frontend/public";
        dataBaseExportService.exportAllTables(directoryPath);
        return "Database tables exported successfully!";
    }
}

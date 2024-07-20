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

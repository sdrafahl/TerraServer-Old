#!/bin/bash
echo "Dumping MySQL schema into databaseSchema.sql"
mysqldump -u shane -p --no-data --databases MY_RENTAL > ../databaseSchema.sql

#!/bin/bash
echo "Dumping MySQL schema into db.sql"
mysqldump -u shane -p --no-data --databases MY_RENTAL > ../databaseSchema.sql

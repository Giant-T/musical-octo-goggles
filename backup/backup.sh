#!/bin/bash

# source: https://stackoverflow.com/questions/12916894/mysql-schedule-event-database-backup-including-date-in-the-outfile
# Backup des données.
mysqldump -uusager -pmotdepasse1234 objet_connect2 > backup.sql
filename="backup.sql."`eval date +%Y%m%d`".tgz"
tar -czf $filename backup.sql
rm backup.sql

# https://stackoverflow.com/questions/1885101/delete-data-from-all-tables-in-mysql
# Suppression des données.
mysqldump -d --add-drop-table -uusager -pmotdepasse1234 objet_connect2 > objet_connect2.sql
mysql -uusager -pmotdepasse1234 objet_connect2 < database.sql

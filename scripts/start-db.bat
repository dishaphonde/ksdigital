@echo off
echo Starting PostgreSQL 18 database server...
"C:\Program Files\PostgreSQL\18\bin\pg_ctl.exe" -D "C:\Program Files\PostgreSQL\18\data" -l "C:\Program Files\PostgreSQL\18\data\server.log" start
echo Checking status:
"C:\Program Files\PostgreSQL\18\bin\pg_ctl.exe" -D "C:\Program Files\PostgreSQL\18\data" status
pause

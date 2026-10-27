@echo off
:: Run this batch file as Administrator (Right click -> Run as Administrator)
echo Registering PostgreSQL 18 as an automatic Windows Service...
"C:\Program Files\PostgreSQL\18\bin\pg_ctl.exe" register -N "postgresql-x64-18" -D "C:\Program Files\PostgreSQL\18\data" -S auto
net start postgresql-x64-18
pause

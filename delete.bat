@echo off
echo 🔐 Git 잠금 파일(index.lock) 삭제 중...

set TARGET=%cd%\.git\index.lock

if exist "%TARGET%" (
    del "%TARGET%"
    echo ✅ index.lock 파일이 삭제되었습니다!
) else (
    echo ❌ index.lock 파일이 존재하지 않습니다.
)

pause

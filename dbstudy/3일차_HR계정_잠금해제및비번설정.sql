-- 1. HR 계정의 잠금 해제
ALTER USER HR ACCOUNT UNLOCK;

-- 2. HR 계정에 새로운 비밀번호 부여하기
ALTER USER HR IDENTIFIED BY 1111;

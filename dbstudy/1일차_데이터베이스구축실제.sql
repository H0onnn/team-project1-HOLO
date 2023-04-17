DROP TABLE BOARD;  -- 자식 먼저 죽이기.
DROP TABLE MEMBER;  -- 부모 나중에 죽기.

CREATE TABLE MEMBER (
    NO NUMBER PRIMARY KEY,
    ID VARCHAR2(20) NOT NULL UNIQUE,
    PW VARCHAR2(20) NOT NULL,
    NAME VARCHAR2(20) NOT NULL,
    AGE NUMBER(3),
    EMAIL VARCHAR2(100) NOT NULL UNIQUE,
    HP CHAR(15) UNIQUE,
    REGDATE DATE
);
CREATE TABLE BOARD (
    NO NUMBER PRIMARY KEY,
    ID VARCHAR2(20) REFERENCES MEMBER(ID),  -- MEMBER테이블의 ID칼럼을 참조하는 외래키
    TITLE VARCHAR2(1000) NOT NULL,
    CONTENT VARCHAR2(4000)
);

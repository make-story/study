# Query

## Insert 후 PK 값

```php
$mysqli = new mysqli("localhost", "my_user", "my_password", "world");

/* check connection */
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}

$mysqli->query("CREATE TABLE myCity LIKE City");

$query = "INSERT INTO myCity VALUES (NULL, 'Stuttgart', 'DEU', 'Stuttgart', 617000)";
$mysqli->query($query);
printf ("New Record has id %d.\n", $mysqli->insert_id);

/* drop table */
$mysqli->query("DROP TABLE myCity");

/* close connection */
$mysqli->close();
```

## 외래키

alter table [자식테이블명] add constraint FOREIGN key ([자식컬럼명]) REFERENCES [부모테이블명] ([부모컬럼명]);
맨뒤에 [on delete, on update] 문을 추가해서 RESTRICT, CASCADE, NO ACTION, SET NULL 옵션을 줄 수 있다.

```sql
alter table user_book_category_rtb add constraint FOREIGN key (no_category) REFERENCES user_category (no) on delete CASCADE;
```

## 값이 없으면 Insert, 있으면 Update - 중복 처리하는 방법

https://jason-heo.github.io/mysql/2014/03/05/manage-dup-key2.html

- INSERT IGNORE

INSERT IGNORE는 중복 키 에러가 발생했을 때 신규로 입력되는 레코드를 무시하는 단순한 방법이다.

```sql
INSERT IGNORE INTO person VALUES (NULL, 'James', 'Seoul');
```

- REPLACE INTO

REPLACE INTO는 중복이 발생되었을 때 기존 레코드를 삭제하고 신규 레코드를 INSERT하는 방식이다.

```sql
REPLACE INTO person VALUES (NULL, 'James', 'Seoul');
```

- ON DUPLICATE UPDATE

ON DUPLICATE UPDATE의 장점은 중복 키 오류 발생 시 사용자가 원하는 값을 직접 설정할 수 있다는 점이다.

```sql
INSERT INTO students (NAME, email) VALUES ('saltfactory', 'saltfactory@gmail.com')
ON DUPLICATE KEY UPDATE name='saltfactory', email='saltfactory@me.com';
```

## Select 결과 Insert

```sql
insert into user_book (isbn, user) select isbn, 'mini9221@naver.com' from user_book where user ='wangdoo@mkinternet.com';

insert into user_book (isbn, email, grade, stand, state, memo) select isbn, 'lhj015@mkinternet.com' as email, grade, stand, state, memo from user_book_bak140102 where user = 'lhj015@mkinternet.com' group by isbn;
```

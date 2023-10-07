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

## 값이 없으면 Insert, 있으면 Update

```sql
INSERT INTO students (NAME, email) VALUES ('saltfactory', 'saltfactory@gmail.com')
ON DUPLICATE KEY UPDATE name='saltfactory', email='saltfactory@me.com';
```

## Select 결과 Insert

```sql
insert into user_book (isbn, user) select isbn, 'mini9221@naver.com' from user_book where user ='wangdoo@mkinternet.com';

insert into user_book (isbn, email, grade, stand, state, memo) select isbn, 'lhj015@mkinternet.com' as email, grade, stand, state, memo from user_book_bak140102 where user = 'lhj015@mkinternet.com' group by isbn;
```

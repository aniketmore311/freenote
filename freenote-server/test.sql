---
SELECT sql from sqlite_schema where name = 'notes';

---
SELECT verify_token from users where id = 1;

---
SELECT * from notes;

---
SELECT title from notes where user_id=1;

---
UPDATE notes set user_id=2 where id=3;
---
select user_id from notes where id=3;
---
DELETE from notes where id=3;
---
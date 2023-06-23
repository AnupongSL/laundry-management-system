# ระบบร้านซักผ้า ที่พัฒนาโดย Node.js

เป็นระบบที่ช่วยให้ร้านซักผ้าของคุณสะดวกยิ่งขึ้น เนื่องจากสามารถสั่งซักผ้าได้จากระบบ และเมื่อผ้าของคุณเสร็จ ระบบจะแจ้งเตือนไปยังไลน์ของคุณ ทำให้สะดวกมากยิ่งขึ้น


## สารบัญ Table of Contents

- [ขั้นตอนการติดตั้ง](#%E0%B8%82%E0%B8%B1%E0%B9%89%E0%B8%99%E0%B8%95%E0%B8%AD%E0%B8%99%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%95%E0%B8%B4%E0%B8%94%E0%B8%95%E0%B8%B1%E0%B9%89%E0%B8%87)
- [ขั้นตอนการสร้าง-database](#%E0%B8%82%E0%B8%B1%E0%B9%89%E0%B8%99%E0%B8%95%E0%B8%AD%E0%B8%99%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%AA%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%87-database)
- [ขั้นตอนการเชื่อมต่อกับ-database](#%E0%B8%82%E0%B8%B1%E0%B9%89%E0%B8%99%E0%B8%95%E0%B8%AD%E0%B8%99%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%80%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%A1%E0%B8%95%E0%B9%88%E0%B8%AD%E0%B8%81%E0%B8%B1%E0%B8%9A-database)
- [วิธีการเชื่อมต่อกับ-line](%E0%B8%A7%E0%B8%B4%E0%B8%98%E0%B8%B5%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%80%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%A1%E0%B8%95%E0%B9%88%E0%B8%AD%E0%B8%81%E0%B8%B1%E0%B8%9A-line)
- [วิธีการใช้งาน](#%E0%B8%A7%E0%B8%B4%E0%B8%98%E0%B8%B5%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%83%E0%B8%8A%E0%B9%89%E0%B8%87%E0%B8%B2%E0%B8%99)
- [วิธีทำการทดสอบระบบ](#%E0%B8%A7%E0%B8%B4%E0%B8%98%E0%B8%B5%E0%B8%97%E0%B8%B3%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%97%E0%B8%94%E0%B8%AA%E0%B8%AD%E0%B8%9A%E0%B8%A3%E0%B8%B0%E0%B8%9A%E0%B8%9A)
- [ขั้นตอนการทดสอบระบบ](#%E0%B8%82%E0%B8%B1%E0%B9%89%E0%B8%99%E0%B8%95%E0%B8%AD%E0%B8%99%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%97%E0%B8%94%E0%B8%AA%E0%B8%AD%E0%B8%9A%E0%B8%A3%E0%B8%B0%E0%B8%9A%E0%B8%9A)



## ขั้นตอนการติดตั้ง
``` bash
git clone https://github.com/AnupongSL/laundry-management-system.git

cd laundry-management-system

npm shrinkwrap

npm install

```
## ขั้นตอนการสร้าง Database

1. ติดตั้ง XAMPP
2. กดปุ่ม Start Apache & MySQL

![enter image description here](https://static.filehorse.com/screenshots/developer-tools/xampp-screenshot-01.png)

3. กดปุ่น Admin ของ MySQL

![enter image description here](https://people.utm.my/shaharil/files/2020/03/Capture-2-5.jpg)

4. ไปที่ User accounts แล้วกดปุ่ม Add User account

![enter image description here](https://www.linuxshelltips.com/wp-content/uploads/2021/09/MySQL-User-Accounts.png)


5. ใส่ User name, Hostname, Password, Re-type ให้เรียบร้อย
6. จากนั้น check box ให้ครบทุกช่องแล้วเลื่อนลงมาด้านล่างกดปุ่ม Go

![enter image description here](https://www.cs.virginia.edu/~up3f/cs4640/images/db-setup/phpmyadmin-create-user.png)
## ขั้นตอนการเชื่อมต่อกับ Database

1. ไปที่ path: src/database/config/sequelize.js
2. แก้ไขค่าที่ development ให้ตรงกับค่าที่ท่านสร้างในขั้นตอนการสร้าง database
```
username: ชื่อดาต้าเบส
password: รหัสผ่านดาต้าเบส
database: ชื่อดาต้าเบส
host: Host name ที่ท่านกรอกในดาต้าเบส
port: 3306
dialect: mysql
```

3. เมื่อใส่ค่าเรียบร้อยแล้วให้ใช้คำสั่งนี้ใน Terminal เพื่อสร้าง DATABASE
```
sequelize db:migrate
```
4. ไปที่ไฟล์ .env แล้วให้ใส่ค่าดังต่อไปนี้
```
NODE_ENV=test
PORT=3000

DB_USERNAME=ชื่อดาต้าเบส
DB_PASSWORD=หัสผ่านดาต้าเบส
DB_DATABASE=ชื่อดาต้าเบส
DB_HOST=Host name ที่ท่านกรอกในดาต้าเบส
DB_PORT=3306
```

## วิธีการเชื่อมต่อกับ Line
1. ไปที่ https://notify-bot.line.me/my/
2. จากนั้นทำการ Login ให้สำเร็จ
3. จากนั้นกดไปที่ หน้าของฉัน

![enter image description here](https://gcms.in.th/datas/users/www/image/1498228150.png)

4. จากนั้น ตั้งชื่อ Token, เลือกกลุ่มหรือเพื่อนที่ต้องการส่งแจ้งเตือน, และกดออก Token

![enter image description here](https://www.makewebeasy.com/blog/wp-content/uploads/2017/11/%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%AD%E0%B8%9A%E0%B8%9A%E0%B8%97%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A12.jpg)

5. จากนั้นกดคัดลอก

![enter image description here](https://www.makewebeasy.com/blog/wp-content/uploads/2017/11/%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%AD%E0%B8%9A%E0%B8%9A%E0%B8%97%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A13_Edit.jpg)

6. นำ Token ที่คัดลอกไปวางที่ไฟล์ .env
```
LINE_TOKEN= token ที่ท่านทำการคัดลอก
```


## วิธีการใช้งาน
ใช้คำสั่งต่อไปนี้เพื่อทำการเริ่มทดสอบระบบ
```bash
nodemon app.js
```

## วิธีทำการทดสอบระบบ
1. เมื่อรันคำสั่ง nodemon app.js แล้ว
2. ให้นำ URL ดังต่อไปนี้ไปใส่ที่บราวเซอร์ของท่านเพื่อทำการทดสอบ
3. http://localhost:3000/swagger-ui/

## ขั้นตอนการทดสอบระบบ

1. เมื่อนำลิงค์ไปวางในบราวเซอร์แล้ว
2. ตรวจสอบวิธีการใช้งาน swagger ได้ที่
3. https://appmaster.io/university/th/tutorials/endpoints/swagger-khuue-aairaelaaich-yaangair
4. จากนั้นทำการทดสอบ

import boto3
import botocore
import http.client
import pymysql
conn = http.client.HTTPConnection("opaltech.herokuapp.com")
conn.request("GET", "/laravel")
r1 = conn.getresponse();
res = str(r1.read(),'utf-8');
#print(res);
db = pymysql.connect(host="127.0.0.1",user="py",password="python",db="ninjax",charset='utf8mb4')
cursor = db.cursor()

# Prepare SQL query to INSERT a record into the database.
sql = "INSERT INTO `keys` (`key`) VALUES (%s)" 
sql2 = "SELECT * FROM `keys`"
#sql= "SELECT * FROM keys" 
print(sql)

   # Execute the SQL command
try:
   result = cursor.execute(sql2)
 # print(result);
   data = cursor.fetchall();
   d1 =  str(data[0])
   print(d1[2:len(d1)-3])  # Commit your changes in the database
   db.commit()
   print("success")
except Warning as e:
   print(e)
   # Rollback in case there is any error
   db.rollback()
s3 = boto3.resource('s3')
for bucket in s3.buckets.all():
    print(bucket.name)

data = open('unnamed.png', 'rb')
s3.Bucket('opaltech').put_object(Key='test.jpg',Body=data)

#msg = "ss"
#print(msg)

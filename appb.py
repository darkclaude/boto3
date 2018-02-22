import boto3
import botocore
import http.client
import pymysql
conn = http.client.HTTPConnection("opaltech.herokuapp.com")
conn.request("GET", "/laravel")
r1 = conn.getresponse();
res = str(r1.read(),'utf-8');
#print(res);
dbo = pymysql.connect("d5x4ae6ze2og6sjo.cbetxkdyhwsb.us-east-1.rds.amazonaws.com","hn36uy32az5vdh47","pz5bnei0dozgih6d","eaiwb72nrtzvprnz")
#db = pymysql.connect(host="127.0.0.1",user="py",password="python",db="ninjax",charset='utf8mb4')
#cursor = db.cursor()
cursor2 = dbo.cursor();

# Prepare SQL query to INSERT a record into the database.
sql = "INSERT INTO `keys` (`key`) VALUES (%s)" 
sql2 = "SELECT * FROM `keys`"
sql3 = "SELECT * FROM  `persons`"
#sql= "SELECT * FROM keys" 
print(sql)
try: 
    result = cursor2.execute(sql3)
    data = cursor2.fetchall()
    f = open('dump.txt','w')
    dum='Data DUmp BELOW:\n'
    for row in data:
        dum = dum + row[0]+ "       " + row[1] + "\n"
    #str = ''.join(data)
    print(dum)
    f.write(dum)
    f.close()
    
except Warning as e:
    print(e)
'''
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
   '''
s3 = boto3.resource('s3')
for bucket in s3.buckets.all():
    print(bucket.name)

data = open('dump.txt', 'rb')
s3.Bucket('opaltech').put_object(Key='dump.txt',Body=data)

#msg = "ss"
#print(msg)

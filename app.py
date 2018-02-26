from flask import Flask
from flask import request
import urllib3 
import shutil
import boto3
import os 
import botocore
 
app = Flask(__name__)

@app.route('/upload')
def upload():
   url = request.args.get('url')
   bucket = request.args.get('bucket')
   name = request.args.get('name')
  # reuse=  request.args.get
   if url:
        if bucket:
            if name:
                 #return name+" "+bucket+" "+url
                #url = "https://en-support.files.wordpress.com/2008/12/links-popup.png"
              
                 filename = name
                 fetchfile(filename,bucket,url)
                
            else:
               chunks = url.split('/')
               print(chunks)
               filename = str(chunks[len(chunks)-1])
               return fetchfile(filename,bucket,url)
        else: 
            return "Please Enter Valid Bucket name"      
       #eturn url
   else: 
       return "Please Enter Valid Url" 





def fetchfile(f,b,u):
  c = urllib3.PoolManager()
  with c.request('GET',u, preload_content=False) as resp, open(f, 'wb') as out_file:
      shutil.copyfileobj(resp, out_file)

      resp.release_conn()
                     
      return uploadaws(f,b)
      
   
def uploadaws(f,b):
                     data = open(f, 'rb')
                     s3 = boto3.resource('s3')
                     try:
                        s3.Bucket(b).put_object(Key=f,Body=data)
                        print("File Uploaded to Bucket")
                        os.remove(f)
                        return "File Uploaded to Bucket"
                     except Exception as e:
                         if str(e)=='An error occurred (NoSuchBucket) when calling the PutObject operation: The specified bucket does exist':
                             return "Bucket Name does not exist"
                         else:
                             return str(e)
                     


if __name__ == '__main__':
    app.run(debug=True)
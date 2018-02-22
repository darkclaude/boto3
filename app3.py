import urllib3
import shutil
#url = 'http://url_to_a_file'
url = "https://en-support.files.wordpress.com/2008/12/links-popup.png"
c = urllib3.PoolManager()
filename = 'dump.jpg'
with c.request('GET',url, preload_content=False) as resp, open(filename, 'wb') as out_file:
    shutil.copyfileobj(resp, out_file)

resp.release_conn()
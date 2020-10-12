import os, sys
arguments = sys.argv[1:]
BASE_PATH = os.path.join(os.path.expanduser("~"),"nextjs-blog","public","python-related")
file_path = os.path.join(BASE_PATH, "Users", arguments[1], "Blank")
if not os.path.exists(file_path):
    os.makedirs(file_path) 
f = open(os.path.join(file_path, arguments[2] + '_' + arguments[3] + '.txt'), 'w+')
f.write('w: ' + arguments[2] + '; h: ' + arguments[3])

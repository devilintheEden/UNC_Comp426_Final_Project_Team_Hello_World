import os, sys
arguments = sys.argv[1:]
BASE_PATH = os.path.join(os.path.expanduser("~"),"nextjs-blog","public","python-related")
f = open(os.path.join(BASE_PATH, "Users", arguments[1], "Blank", arguments[2] + '_' + arguments[3] + '.txt'), 'w+')
f.write('w: ' + arguments[2] + '; h: ' + arguments[3])
from threading import Timer;
import os
import csv
import csv;
import codecs;


def init():
    print('');
    print('*******************************');
    print(' S i m p l e  L o g i n  A p p');
    print('*******************************');
    username = input('Press (a) to create an account, (b) to login.\n>>> ');

    if username == 'a':
        signup();
    elif username == 'b':
        login();
    else:
        clear = lambda: os.system('cls');
        clear();
        init();

def log():
    toReturn();
    time = Timer(1.0, init);
    time.start();

def toReturn():
    with open('users.csv', 'w') as csvfile:
        filewriter = csv.writer(csvfile, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL);
        filewriter.writerow(['username', '']);
        filewriter.writerow(['password', '']);

# ALERT
def success(option, bf):
    if option == 'signup':
        print('Signup successful.\n\n')
        login();
    elif option == 'login':
        print('Sign in successful.\n')
        toReturn();
    elif option == 'login_failed':
        print('Invalid username or password.\n')
        login();
    else:
        print('impossible for stack to make here.')

log();

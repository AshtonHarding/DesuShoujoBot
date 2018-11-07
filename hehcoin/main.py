#!/usr/bin/python3
# -*- coding: utf-8 -*-
"""
This file handles all the hehcoin shit.
If I need to, I'll split it into multiple
files. 
"""
## imports
import csv
import sys

#print(sys.argv[1]) # Confirmed passing in cmd.

## global variables
db_file = 'hehcoin_users.csv'
my_list = []

class HehCoin():
    """Look how classy this coin is!"""
    def read_coin_db(self):
        """creates db list"""
        with open(db_file, 'rb') as f:
            reader = csv.reader(f)
            #my_list = list(reader)
            for line in reader:
                my_list.append(line)
            return my_list



    def check_against_db(self):
        """Confirms db before adding new users to it"""
        pass



    def write_coin_db(self):
        """Adds users to the list"""
        with open(db_file, 'a') as f:
            f.write(new_user_data)



    def send_coin(self):
        """Send user coin!"""
        pass



    def __init__(self):
        self.read_coin_db()
        print("Hello")
        print(my_list)



if __name__ == '__main__':
    hc = HehCoin()
    hc.read_coin_db() # Updates the var.
    sys.stdout.flush()

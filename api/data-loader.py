import sqlite3
import pandas as pd

try:
    sqliteConnection = sqlite3.connect('app.db')
    cursor = sqliteConnection.cursor()
    print("Successfully Connected to SQLite")

    #agency_domain_white_list
    cursor.execute("""DELETE FROM agency_domain_white_list""")
    data = pd.read_csv(r'agency_domain_whitelist.csv')
    df = pd.DataFrame(data, columns=['id', 'domain'])

    sqlite_insert_query = """INSERT INTO agency_domain_white_list
                          (id, domain) 
                          VALUES (?, ?);"""

    for row in df.itertuples():
        print(row)
        cursor.execute(sqlite_insert_query, (row.id, row.domain))

    print("Records inserted successfully into agency_domain_white_list table")

    #agency
    cursor.execute("""DELETE FROM agency""")
    data = pd.read_csv(r'agency.csv')
    df = pd.DataFrame(data, columns=['id', 'title', 'domain', 'address'])
    print(df)

    sqlite_insert_query = """INSERT INTO agency
                          (id,title,domain,address) 
                          VALUES (?, ?, ?, ?);"""

    for row in df.itertuples():
        print(row)
        cursor.execute(sqlite_insert_query,
                       (row.id, row.title, row.domain, row.address))

    print("Records inserted successfully into agency table")

    #broker
    cursor.execute("""DELETE FROM broker""")
    data = pd.read_csv(r'broker.csv')
    df = pd.DataFrame(
        data, columns=['id', 'email', 'password_hash', 'firstname', 'lastname', 'address', 'agencyId'])
    print(df)

    sqlite_insert_query = """INSERT INTO broker
                          (id, email, password_hash, firstname, lastname, address, agencyId) 
                          VALUES (?, ?, ?, ?, ?, ?, ?);"""

    for row in df.itertuples():
        print(row)
        cursor.execute(sqlite_insert_query,
                       (row.id, row.email, "$6$rounds=656000$Zglc9lwR6pvbqA/Y$NQmp8lUCWFgSswh9Ppc4y46UjecmxQDRcd3ulaYhSPkkpWIedq/nB9AD5WD3MNNKRGEhdnBaL5.QZheoEiwI.0", row.firstname, row.lastname, row.address, 1))

    print("Records inserted successfully into broker table")

    sqliteConnection.commit()
    cursor.close()


except sqlite3.Error as error:
    print("Failed to insert data into sqlite table", error)
finally:
    if (sqliteConnection):
        sqliteConnection.close()
        print("The SQLite connection is closed")

import psycopg2

def main():
    connection = psycopg2.connect(
        host = "localhost",
        database="Corona-Dashboard",
        user="postgres" ,
        password="postgres")

    cur = connection.cursor()

    cur.execute('SELECT version()')
    db_version = cur.fetchone()

    command = """
    
    """

    cur.execute(command)

    print(db_version)

    cur.close()

    connection.commit()
if __name__ == "__main__":

    main()

    print("You are doing great! :)")
import json
from postgresAPI import executeSelect


def createWorldData():
    data = executeSelect('world', '*')



if __name__ == "__main__":
    main()
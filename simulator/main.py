from configuration import Configuration
import logging



# url = 'http://localhost:8080/ping'

def send_data():
    # x = requests.post(url, json = body)
    body = {'somekey': 'somevalue'}
    ##todo - zwracac response wtedy bedziemy mogli jakos logowac to co nam zwrocil backend
    return body


# if __name__ == '__main__':
config = Configuration("simulator.log", logging.DEBUG, 1, send_data)

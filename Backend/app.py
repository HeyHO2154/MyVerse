from flask import Flask
from MainLogic import MainSimulator

app = Flask(__name__)
main_simulator = MainSimulator()
main_simulator.start_all()

if __name__ == '__main__':
    try:
        app.run(debug=True, use_reloader=False, port=5000)
    finally:
        main_simulator.stop_all() 
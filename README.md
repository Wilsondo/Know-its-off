# Know-its-off

Directions for use:

First, you need to check your database settings in `config.py` and define your database login credentials in `constants.py`. I have created an example of `constants.py` with the `example-constants.py` file.

`python3 -m pip install -r requirements.txt --user`

then go into the `myClient` directory 
edit .env with the appropriate baseURL address for the api server

and run 
`yarn build`

Then you can go back out of the `myClient` directory and run the server

`python3 main.py`

## License

[MIT License](https://github.com/Tonyenike/Know-its-off/blob/master/LICENSE.md)

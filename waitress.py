from waitress import serve
import main
serve(main.app, host='https://know-its-off.totalsundae.com', port=4937)

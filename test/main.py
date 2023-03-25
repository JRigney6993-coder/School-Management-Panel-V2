import eel

eel.init("test/web")


@eel.expose
def test(a):
    return a


eel.start("index.html", size=(325, 450))

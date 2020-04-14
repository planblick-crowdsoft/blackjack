import cherrypy
from app import app

cherrypy.tree.graft(app, '/api')
cherrypy.tree.mount(None, '/', {'/': {
    'tools.staticdir.dir': app.static_folder,
    'tools.staticdir.on': True,
    'tools.staticdir.index': 'index.html',
}})
cherrypy.config.update({
    'server.socket_port': 8080,
})
cherrypy.engine.start()
cherrypy.engine.block()

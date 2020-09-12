# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['0.0.0.0', '127.0.0.1', '.localhost']

# Corsheader settings.
# Sets which sites are allowed to contact the api
# This should be set to where the front end will be served.
CORS_ORIGIN_ALLOW_ALL = False
CORS_ALLOWED_ORIGINS = (
    'http://localhost:3000', # do not finish with a /
)

# Prevent browsers from sending cookies if on http
# Disabled in dev environment as dev server will not be behind https
CSRF_COOKIE_SECURE = False
SESSION_COOKIE_SECURE = False

# enable the browsable api in dev
DRF_DEFAULT_RENDERER_CLASSES = (
    'rest_framework.renderers.JSONRenderer',
    'rest_framework.renderers.BrowsableAPIRenderer',
)

DRF_DEFAULT_AUTHENTICATION_CLASSES = (
    # for HTTP basic authentication
    'rest_framework.authentication.BasicAuthentication',
    # for session based authentication. Useful for the browsable API
    'rest_framework.authentication.SessionAuthentication',
)

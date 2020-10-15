import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve(strict=True).parent.parent

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['0.0.0.0', '127.0.0.1', '.localhost']

# Corsheader settings.
# Sets which sites are allowed to contact the api
# This should be set to where the front end will be served.
CORS_ORIGIN_ALLOW_ALL = True
# CORS_ALLOWED_ORIGINS = (
#    'http://localhost:3000', # do not finish with a /
# )

# Prevent browsers from sending cookies if on http
# Disabled in dev environment as dev server will not be behind https
CSRF_COOKIE_SECURE = False
SESSION_COOKIE_SECURE = False

# User uploaded files
# Use django defaults
MEDIA_URL = '/media/'
MEDIA_ROOT = Path(__file__).resolve(strict=True).parent.parent / 'media'

# MEDIA_URL = '/media/'
# MEDIA_ROOT = os.path.join(BASE_DIR, 'media')


# enable the browsable api in dev
DRF_DEFAULT_RENDERER_CLASSES = (
    'rest_framework.renderers.JSONRenderer',
    'rest_framework.renderers.BrowsableAPIRenderer',
)

DRF_DEFAULT_AUTHENTICATION_CLASSES = (
    # for session based authentication. Useful for the browsable API
    'rest_framework.authentication.SessionAuthentication',
    # tokens to be used by djoser
    'rest_framework.authentication.TokenAuthentication',
)

SWAGER_DJANGO_SESSIONS = True

LOGIN_URL = '/api/dev-auth/login'
LOGOUT_URL = 'api/dev-auth/logout'

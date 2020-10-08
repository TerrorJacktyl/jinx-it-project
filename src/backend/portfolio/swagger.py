from drf_yasg.inspectors import SwaggerAutoSchema


class PortfolioAutoSchema(SwaggerAutoSchema):
    # the default will always just return the first part of the url
    # which would always be 'api'
    def get_tags(self, operation_keys=None):
        return [operation_keys[-2]]
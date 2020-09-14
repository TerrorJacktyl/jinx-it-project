from drf_yasg.inspectors import SwaggerAutoSchema


class AccountAutoSchema(SwaggerAutoSchema):
    def get_tags(self, operation_keys=None):
        return ['Account']

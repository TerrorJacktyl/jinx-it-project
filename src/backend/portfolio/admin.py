from django.contrib import admin

from . import models

class PageInline(admin.TabularInline):
    model = models.Page
    extra = 0

class SectionInline(admin.TabularInline):
    model = models.Section
    extra = 0
    # don't allow adding
    max_num = 0

@admin.register(models.Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ['name', 'path', 'owner', 'id']

@admin.register(models.Portfolio)
class PortfolioAdmin(admin.ModelAdmin):
    list_display = ['name', 'owner', 'id', 'private']
    inlines = [PageInline]

@admin.register(models.Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ['name', 'portfolio', 'number', 'owner', 'id']
    inlines = [SectionInline]

@admin.register(models.TextSection)
class TextSectionAdmin(admin.ModelAdmin):
    list_display = ['name', 'page', 'number', 'content', 'id']


@admin.register(models.ImageTextSection)
class ImageTextSectionAdmin(admin.ModelAdmin):
    list_display = ['name', 'page', 'number', 'image', 'content', 'id']

@admin.register(models.ImageSection)
class ImageTextSectionAdmin(admin.ModelAdmin):
    list_display = ['name', 'page', 'number', 'image', 'id']

@admin.register(models.MediaSection)
class MediaSectionAdmin(admin.ModelAdmin):
    list_display = ['name', 'page', 'number', 'media', 'id']

@admin.register(models.Section)
class SectionAdmin(admin.ModelAdmin):
    list_display = ['name', 'page', 'number']

@admin.register(models.Link)
class LinkAdmin(admin.ModelAdmin):
    list_display = ['owner', 'icon', 'title', 'address', 'id']
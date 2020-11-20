from django.db import models
from django.utils import timezone


class Result(models.Model):
    src = models.CharField('输入',
                           max_length=32,
                           help_text='实体和关系识别模块的输入文本的MD5值。')
    res = models.TextField('输出', help_text='实体和关系识别模块的输出结果。')
    created_time = models.DateTimeField('创建时间',
                                        default=timezone.now,
                                        help_text='默认为当前时间。')

    class Meta:
        verbose_name = '结果'
        verbose_name_plural = verbose_name
        ordering = ['-created_time']

    def __str__(self):
        return self.src

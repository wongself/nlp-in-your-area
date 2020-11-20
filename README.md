# NLP in Your Area

## 安装部署

### 展示网址

- [展示网址](http://101.124.42.4:2333)
- [实体和关系模块测试](http://101.124.42.4:2334)

### 环境依赖
- python 3.7+ (test with version 3.7.8)
- django 3.1+ (test with version 3.1.3)
- flask (tested with version 1.1.2)
- gunicorn (test with version 20.0.4)
- nltk (tested with version 3.5)
- numpy (tested with version 1.19.2)
- scikit-learn (tested with version 0.23.2)
- torch 1.1.0+ (tested with version 1.6.0)
- tqdm (tested with version 4.50.2)
- transformers 2.2.0+ (tested with version 3.4.0)
- waitress (test with version 1.4.4)
- whitenoise (test with version 5.2.0)

### 环境安装

> 仅限 V100 服务器用户操作

1. 位于用户根目录，输入命令`git clone git@github.com:wongself/nlp-in-your-area.git`来下载该仓库。
2. 进入项目`nlp-in-your-area`的目录，输入命令`pip install -r requirements.txt`来下载环境依赖，推荐在 Anaconda 创建的虚拟环境中安装所需依赖。
3. 位于项目根目录，输入命令`cp -r /data/wsf/nlp-in-your-area/data ./data`来导入实体和关系识别模块运行所需的预训练模型、外部数据等必要资料。
4. 位于项目根目录，输入命令`python manage.py migrate`来测试 Django 架构是否安装成功，或者输入命令`python ./nlp/applicaitons/spert/spert.py`来测试实体和关系识别模块是否安装成功。

## 项目开发

### 项目调试

1. 位于项目根目录，输入命令`python manage.py migrate`来生成 Django 架构运行所需的必要文件。
2. 位于项目根目录，输入命令`python manage.py collectstatic --no-input`来更新网站所需的静态文件（CSS、JS、HTML、IMG...）。仅当第一次启动项目或者位于`nlp-in-your-area/nlp/static`的静态文件被修改时才需要执行这项操作。
3. 位于项目根目录，输入命令`python manage.py runserver 0:2333`来启动网站，随后在浏览器中输入本机网址及端口`2333`。其中，`0`代表`0.0.0.0`，而`2333`代表网站的默认端口，你可以将端口改为`1024~65535`中的任意一个数值。但需要注意的是，实体和关系识别模块的默认端口是`2334`，不要设置重复的端口号即可。
4. 位于项目根目录，输入命令`python ./nlp/applicaitons/spert/spert.py`来启动实体和关系识别模块，随后在浏览器中输入本机网址及端口`2334`，来测试模块是否启动成功。若页面出现出现`NLP in Your Area`，则表明模块启动成功。

### 项目维护

1. 位于项目根目录，先后输入命令`python manage.py migrate`和`python manage.py collectstatic --no-input`来生成网站运行所需的必要文件。
2. 位于项目根目录，输入命令`gunicorn nlp-in-your-area.wsgi -w 4 -k gthread -b 0.0.0.0:2333`来启动网站。不使用默认命令`python manage.py runserver 0:2333`启动项目的原因在于，Django 官方文档强调通过`runserver`开启的开发服务端仅适用于开发测试，不适用于生产环境。因此，这里使用流行的 Gunicorn 来启动可以用于生产环境的服务端。
3. 位于项目根目录，输入命令`python ./nlp/applicaitons/spert/spert.py`来启动实体和关系识别模块。同样地，Flask 官方文档也强调不应该使用内置的开发服务器`flask run`，而推荐使用生产型 WSGI 服务器，例如 Waitress。值得注意的是，`spert.py`中已经内置了 Waitress 服务，因此不需要特地通过命令启动 Waitress 服务。
4. 若有附加功能需要添加，可以将 Python 代码放置于`nlp-in-your-area/nlp/applicaitons`中，在`nlp-in-your-area/nlp/urls.py`和`nlp-in-your-area/nlp/views.py`设置相应的链接跳转和消息处理，并在`nlp-in-your-area/nlp/templates`和`nlp-in-your-area/nlp/static/nlp`中修改相应的前端代码和 AJAX 相应代码。

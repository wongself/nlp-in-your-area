# nlp-in-your-area

## 安装部署

### 服务器

- V100: `101.124.42.4`

### 环境依赖
- Python 3.7 (test with version 3.7.8)
- Django 3.1+ (test with version 3.1.3)
- nltk (tested with version 3.5)
- Flask 1.1+ (tested with version 1.1.2)
- numpy (tested with version 1.19.2)
- scikit-learn (tested with version 0.23.2)
- torch 1.3.0+ (tested with version 1.6.0)
- tqdm (tested with version 4.50.2)
- transformers 2.2.0+ (tested with version 3.4.0)
- waitress (test with version 1.4.4)
- whitenoise 5.1.0+ (test with version 5.2.0)
- gunicorn 20.0.0+ (test with version 20.0.4)

### 环境安装

> 仅限 V100 服务器用户操作

1. 位于用户根目录，输入命令`git clone git@github.com:wongself/nlp-in-your-area.git`来下载该仓库。
2. 进入项目`nlp-in-your-area`的目录，输入命令`pip install -r requirements.txt`来下载环境依赖。
3. 位于项目根目录，输入命令`cp -r /data/wsf/nlp_in_your_area/data ./data`来导入模型运行所需的外部数据。
4. 位于项目根目录，输入命令`python manage.py migrate`来测试 Django 架构是否安装成功，或者输入命令`python ./nlp/applicaitons/spert/spert.py`来测试实体和关系识别模型是否安装成功。

## 项目开发

### 项目调试

1. 位于项目根目录，输入命令`python manage.py runserver 0:2333`来启动网站，随后在浏览器中输入对应网址及端口`2333`。若在启动过程中出现警告，请预先执行命令`python manage.py migrate`，再执行`python manage.py runserver`。
2. 位于项目根目录，输入命令`python ./nlp/applicaitons/spert/spert.py`来启动实体和关系识别模型，可以输入对应网址及默认端口`2334`，来测试模型是否启动成功。若页面出现出现`NLP in Your Area`，则表明模型启动成功。
3. 位于项目根目录，输入命令`python manage.py collectstatic --no-input`来更新网站所需的静态文件（CSS、JS、HTML、IMG...）。仅当位于`nlp_in_your_area/nlp/static`的静态文件被修改时才需要执行这项操作。

### 项目维护

1. 位于项目根目录，输入命令`gunicorn nlp_in_your_area.wsgi -w 4 -k gthread -b 0.0.0.0:2333`来启动网站。不使用命令`python manage.py runserver 0:2333`启动项目的原因在于，Django 官方文档强调通过`runserver`开启的开发服务端仅用于开发测试，不适用于生产环境。所以这里使用流行的 Gunicorn 来启动可以用于生产环境的服务端。
2. 位于项目根目录，输入命令`python ./nlp/applicaitons/spert/spert.py`来启动网站。同样地，Flask 官方文档也强调不应该使用内置的开发服务器`flask run`，推荐使用生产型 WSGI 服务器，例如 Waitress。特别地，`spert.py`中已经使用了 Waitress 服务，因此不需要特地从命令启动 Waitress 服务。
3. 若有附加功能需要添加，可以将 Python 代码放置于`nlp_in_your_area/nlp/applicaitons`中，并在`nlp_in_your_area/nlp/urls.py`和`nlp_in_your_area/nlp/views.py`设置相应的链接跳转和消息处理。

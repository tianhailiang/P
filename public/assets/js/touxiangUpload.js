/*
 * zxxFile.js ����HTML5 �ļ��ϴ��ĺ��Ľű� //www.zhangxinxu.com/wordpress/?p=1923
 * by zhangxinxu 2011-09-12
 */

var ZXXFILE = {
  uid: '',
  maxfileNum:100, //����ϴ�����
  num:0,
  uploadNum: 0,
  fileInput: null,				//html file�ؼ�
  dragDrop: null,					//��ק��������
  upButton: null,					//�ύ��ť
  url: "",						//ajax��ַ
  fileFilter: [],					//���˺���ļ�����
  filter: function(files) {		//ѡ���ļ���Ĺ��˷���
    return files;
  },
  onSelect: function() {},		//�ļ�ѡ���
  onDelete: function() {},		//�ļ�ɾ����
  onDragOver: function() {},		//�ļ���ק����������ʱ
  onDragLeave: function() {},	//�ļ��뿪����������ʱ
  onProgress: function() {},		//�ļ��ϴ�����
  onSuccess: function() {},		//�ļ��ϴ��ɹ�ʱ
  onFailure: function() {},		//�ļ��ϴ�ʧ��ʱ,
  onComplete: function() {},		//�ļ�ȫ���ϴ����ʱ
  /* �������������÷����ֽ��� */
  //�ļ��Ϸ�
  funDragHover: function(e) {
    e.stopPropagation();
    e.preventDefault();
    this[e.type === "dragover"? "onDragOver": "onDragLeave"].call(e.target);
    return this;
  },
  //��ȡѡ���ļ���file�ؼ����Ϸ�
  funGetFiles: function(e) {
    // // ȡ����꾭����ʽ
    // this.funDragHover(e);
    // ��ȡ�ļ��б�����
    var files = e.target.files || e.dataTransfer.files;
    //ֻ���ϴ�һ��
    this.fileFilter = this.filter(files);
    this.funDealFiles(this.fileFilter);
    return this;
  },
  //ѡ���ļ��Ĵ�����ص�
  funDealFiles: function(files) {
    //ִ��ѡ��ص�
    for (var i = 0, file; file = this.fileFilter[i]; i++) {
      //����Ψһ����ֵ
      file.index = i;
    }
    this.num++;
    this.onSelect(files);
    return this;
  },
  //�ļ��ϴ�
  funUploadFile: function() {
    var self = this;
    if (location.host.indexOf("sitepointstatic") >= 0) {
      //��վ�������������
      return;
    }
    for (var i = 0, file; file = this.fileFilter[i]; i++) {
      (function(file) {
        var xhr = new XMLHttpRequest();
        if (xhr.upload) {
          if(document.addEventListener){
            xhr.upload.addEventListener("progress", function(e) {
              self.onProgress(file, e.loaded, e.total);
            }, false);
          }else{
            xhr.upload.attachEvent("onprogress", function(e) {
              self.onProgress(file, e.loaded, e.total);
            }, false);
          }
          // �ļ��ϴ��ɹ�����ʧ��
          xhr.onreadystatechange = function(e) {
            if (xhr.readyState == 4) {
              if (xhr.status == 200) {
                self.uploadNum++;
                self.onSuccess(file, xhr.responseText);
              } else {
                self.onFailure(file, xhr.responseText);
              }
            }
          };
          // ��ʼ�ϴ�
          xhr.open("POST", self.url, true);
          var formData = new FormData();
          formData.append("avatar", file);//����keyΪavartar,valueΪ������File����
          formData.append("uid", self.uid);
          xhr.send(formData);
        }
      })(file);
    }
  },
  init: function() {
    var self = this;
    self.fileFilter = [];
    if (this.dragDrop) {
      this.dragDrop.addEventListener("dragover", function(e) { self.funDragHover(e); }, false);
      this.dragDrop.addEventListener("dragleave", function(e) { self.funDragHover(e); }, false);
      this.dragDrop.addEventListener("drop", function(e) { self.funGetFiles(e); }, false);
    }
    //�ļ�ѡ��ؼ�ѡ��
    if (this.fileInput) {
      var changefn = function (e) {
        self.funGetFiles(e);
      };
      if(document.addEventListener){
        this.fileInput.removeEventListener('change',changefn, false);
        this.fileInput.addEventListener('change',changefn, false);
        /*this.fileInput.addEventListener("change", function(e) {
          self.funGetFiles(e);
        }, false);*/
      }else{
        this.fileInput.detachEvent('onchange',uploadfn);
        this.fileInput.attachEvent('onchange',uploadfn);
        /*this.fileInput.attachEvent("onchange", function(e) {
          self.funGetFiles(e);
        }, false);*/
      }
    }
    //�ϴ���ť�ύ
    if (this.upButton) {
      var _that = this;
      var uploadfn = function (e) {
        self.onSureBtnCb(_that.fileFilter);
        self.funUploadFile(e);
      };
      if(document.addEventListener){
        this.upButton.removeEventListener('click',uploadfn, false);
        this.upButton.addEventListener('click',uploadfn, false);
       /* this.upButton.addEventListener("click", function(e) {
          self.onSureBtnCb();
          self.funUploadFile(e);
        }, false);*/
      }else{
        this.upButton.detachEvent('onclick',uploadfn);
        this.upButton.attachEvent('onclick',uploadfn);
        /*this.upButton.attachEvent("onclick", function(e) {
          self.onSureBtnCb();
          self.funUploadFile(e);
        }, false);*/
      }
    }
  }
};

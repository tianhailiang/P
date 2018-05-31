/**
 * Created by DXZ-Shuqin.Wang on 2018/5/22.
 */
var ZXXFILE = {
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
    //�ļ��Ϸ�
    funDragHover: function(e) {
        e.stopPropagation();
        e.preventDefault();
        this[e.type === "dragover"? "onDragOver": "onDragLeave"].call(e.target);
        return this;
    },
    //��ȡѡ���ļ���file�ؼ����Ϸ�
    funGetFiles: function(e) {
        // ȡ����꾭����ʽ
        this.funDragHover(e);
        // ��ȡ�ļ��б����
        var files = e.target.files || e.dataTransfer.files;
        if (this.filter(files)) {
            this.funDealFiles(this.filter(files));
            return this;
        }
    },

    //ѡ���ļ��Ĵ�����ص�
    funDealFiles: function(files) {
        for (var i = 0, file; file = this.fileFilter[i]; i++) {
            //����Ψһ����ֵ
            file.index = i;
        }
        //ִ��ѡ��ص�
        this.num++;
        this.onSelect(files);
        //�ϴ���������
        this.funUploadFile(files);
        return this;
    },

    //�ļ��ϴ�
    funUploadFile: function(files) {
        // this.sureUpdate(this.fileFilter);
        var self = this;
        if (location.host.indexOf("sitepointstatic") >= 0) {
            //��վ�������������
            return;
        }
        for (var i = 0, file; file = files[i]; i++) {
            (function(file) {
                var xhr = new XMLHttpRequest();
                if (xhr.upload) {
                    // �ϴ���
                    /*xhr.upload.addEventListener("progress", function(e) {
                     self.onProgress(file, e.loaded, e.total);
                     }, false);*/
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
                    formData.append("upload_opinion", file);//����keyΪavartar,valueΪ������File����
                    xhr.send(formData);
                }
            })(file);
        }

    },

    init: function() {
        var self = this;
        if (this.dragDrop) {
            this.dragDrop.addEventListener("dragover", function(e) { self.funDragHover(e); }, false);
            this.dragDrop.addEventListener("dragleave", function(e) { self.funDragHover(e); }, false);
            this.dragDrop.addEventListener("drop", function(e) { self.funGetFiles(e); }, false);
        }
        //�ļ�ѡ��ؼ�ѡ��
        if (this.fileInput) {
            if(document.addEventListener){
                this.fileInput.addEventListener("change", function(e) {
                    self.funGetFiles(e);
                }, false);
            }else{
                this.fileInput.attachEvent("onchange", function(e) {
                    self.funGetFiles(e);
                }, false);
            }
        }
        //�ϴ���ť�ύ
        if (this.upButton) {
            if(document.addEventListener){
                this.upButton.addEventListener("click", function(e) {
                    console.log('upButton ����ϴ���ť');
                    self.funUploadFile(e);
                }, false);
            }else{
                this.upButton.attachEvent("onclick", function(e) {
                    self.funUploadFile(e);
                }, false);
            }
        }
    }
};